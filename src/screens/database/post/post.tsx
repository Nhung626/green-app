import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ToastAndroid, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../utils/Dimension';
import { useDispatch } from 'react-redux';
import { likePostAction, savePostAction, unlikePostAction, unsavePostAction } from '../../../services/post/actions';
import { useNavigation, useRoute } from "@react-navigation/native";
import { MEDIA } from '../../../constants/api';
import Loading from '../../../../utils/loading/loading';
import AddCommentPost from '../comment/addComment';
import { searchCommentPostAction } from '../../../services/commentpost/actions';
import CommentPost from '../comment';


const Post = () => {
    const styles = st();
    const theme = useTheme();
    const route = useRoute<any>();
    const post = route?.params.data;
    const [isLike, setIsLike] = useState(post.userLiked)
    const [isSave, setIsSave] = useState(post.userSaved)
    const [likeCount, setLikeCount] = useState(post.countLike);
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>();
    const [showCmt, setShowComment] = useState(false)
    const [listComment, setListComment] = useState<any>();
    const [refreshing, setRefreshing] = useState(false);

    const handleGetComment = async () => {
        try {
            const res = await dispatch(searchCommentPostAction({ postId: post.id }))
            if (res.payload) {
                setListComment(res?.payload.body)
                console.log('hhh: ', listComment);
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
    const onRefresh = async () => {
        setRefreshing(true);
        await handleGetComment()
        setRefreshing(false);
    };
    const handleLike = async () => {
        try {
            const req = new FormData();
            req.append("postId", post.id);
            const res = await dispatch(likePostAction(req))
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
    };
    const handleUnLike = async () => {
        try {
            const res = await dispatch(unlikePostAction({ postId: post.id }))
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

    const handleSave = async () => {
        try {
            const res = await dispatch(savePostAction({ postId: post.id }))
            if (res.payload) {
                ToastAndroid.show('save', ToastAndroid.SHORT);
                setIsSave(true)
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
    const handleUnSave = async () => {
        try {
            const res = await dispatch(unsavePostAction({ postId: post.id }))
            if (res.payload) {
                setIsSave(false);
                setLoading(false);
                ToastAndroid.show('unsave', ToastAndroid.SHORT);
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
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.title}>{post.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>{post.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>{post.typeTree}</Text>
                    </TouchableOpacity>
                </View>
                {isSave ? (
                    <TouchableOpacity style={{ position: 'absolute', top: 25, right: 10 }}
                        onPress={handleUnSave}>
                        <Icon color={theme.color_1} size={35} name="bookmark"></Icon>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{ position: 'absolute', top: 25, right: 10 }}
                        onPress={handleSave}>
                        <Icon color={theme.color_1} size={35} name="bookmark-o"></Icon>
                    </TouchableOpacity>
                )}

            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.general}>
                        <Text style={[styles.textGeneral, { fontStyle: 'italic', fontSize: 10 }]}>Ngày: 2024.04.04</Text>
                        <Text style={styles.textGeneral}>Tác giả: {post.auth}</Text>
                        <Text style={styles.textGeneral}>Giới thiệu: {post.general}</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.titleContent}>Nội dung</Text>
                        <Text style={styles.textContent}>
                            {post.description}
                        </Text>
                    </View>
                    <View style={styles.boxImage}>
                        <ScrollView horizontal pagingEnabled>
                            {post.imageIds.map((id, index) => (
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
                    <View style={styles.content}>
                        <Text style={styles.titleContent}>Cách Chăm Sóc</Text>
                        <Text style={styles.textContent}>
                            {post.takeCare}
                        </Text>
                    </View>
                    <Text style={{ textAlign: "right", marginRight: 10, fontStyle: 'italic' }}>Nguồn: green.com.vn</Text>
                    <View style={styles.boxRect}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                            {isLike ? (
                                <TouchableOpacity
                                    onPress={handleUnLike}>
                                    <Icon name='heart'
                                        color={theme.color_2}
                                        size={30}></Icon>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={handleLike}>
                                    <Icon name='heart-o'
                                        color={theme.color_1}
                                        size={30}></Icon>
                                </TouchableOpacity>
                            )}

                        </View>
                        <TouchableOpacity style={{ marginVertical: 0 }}
                            onPress={handleGetComment}
                        >
                            <Icon color={theme.color_1} size={30} name="comment-o"></Icon>
                        </TouchableOpacity>
                    </View>
                    {(listComment) && listComment.map((item) => (
                        <CommentPost key={item.id} data={item} />
                    ))}
                    <AddCommentPost data={{ 'postId': post.id }}></AddCommentPost>
                </View>
            </ScrollView>
            <Loading visiable={loading}></Loading>
        </SafeAreaView >
    )
}
export default Post