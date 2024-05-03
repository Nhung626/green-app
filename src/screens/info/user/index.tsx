import React, { useCallback, useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from '@rneui/themed';
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useDispatch } from 'react-redux'
import { useNavigation, useIsFocused, useRoute,useFocusEffect} from "@react-navigation/native";
import { getInfoUserAction, searchInfoUserAction } from '../../../services/user/actions';
import { getGardenAction, searchGardenAction, updateCoverAction } from '../../../services/garden/actions';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import { MEDIA } from '../../../constants/api';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../../../../utils/loading/loading';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import moment from 'moment';


const MyProfile = () => {
  const styles = st();
  const theme = useTheme();
  const dispatch = useDispatch<any>()
  const route = useRoute<any>()
  const gardenInfo = route.params.user;
  const userInfo = route.params. user.userInfo;
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<any>();
  let userId
  const getUserId = async () => {
    userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     getUserInfo();
  //   }, [avatar])
  // );


  // const getUserInfo = async () => {
  //   await getUserId();
  //   setLoading(true);
  //   const req = new FormData();
  //   req.append("userId", userId)
  //   try {
  //     const res = await dispatch(searchGardenAction(req));
  //     console.log('garden: ', res.payload.body[0])
  //     setGardenInfo(res.payload.body[0]);
  //     setUserInfo(res.payload.body[0].userInfo);
  //     console.log(userInfo)
  //     setLoading(false);
  //   } catch (err) {
  //     console.error('Error fetching user info:', err);
  //     setLoading(false);
  //   }
  // };

  // const handleUpdateAvatar = async (avatar) => {
  //   setLoading(true)
  //   const req = new FormData();
  //   req.append('userId', gardenInfo.userId)
  //   if (avatar) {
  //     //@ts-ignore
  //     userInfo.append(`avatar`, {
  //       uri: avatar,
  //       type: 'image/png',
  //       name: `avatar.png`,
  //     });
  //   }
  //   try {
  //     const res = await dispatch(updateCoverAction(req));
  //     if (res?.payload) {
  //       setLoading(false);
  //       const id = res.payload.body.id
  //       // onChangeGardenInfo('coverId', { id })
  //       ToastAndroid.show('Cập nhật avatar thành công!', ToastAndroid.SHORT)
  //     }
  //   } catch (err) {
  //     console.error('Error update avatar:', err);
  //     ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT)
  //     setLoading(false);
  //   }
  // }

  // const pickAvata = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     await handleUpdateAvatar(result.assets[0].uri)
  //     return
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.backgroundColor} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={20}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_TITLE.UPDATE_INFO, { data: gardenInfo })}
        >
          <Icon name="edit" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={20}></Icon>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require('../../../../assets/images/paper.png')}
        resizeMode="cover">
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={{ uri: `${MEDIA.SELF}?id=${gardenInfo.userInfo?.avatarId}` }} style={styles.avata} />
          {/* <TouchableOpacity style={styles.iconCamera}
            onPress={() => { pickAvata() }}>
            <Icon name='camera' size={15} color={'gray'}></Icon>
          </TouchableOpacity> */}
        </View>
        <View style={{}}>
          <Text style={styles.userName}>VƯỜN CỦA {gardenInfo?.name.toUpperCase()}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={require('../../../../assets/images/icon/ic_leaf.png')}
              style={styles.iconBio}
            />
            <Text style={styles.bio}>{gardenInfo?.description}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <ScrollView style={styles.scroll}>
          <View style={styles.fix}>
            <Image
              source={require('../../../../assets/images/icon/ic_user.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.text}> Giới tính: {userInfo.gender}</Text>
          </View>

          <View style={styles.fix}>
            <Image
              source={require('../../../../assets/images/icon/ic_garden.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.text}>Ngày sinh: {moment(userInfo.dateOfBirth).format('DD-MM-YYYY')} </Text>
          </View>
          <View style={styles.fix}>
            <Image
              source={require('../../../../assets/images/icon/ic_status.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.text}>Địa chỉ: {userInfo.address}</Text>
          </View>

          <TouchableOpacity>
            <View style={styles.fix}>
              <Image
                source={require('../../../../assets/images/icon/ic_logout.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                SĐT: {userInfo.phone}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        {/* <Loading visiable={loading} /> */}
      </View>
      <Loading visiable={loading}></Loading>
    </SafeAreaView >
  );
};

export default MyProfile;