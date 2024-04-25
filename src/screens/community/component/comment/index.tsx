import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteCommentAction, likeCommentAction, unlikeCommentAction } from '../../../../services/comment/actions';
import SubComment from './subComment';
import AddComment from './addComment';
import { searchGardenAction } from '../../../../services/garden/actions';
import { useFocusEffect } from '@react-navigation/native';
import { MEDIA } from '../../../../constants/api';
import moment from 'moment';
import { getItemObjectAsyncStorage } from '../../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../../constants/storage';

const Comment = ({ data }) => {
    const styles = st();
    const theme = useTheme();
    const comment = data;
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>();
    const [isLiked, setIsLike] = useState(comment.userLiked)
    const [likeCount, setLikeCount] = useState(comment.likeCount);
    const [showSubComment, setShowSubComment] = useState(false);
    const [auth, setAuth] = useState<any>();
    const [parentCmt, setParentCmt] = useState({
        parentId: '',
        parentCmtUser: '',
    });
    const [isReply, setIsReply] = useState(false);

    const [userId, setUserId] = useState('');
    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const id = await getUserId();
                setUserId(id)
            }
            fetchData();
        }, []
    ))


    const handleLike = async () => {
        try {
            const res = await dispatch(likeCommentAction({ commentId: comment.id }))
            if (res.payload) {
                ToastAndroid.show('like', ToastAndroid.SHORT);
                setLikeCount(likeCount + 1);
                setIsLike(true)
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
    const handleUnLike = async () => {
        try {
            const res = await dispatch(unlikeCommentAction({ commentId: comment.id }))
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
    useEffect(() => {
        const fetchData = async () => {
            await getUserInfo()
        }
        fetchData();
    }, []);

    const getUserInfo = async () => {
        setLoading(true);
        const req = new FormData();
        req.append("userId", comment.userId)
        try {
            const res = await dispatch(searchGardenAction(req));
            setAuth(res.payload.body[0]);
            console.log()
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setLoading(false);
        }
    };

    const handleDeleteComment = () => {
        // Hiển thị hộp thoại xác nhận
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa comment này không? ',
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
                            const res = await dispatch(deleteCommentAction({ 'id': comment.id }));
                            if (res.payload) {
                                navigation.goBack();
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
    return (
        <View style={{ marginVertical: 5, }}>
            <View style={{ flexDirection: 'row' }}>
                <Avatar.Image size={25} source={{ uri: `${MEDIA.SELF}?id=${auth?.userInfo.avatarId}` }} />
                <View style={{ marginLeft: 5, backgroundColor: theme.color_2, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 5, marginRight: 10, width: 300 }}>
                    <Text style={styles.username}>{auth?.name}</Text>
                    <Text style={styles.comment}>{comment.content}</Text>
                </View>
            </View>
            <View style={{}}>
                <View style={{ flexDirection: 'row', marginLeft: 35 }}>
                    {isLiked ? (
                        <TouchableOpacity style={{ marginRight: 5, }}
                            onPress={handleUnLike}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: '600',
                                color: theme.color_1,
                            }}>Like</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ marginRight: 5, }}
                            onPress={handleLike}>
                            <Text style={{
                                fontSize: 12,
                                color: theme.color_4,
                            }}>Like</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={{
                        fontSize: 12,
                        color: theme.color_4,
                    }}>{comment.likeCount}</Text>
                    <TouchableOpacity style={{ marginRight: 5, }}
                        onPress={() => {
                            setIsReply(true)
                            setParentCmt({
                                parentId: comment.id,
                                parentCmtUser: auth.name,
                            })
                        }}
                    >
                        <Text style={{
                            fontSize: 12,
                            color: theme.color_4,
                        }}>Reply</Text>
                    </TouchableOpacity >
                    <Text style={{
                        fontSize: 12,
                        color: theme.color_4,
                    }}>{moment(comment.createdAt).fromNow()}</Text>
                    {(comment.userId === userId) &&
                        <View style={{ flexDirection: 'row', marginLeft: 83 }}>
                            <TouchableOpacity style={{ marginRight: 5, }}
                                onPress={() => handleDeleteComment()}>
                                <Text style={{
                                    fontSize: 12,
                                    color: theme.color_4,
                                }}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                {(data.countReply > 0 && showSubComment) ? (
                    <TouchableOpacity
                        onPress={() => setShowSubComment(true)}
                    >
                        <Text>
                            Xem thêm {comment.countReply} câu trả lời
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <SubComment data={comment.id} />
                )}
            </View>
        </View >
    )
}
export default Comment;
