import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from '@rneui/themed';
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useDispatch } from 'react-redux'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getInfoUserAction, searchInfoUserAction } from '../../../services/user/actions';
import { getGardenAction, searchGardenAction, updateCoverAction } from '../../../services/garden/actions';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import { MEDIA } from '../../../constants/api';
import * as ImagePicker from 'expo-image-picker';
import Loading from '../../../../utils/loading/loading';


const Profile = ({ gardenInfo, userInfo }) => {
    const styles = st();
    const theme = useTheme();
    const dispatch = useDispatch<any>()
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)
    let userId
    const getUserId = async () => {
        userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
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
                // onChangeGardenInfo('coverId', { id })
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
            await handleUpdateAvatar(result.assets[0].uri)
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
                        onPress={() => { pickAvata() }}>
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

            </View>
            <Loading visiable={loading} />
        </SafeAreaView >
    );
};

export default Profile;