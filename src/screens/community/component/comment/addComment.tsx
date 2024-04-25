import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar } from 'react-native-paper';
import { Input } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome";
import { getItemObjectAsyncStorage } from '../../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../../constants/storage';
import { createCommentAction } from '../../../../services/comment/actions';
import { useDispatch } from 'react-redux';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { searchGardenAction } from '../../../../services/garden/actions';
import { MEDIA } from '../../../../constants/api';

const AddComment = ({ data }) => {
    const styles = st();
    const theme = useTheme();
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>();
    const [user, setUser] = useState<any>();
    const [parentCmt, setParentCmt] = useState({
        parentId: '',
        parentCmtUser: '',
    });

    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                getUserInfo()
            }
            fetchData();
        }, []
        ))

    const getUserInfo = async () => {
        setLoading(true);
        const userId  = await getUserId()
        if (data?.parentCmt) {
            setParentCmt(data.parentCmt);
        }
        await getUserId()
        const req = new FormData();
        req.append("userId", userId)
        try {
            const res = await dispatch(searchGardenAction(req));
            setUser(res.payload.body[0]);
            console.log()
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setLoading(false);
        }
    };
    const handleSaveCommnet = async () => {
        const userId  = await getUserId()
        try {
            const req = {
                'statusId': data?.statusId,
                'parentId': parentCmt?.parentId,
                'userId': userId,
                'content': content
            }
            const res = await dispatch(createCommentAction(req));

            if (res.payload) {
                setLoading(false);
                setContent('');
                ToastAndroid.show('Tạo thành công!', ToastAndroid.SHORT);
                // navigation.goBack();
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

    const handleRemove = () => {
        setParentCmt(
            {
                parentId: '',
                parentCmtUser: '',
            }
        )
    }
    return (
        <View >
            {(data?.parentId) &&
                <View style={{ flexDirection: 'row', marginLeft: 45 }}>
                    <Text style={{ fontSize: 10, color: theme.color_1 }}> Trả lời comment {data.parentId}</Text>
                    <TouchableOpacity onPress={handleRemove}>
                        <Text style={{ fontSize: 10, color: theme.color_1, fontWeight: 'bold' }}> - Hủy</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={{ flexDirection: 'row', paddingBottom: 10, paddingHorizontal: 5 }} >
                <TouchableOpacity>
                    <Avatar.Image size={30} source={{ uri: `${MEDIA.SELF}?id=${user?.userInfo.avatarId}` }} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.2,
                    borderRadius: 5,
                    borderColor: theme.color_1,
                    marginLeft: 10,

                }}>
                    <TextInput
                        multiline={true}
                        numberOfLines={1}
                        textAlignVertical="top"
                        cursorColor={'gray'}
                        placeholder='Viết bình luận'
                        value={content}
                        style={{ width: 290 }}
                        onChangeText={(text) => setContent(text)}
                    ></TextInput>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}
                        onPress={handleSaveCommnet}>
                        <Icon name='send' color={theme.color_1} size={20}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default AddComment;