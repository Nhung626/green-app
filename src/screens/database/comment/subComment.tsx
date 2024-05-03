import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, StatusBar, ToastAndroid, FlatList } from 'react-native';
import { SCREEN_HEIGHT } from '../../../../utils/Dimension'
import st from './styles'
import useTheme from '../../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import { searchCommentAction } from '../../../services/comment/actions';
import Comment from '.';
const SubComment = ({ data }) => {
    const styles = st();
    const theme = useTheme();
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<any>();
    const [refreshing, setRefreshing] = useState(false);
    const [listComment, setListComment] = useState([]);
    const [keyword, setKeyword] = useState('')

    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await handelGetComment()
            }
            fetchData();
        }, []
        ))

    const handelGetComment = async () => {
        setLoading(true)
        try {
            const res = await dispatch(searchCommentAction({ 'parentId': data }));
            if (res?.payload) {
                setListComment(res?.payload.body);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching garden info:', error);
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        };

    }
    return (
        <View style={{
            marginLeft: 10,
        }}>
            {listComment.map((item) => (
                <Comment key={item.id} data={item} />
            ))}
        </View>
    );
};

export default SubComment;
