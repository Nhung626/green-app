import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar, IconButton } from 'react-native-paper';
import Comment from '../comment';
import AddComment from '../comment/addComment';
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteStatusAction, likeStatusAction, unlikeStatusAction } from '../../../../services/status/actions';
import { MEDIA } from '../../../../constants/api';
import { searchGardenAction } from '../../../../services/garden/actions';
import { useFocusEffect } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../../constants/navigation';
import { searchCommentAction } from '../../../../services/comment/actions';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { getItemObjectAsyncStorage } from '../../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../../constants/storage';

const Status = ({ data }) => {

    const styles = st();
    const theme = useTheme();
    const status = data;
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>();
    const [isLiked, setIsLike] = useState(status.userLiked);
    const [likeCount, setLikeCount] = useState(status.countLike);
    const [listComment, setListComment] = useState<any>([]);
    const [auth, setAuth] = useState<any>();
    const [userId, setUserId] = useState('');
    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const id = await getUserId();
                // setIsLike(status.userLiked)
                // setLikeCount(status.countLike)
                setUserId(id)
                await getUserInfo()
                await handleGetComment()
            }
            fetchData();
        }, []
    ))
    const handleLike = async () => {
        try {
            const req = new FormData();
            req.append("statusId", status.id);
            const res = await dispatch(likeStatusAction(req))
            if (res.payload) {
                ToastAndroid.show('like', ToastAndroid.SHORT);
                setLikeCount(likeCount + 1);
                setIsLike(true);
                setLoading(false);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        }
    };

    const getUserInfo = async () => {
        setLoading(true);
        try {
            const res = await dispatch(searchGardenAction({ userId: status.userId }));
            console.log('garden: ', res.payload.body[0])
            setAuth(res.payload.body[0]);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setLoading(false);
        }
    };

    const handleDeleteStatus = () => {
        // Hiển thị hộp thoại xác nhận
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa bài viết này không? ',
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
                        try {
                            const res = await dispatch(deleteStatusAction({ 'id': status.id }));
                            if (res.payload) {
                                ToastAndroid.show('Đã xóa!', ToastAndroid.SHORT);
                            } else {
                                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                            }
                        } catch (error) {
                            console.error('Error fetching delete:', error);
                            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                        };
                        // Đóng hộp thoại xác nhận
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const PostOptions = () => {
        return (
            <Menu>
                <MenuTrigger>
                    <View style={{ padding: 10 }}>
                        <Icon name="ellipsis-v" size={20} color={theme.color_1} />
                    </View>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={() => handleDeleteStatus()} text='Xóa' />
                    <MenuOption onSelect={() => navigation.navigate(NAVIGATION_TITLE.UPDATE_STATUS, { data: status })} text='Chỉnh sửa' />
                </MenuOptions>
            </Menu>
        );
    };

    const handleUnLike = async () => {
        try {
            const res = await dispatch(unlikeStatusAction({ statusId: status.id }))
            if (res.payload) {
                setIsLike(false);
                setLikeCount(likeCount - 1);
                setLoading(false);
                ToastAndroid.show('unlike', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        }
    }
    const handleGetComment = async () => {
        try {
            const res = await dispatch(searchCommentAction({ statusId: status.id }))
            if (res.payload) {
                setListComment(res?.payload.body)
                setLoading(false);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        }
    }
    return (
        <View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                        onPress={() => {
                            if (status.userId !== userId) {
                                navigation.navigate(NAVIGATION_TITLE.PROFILE, { auth: auth })
                            }
                        }}>
                        <Avatar.Image size={30} source={{ uri: `${MEDIA.SELF}?id=${auth?.userInfo.avatarId}` }} />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.username}>{auth?.name}</Text>
                            <Text style={styles.date}>{moment(status.createdAt).fromNow()}</Text>
                        </View>
                    </TouchableOpacity>
                    {(status.userId === userId) &&
                        <PostOptions />
                    }
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(NAVIGATION_TITLE.A_STATUS, { 'status': status, 'auth': auth, 'listComment': listComment })}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.textContent}>
                            {status.content}
                        </Text>
                        <ScrollView horizontal pagingEnabled>
                            {status.imgIds.map((id, index) => (
                                <Image
                                    key={index}
                                    style={{
                                        width: 360,
                                        marginHorizontal: 2, // Lấy width của thẻ chứa hình ảnh
                                        height: 180,
                                        resizeMode: 'cover',
                                        borderRadius: 20,
                                    }}
                                    source={{ uri: `${MEDIA.SELF}?id=${id}` }}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                        {isLiked ? (
                            <TouchableOpacity
                                onPress={handleUnLike}>
                                <Icon name='heart'
                                    color={theme.color_2}
                                    size={20}></Icon>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={handleLike}>
                                <Icon name='heart-o'
                                    color={theme.color_2}
                                    size={20}></Icon>
                            </TouchableOpacity>
                        )}
                        {(likeCount > 0) &&
                            <Text style={{ color: theme.color_1, fontSize: 12, fontWeight: '600' }}> {likeCount} </Text>
                        }
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                        <Icon name='comment-o'
                            color={theme.color_2}
                            size={20}></Icon>
                        {(listComment.length > 0) &&
                            <Text style={{ color: theme.color_1, fontSize: 12, fontWeight: '600' }}> {listComment.length} </Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}
export default Status;