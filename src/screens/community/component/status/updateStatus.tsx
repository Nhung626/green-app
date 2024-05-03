import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { getItemObjectAsyncStorage } from '../../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../../constants/storage';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStatusAction, updateStatusAction } from '../../../../services/status/actions';
import Loading from '../../../../../utils/loading/loading';
import { MEDIA } from '../../../../constants/api';
import { searchGardenAction } from '../../../../services/garden/actions';

const UpdateStatus = () => {
    const styles = st();
    const theme = useTheme();
    const route = useRoute<any>();
    const status = route.params?.data;
    const [images, setImages] = useState([])
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            setContent(status.content)
            let imgIds = status.imgIds;
            // Tạo một mảng tạm thời để lưu trữ các ảnh mới
            let tempImages = [];
            imgIds.forEach((id) => {
                // Thêm một ảnh mới vào mảng tạm thời
                tempImages.push(`${MEDIA.SELF}?id=${id}`);
            });
            // Cập nhật trạng thái images một lần sau khi đã thu thập tất cả các ảnh
            setImages(tempImages);
            await getUserInfo()

        }
        fetchData();
    }, []);

    let userId
    const getUserId = async () => {
        userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }
    const getUserInfo = async () => {
        await getUserId();
        setLoading(true);

        try {
            const res = await dispatch(searchGardenAction({ userId: userId }));
            setUser(res.payload.body[0]);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setLoading(false);
        }
    };

    const handleSaveStatus = async () => {
        setLoading(true)
        await getUserId();
        const req = new FormData();
        images.forEach((img, index) => {
            //@ts-ignore
            req.append(`img`, {
                uri: img,
                type: 'image/png',
                name: `image-${index}.png`,
            });
        });
        req.append('id', status.id);
        req.append('userId', user.id);
        req.append('content', content);
        try {
            const res = await dispatch(updateStatusAction(req));

            if (res.payload) {
                setLoading(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                setContent('');
                setImages([]);
                navigation.goBach()
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            console.log('Error:', err);
            setLoading(false);
            ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT);
        }
    };
    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets.map((asset) => asset.uri);
            if (images.length + selectedImage.length <= 5) {
                setImages([...images, ...selectedImage]);
            } else {
                ToastAndroid.show('Số lượng ảnh vượt quá giới hạn (5 ảnh).', ToastAndroid.SHORT);
            }
        }
    };

    const handleRemoveImg = (indexToRemove) => {
        const updateImg = [...images];
        updateImg.splice(indexToRemove, 1);
        setImages(updateImg);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.color_2} />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerText}>Cập nhật bài đăng</Text>
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Image size={30} source={{ uri: `${MEDIA.SELF}?id=${user?.userInfo.avatarId}` }} />
                    <Text style={styles.username}>{user?.name}</Text>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 5, }}>
                    <View style={styles.content}>
                        <TextInput
                            multiline={true}
                            numberOfLines={1}
                            textAlignVertical="top"
                            cursorColor={'gray'}
                            placeholder='Chia sẻ vô đây nhé.'
                            value={content}
                            onChangeText={(text) => setContent(text)}
                        ></TextInput>
                        <ScrollView
                            horizontal
                            // pagingEnabled
                            contentContainerStyle={{ alignItems: 'center' }}>
                            {images.map((image, index) => (
                                <View key={index}>
                                    < Image source={{ uri: image }} style={styles.image} />
                                    <TouchableOpacity onPress={() => handleRemoveImg(index)} style={{ position: 'absolute', top: 20, right: 25 }}>
                                        <Icon name="close" size={20} />
                                    </TouchableOpacity>
                                </View>
                            )
                            )}
                        </ScrollView>
                        <TouchableOpacity onPress={pickCover} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }} >
                            <Icon name='camera' color={theme.color_1} size={20}></Icon>
                        </TouchableOpacity>
                    </View>
                    {(images[0] || content) &&
                        <View style={styles.viewButton}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                                <Text>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSaveStatus} style={styles.button}>
                                <Text>Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <Loading visiable={loading} />
            </View >
        </SafeAreaView>
    )
}
export default UpdateStatus;