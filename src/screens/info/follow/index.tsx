import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT } from '../../../../utils/Dimension'
import { StatusBar } from 'expo-status-bar';
import { Avatar, Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getFollowAction, searchGardenAction } from '../../../services/garden/actions';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { MEDIA } from '../../../constants/api';

const FollowUser = () => {
    const styles = st();
    const theme = useTheme();
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [listUser, setListUser] = useState([]);
    const dispatch = useDispatch<any>();
    const [userInfo, setUserInfo] = useState<any>();
    const navigation = useNavigation<any>();

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await handelGetUser()
        setRefreshing(false);
    }, []);

    let userId
    const getUserId = async () => {
        userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useEffect(() => {
        const fetchData = async () => {
            await handelGetUser()
        }
        fetchData();
    }, [])



    const handelGetUser = async () => {
        setLoading(true)
        try {
            const res = await dispatch(getFollowAction());
            if (res?.payload) {
                console.log('status', res?.payload.body)
                setListUser(res?.payload.body);
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
    const User = ({ user }) => (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignContent: 'center',
            marginHorizontal: 20,
            marginVertical: 15,
            borderBottomWidth: 0.4,
            borderBottomColor: theme.color_2,
        }}
            onPress={() => {
                if (user.userId !== userId) {
                    navigation.navigate(NAVIGATION_TITLE.PROFILE, { auth: user })
                }
            }}>
            <Avatar.Image size={50} source={{ uri: `${MEDIA.SELF}?id=${user?.userInfo.avatarId}` }} />
            <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: 'bold', color: theme.color_1 }}>{user?.name}</Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={theme.color_1}></StatusBar>
            <View style={styles.header_save}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={20}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerText}>Theo dõi</Text>
            </View>
            <View>
                {(listUser[0]) ? (
                    <FlatList
                        data={listUser}
                        renderItem={({ item }) => <User user={item} />}
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
                    <Text style={{ marginLeft: 100, marginTop: 100, color: theme.color_1 }}>Bạn chưa theo dõi ai cả.</Text>
                )}
            </View>

        </SafeAreaView >
    );
};

export default FollowUser;
