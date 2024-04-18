import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from '@rneui/themed';
import st from './styles'
import useTheme from '../../hooks/useTheme'
import { useDispatch } from 'react-redux'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getInfoUserAction, searchInfoUserAction } from '../../services/user/actions';
import { getGardenAction, searchGardenAction, updateCoverAction } from '../../services/garden/actions';
import { getItemObjectAsyncStorage } from '../../../utils/asyncStorage';
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

  const [userInfo, setUserInfo] = useState({
    "id": '',
    "userId": '',
    "avatarId": '',
    "gender": '',
    "dateOfBirth": "",
    "phone": "",
    "address": "",
    "genderP": false,
    "addressP": false,
    "phoneP": false,
    "dateOfBirthP": false
  });
  const [gardenInfo, setGardenInfo] = useState({
    "id": "",
    "userId": "",
    "name": "",
    "coverId": "",
    "description": ""
  });
  const [loading, setLoading] = useState(false)
  let userId
  const getUserId = async () => {
    userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
  }

  useEffect(() => {
    getUserInfo()
  }, [])

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
  const onChangeGardenInfo = (name, value) => {
    return () => {
      setGardenInfo(prevState => ({ ...prevState, [name]: value }));
      console.log('gardenInfo: ', gardenInfo)
    }
  }

  const onChangeUserInfo = (name, value) => {
    return () => {
      setUserInfo(prevState => ({ ...prevState, [name]: value }));
      console.log('userInfo', gardenInfo)
    }
  }
  const handleUpdateCover = async (cover) => {
    setLoading(true)
    const req = new FormData();
    req.append('userId', userId)
    req.append('cover', cover, "cover")
    try {

      const res = await dispatch(updateCoverAction(req));
      if (res?.payload) {
        setLoading(false);
        const id = res.payload.body.id
        onChangeGardenInfo('coverId', { id })
        ToastAndroid.show('Cập nhật cover thành công!', ToastAndroid.SHORT)
      }
    } catch (err) {
      console.error('Error update cover:', err);
      ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT)
      setLoading(false);
    }
  }

  const handleUpdateAvatar = async (avatar) => {
    setLoading(true)
    const req = new FormData();
    req.append('userId', userId)
    req.append('avatar', avatar, "avata")
    try {
      const res = await dispatch(updateCoverAction(req));
      if (res?.payload) {
        setLoading(false);
        const id = res.payload.body.id
        onChangeGardenInfo('coverId', { id })
        ToastAndroid.show('Cập nhật avatar thành công!', ToastAndroid.SHORT)
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await handleUpdateCover(result.assets[0].uri)
      return
    }
  };
  const pickCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      await handleUpdateCover(result.assets[0].uri)
      return
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.backgroundColor} />
      <ImageBackground
        source={require('../../../assets/images/paper.png')}
        resizeMode="cover">
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={{ uri: `${MEDIA.SELF}?id=${userInfo?.avatarId}` }} style={styles.avata} />
          <TouchableOpacity style={styles.iconCamera}
            onPress={() => { pickCover() }}>
            <Icon name='camera' size={15} color={'gray'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Text style={styles.userName}>VƯỜN CỦA {gardenInfo?.name.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
          <TouchableOpacity >
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
            onPress={() => navigation.navigate(NAVIGATION_TITLE.COMMUNITY)}>
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
            onPress={() => navigation.navigate(NAVIGATION_TITLE.GREEN)}>
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

          <TouchableOpacity>
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