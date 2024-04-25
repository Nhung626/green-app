import React, { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from '@rneui/themed';
import st from './styles'
import useTheme from '../../hooks/useTheme'
import { useDispatch } from 'react-redux'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

import { getInfoUserAction, searchInfoUserAction, updateAatarAction } from '../../services/user/actions';
import { getGardenAction, searchGardenAction, updateCoverAction } from '../../services/garden/actions';
import { clearAllAsyncStorage, getItemObjectAsyncStorage } from '../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../constants/storage';
import { MEDIA } from '../../constants/api';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../../../utils/loading/loading';
import { NAVIGATION_TITLE } from '../../constants/navigation';


const Info = () => {
  const styles = st();
  const theme = useTheme();
  const dispatch = useDispatch<any>()
  const isFocused = useIsFocused()
  const navigation = useNavigation<any>();
  const [avatar, setAvatar] = useState('');
  const [userInfo, setUserInfo] = useState<any>();
  const [gardenInfo, setGardenInfo] = useState<any>();
  const [loading, setLoading] = useState(false)
  let userId
  const getUserId = async () => {
    userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
  }

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );


  const getUserInfo = async () => {
    await getUserId();
    setLoading(true);
    const req = new FormData();
    req.append("userId", userId)
    try {
      const res = await dispatch(searchGardenAction(req));
      console.log('garden: ', res.payload.body[0])
      setGardenInfo(res.payload.body[0]);
      setUserInfo(res.payload.body[0].userInfo);
      console.log(userInfo)
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user info:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (avatar) {
      handleUpdateAvatar();
    }
  }, [avatar])

  const handleUpdateAvatar = async () => {
    await getUserId();
    setLoading(true)
    const req = new FormData();
    req.append('userId', userId)
    if (avatar) {
      //@ts-ignore
      req.append(`avatar`, {
        uri: avatar,
        type: 'image/png',
        name: `avatar.png`,
      });
    }
    try {
      const res = await dispatch(updateAatarAction(req));
      if (res?.payload) {
        setLoading(false);
        setAvatar(null);
        ToastAndroid.show('Cập nhật avatar thành công!', ToastAndroid.SHORT)
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error('Error update avatar:', err);
      ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT)
      setLoading(false);
    }
  }

  const pickAvata = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri)
      return
    }
  };

  const changeAvatar = () => {
    Alert.alert(
      'Xác nhận',
      'Tải lên avatar mới',
      [
        {
          text: 'Hủy bỏ',
          onPress: () => console.log('Hủy bỏ'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            // Thực hiện logic xóa ở đây
            await pickAvata()
            // Đóng hộp thoại xác nhận
          },
        },
      ],
      { cancelable: false },
    );
  }

  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      '',
      [
        {
          text: 'Hủy bỏ',
          onPress: () => console.log('Hủy bỏ'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            await clearAllAsyncStorage();
            navigation.navigate(NAVIGATION_TITLE.LOGIN);
          },
        },
      ],
      { cancelable: false },
    );

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.color_1} />
      <ImageBackground
        source={require('../../../assets/images/paper.png')}
        resizeMode="cover">
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Image source={{ uri: `${MEDIA.SELF}?id=${userInfo?.avatarId}` }} style={styles.avata} />
          <TouchableOpacity style={styles.iconCamera}
            onPress={() => { changeAvatar() }}>
            <Icon name='camera' size={15} color={'gray'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 25, paddingTop: 5 }}>
          <Text style={styles.userName}>VƯỜN CỦA {gardenInfo?.name.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
            <Image
              source={require('../../../assets/images/icon/ic_leaf.png')}
              style={styles.iconBio}
            />
            <Text style={styles.bio}>{gardenInfo?.description}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <ScrollView style={styles.scroll}>
          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_TITLE.MYPROFILE, { 'user': gardenInfo })}>
            <View style={styles.fix}>
              <Image
                source={require('../../../assets/images/icon/ic_user.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                Quản lý tài khoản
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_TITLE.GREEN)}>
            <View style={styles.fix}>
              <Image
                source={require('../../../assets/images/icon/ic_garden.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                Vườn của tôi
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_TITLE.MYSTATUS)}>
            <View style={styles.fix}>
              <Image
                source={require('../../../assets/images/icon/ic_status.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                Bài viết của tôi
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_TITLE.SAVEPOST)}>
            <View style={styles.fix}>
              <Image
                source={require('../../../assets/images/icon/ic_save.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                Đã lưu
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(NAVIGATION_TITLE.FOLLOW_USER)}>
            <View style={styles.fix}>
              <Icon
                name='user-plus'
                color={theme.color_1} size={20}
                style={{
                  height: 25,
                  width: 20,
                  marginRight: 15,
                }}
              />
              <Text style={styles.text}>
                Vườn bạn theo dõi
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}>
            <View style={styles.fix}>
              <Image
                source={require('../../../assets/images/icon/ic_logout.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                Đăng xuất
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Loading visiable={loading} />
    </SafeAreaView >
  );
};

export default Info;