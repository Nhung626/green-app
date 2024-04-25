import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, View, Image, ImageBackground, TouchableOpacity, ScrollView, Alert, ToastAndroid, useWindowDimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from '@rneui/themed';
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useDispatch } from 'react-redux'
import { useNavigation, useIsFocused, useRoute, useFocusEffect } from "@react-navigation/native";
import { MEDIA } from '../../../constants/api';
import Loading from '../../../../utils/loading/loading';
import ListLand from '../../green/land';
import ListTree from '../../green/tree';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import { followAction, unfollowAction } from '../../../services/user/actions';
import { searchStatusAction } from '../../../services/status/actions';
import Status from '../../community/component/status';


const Profile = () => {
    const styles = st();
    const theme = useTheme();
    const layout = useWindowDimensions();
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const gardenInfo = route.params.auth;
    const userInfo = route.params.auth?.userInfo;
    const dispatch = useDispatch<any>();
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)
    const [isFollow, setIsFollow] = useState(true);
    const [userId, setUserId] = useState('');
    const [listStatus, setListStatus] = useState<any>([]);
    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await handelGetStatus();
                setIsFollow(route.params.auth?.userInfo.follow);
            }
            fetchData();
        }, []
        ))

    const TreeScreen = () => (
        <ListTree data={gardenInfo?.id} isShow={false} />
    );

    const LandScreen = () => (
        <ListLand data={gardenInfo?.userId} isShow={false} />
    );

    const StatusScreen = () => (
        <FlatList
            data={listStatus}
            renderItem={({ item }) => <Status data={item} />}
            keyExtractor={item => item.id}
        />
    );


    const renderScene = SceneMap({
        first: TreeScreen,
        second: LandScreen,
        third: StatusScreen,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Cây' },
        { key: 'second', title: 'Vườn' },
        { key: 'third', title: 'Bài viết' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            renderLabel={({ route, focused, color }) => (
                <Text style={styles.tabBar}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: theme.backgroundColor_1 }}
            style={{
                backgroundColor: theme.backgroundColor_2
            }}
        />
    );

    const handleFollow = async () => {
        try {
            const req = new FormData();
            req.append("userFollowId", gardenInfo.userId);
            const res = await dispatch(followAction(req))
            if (res.payload) {
                ToastAndroid.show('Theo dõi', ToastAndroid.SHORT);
                setIsFollow(true)
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
    const handleUnFollow = async () => {
        try {
            const res = await dispatch(unfollowAction({ userFollowId: gardenInfo.userId }))
            if (res.payload) {
                setIsFollow(false);
                setLoading(false);
                ToastAndroid.show('Bỏ theo dõi', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        }
    }

    const handelGetStatus = async () => {
        setLoading(true)
        await getUserId();
        try {
            const res = await dispatch(searchStatusAction({ userId: gardenInfo.userId }));
            if (res?.payload) {
                console.log('status', res?.payload.body)
                setListStatus(res?.payload.body);
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
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.color_2} />
            <ImageBackground
                source={require('../../../../assets/images/paper.png')}
                resizeMode="cover">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ margin: 10 }} color={theme.color_1} size={25}></Icon>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                    <Image source={{ uri: `${MEDIA.SELF}?id=${userInfo?.avatarId}` }} style={styles.avata} />
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text style={styles.userName}>VƯỜN CỦA {gardenInfo?.name.toUpperCase()}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            source={require('../../../../assets/images/icon/ic_leaf.png')}
                            style={styles.iconBio}
                        />
                        <Text style={styles.bio}>{gardenInfo?.description}</Text>
                    </View>
                </View>
                {(isFollow) ? (
                    <TouchableOpacity
                        onPress={() => handleUnFollow()}
                        style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}
                    >
                        <Text
                            style={{
                                color: theme.color_1,
                                textAlign: 'center',
                                padding: 10,
                                backgroundColor: theme.color_2,
                                borderRadius: 15,
                                fontWeight: '600',
                                width: 100,
                            }}
                        >Bỏ theo dõi</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => handleFollow()}
                        style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}
                    >
                        <Text
                            style={{
                                color: theme.color_1,
                                textAlign: 'center',
                                padding: 10,
                                backgroundColor: theme.color_2,
                                borderRadius: 15,
                                fontWeight: '600',
                                width: 100,
                            }}
                        >Theo dõi</Text>
                    </TouchableOpacity>
                )}
            </ImageBackground>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                swipeEnabled={false} />
            <Loading visiable={loading} />
        </SafeAreaView >
    );
};

export default Profile;