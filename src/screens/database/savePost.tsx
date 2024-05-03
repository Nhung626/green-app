import React, { useCallback, useState } from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT } from '../../../utils/Dimension'
import { StatusBar } from 'expo-status-bar';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import st from './styles'
import useTheme from '../../hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context';
import APost from './post/aPost';
import { getItemObjectAsyncStorage } from '../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../constants/storage';
import { getAllSaveAction, searchPostAction } from '../../services/post/actions';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { searchGardenAction } from '../../services/garden/actions';

const SavePost = () => {
    const styles = st();
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [listPost, setListPost] = useState([]);
    const dispatch = useDispatch<any>();
    const [userInfo, setUserInfo] = useState<any>();
    const navigation = useNavigation<any>();

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await handelGetPost()
        setRefreshing(false);
    }, []);

    let userId
    const getUserId = async () => {
        userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await getUserInfo()
                await handelGetPost()
            }
            fetchData();
        }, []
        ))

    const getUserInfo = async () => {
        await getUserId();
        setLoading(true);
        const req = new FormData();
        req.append("userId", userId)
        try {
            const res = await dispatch(searchGardenAction(req));
            console.log('garden: ', res.payload.body[0])
            setUserInfo(res.payload.body[0]);
            console.log(userInfo)
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setLoading(false);
        }
    };

    const handelGetPost = async () => {
        setLoading(true)
        try {
            const res = await dispatch(getAllSaveAction());
            if (res?.payload) {
                console.log('status', res?.payload.body)
                setListPost(res?.payload.body);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching satus info:', error);
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        };

    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={theme.color_1}></StatusBar>
            <View style={styles.header_save}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={20}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerText}>Bài đã lưu</Text>
            </View>
            <View>
                {(listPost[0]) ? (
                    <FlatList
                        data={listPost}
                        renderItem={({ item }) => <APost data={item} />}
                        keyExtractor={item => item.id}
                        style={{
                            marginBottom: 50,
                        }}
                        refreshing={refreshing} // Trạng thái làm mới
                        onRefresh={onRefresh} // Hàm được gọi khi làm mới
                        onScroll={() => { onRefresh }}
                    // onEndReached={onEndReached} // Hàm được gọi khi người dùng đến cuối danh sách
                    // onEndReachedThreshold={0.1}
                    />
                ) : (
                    <Text style={{ marginLeft: 100, marginTop: 100, color: theme.color_1 }}>Bạn không lưu bài viết nào.</Text>
                )}
            </View>

        </SafeAreaView >
    );
};

export default SavePost;
