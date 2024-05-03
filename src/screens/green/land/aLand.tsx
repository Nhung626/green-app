import {
    View, Text, StyleSheet, StatusBar, ScrollView, Image, Alert,
    FlatList, TouchableOpacity, ToastAndroid
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import useTheme from '../../../hooks/useTheme'
import st from './styles';
import Tree from '../tree/tree';
import { searchTreeAction } from '../../../services/tree/actions';
import { useDispatch } from 'react-redux';
import Loading from '../../../../utils/loading/loading';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { MEDIA } from '../../../constants/api';

export default function ALand() {
    const route = useRoute<any>();
    const land = route.params?.data;
    const isShow = route.params?.isShow;
    const navigation = useNavigation<any>()
    const theme = useTheme();
    const styles = st();
    const [listTree, setListTree] = useState([])
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const res = await dispatch(searchTreeAction({ 'landId': land.id }));
                    if (res.payload) {
                        setListTree(res.payload.body);
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
            fetchData();
        }, [])
    );

    return (
        <SafeAreaView style={{ backgroundColor: "#F0f0f0", flex: 1 }}>
            <StatusBar backgroundColor={theme.color_2} />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerText}>{land.name}</Text>
                {(isShow) &&
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NAVIGATION_TITLE.UPDATE_LAND, { 'data': land })}
                    >
                        <Icon name="edit" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
                    </TouchableOpacity>
                }
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 90, }}>
                {/* Header bar */}
                <View style={{ paddingBottom: 10, }}>
                    <ScrollView horizontal
                        pagingEnabled
                        contentContainerStyle={styles.contentContainer}
                    >
                        <Image
                            // key={index}
                            style={styles.imgCover}
                            source={{ uri: `${MEDIA.SELF}?id=${land?.imgId}` }}
                        />

                    </ScrollView>

                    <View>
                        <View style={{
                            backgroundColor: theme.color_2,
                            paddingTop: 24,
                        }}>
                            <Text
                                style={styles.title}>
                                Thông tin {land.name}
                            </Text>
                            <View style={{ flexDirection: 'column', paddingHorizontal: 10, marginHorizontal: 15, }}>
                                <View style={styles.boxTextRoom}>
                                    <Text style={styles.textBox}>Tên: {land.name}</Text>
                                </View>

                                <View style={styles.boxTextRoom}>
                                    <Text style={styles.textBox}>Diện tích {land.area}</Text>

                                </View>
                                <View style={styles.boxTextRoom}>
                                    <Text style={styles.textBox}>Địa chỉ: {land.address} </Text>
                                </View>

                                {/* <View style={{ padding: 8, paddingRight: 20 }}>
                                    <Text
                                        style={{ textAlign: 'right', fontWeight: "400", fontSize: 16 }}>
                                        Tổng:  cây</Text>
                                </View> */}
                            </View>
                        </View>
                    </View>
                </View>

                {(listTree[0]) ? (
                    listTree.map((item) => <Tree key={item.id} data={item} isShow={isShow} />)
                ) : (
                    <Text style={{ marginHorizontal: 50, marginTop: 100, color: theme.color_1 }}>Chưa có cây nào trong vườn. Trồng thêm cây mới ngay nào</Text>
                )}
            </ScrollView>
            {(isShow) &&
                <TouchableOpacity style={styles.plus}
                    onPress={() => navigation.navigate(NAVIGATION_TITLE.ADD_TREE, { 'userId': land.userIId })}
                >
                    <Icon name='plus' size={20} style={{ color: theme.color_1 }}>
                    </Icon>
                </TouchableOpacity>
            }
            <Loading visiable={loading} />
        </SafeAreaView >
    );

}