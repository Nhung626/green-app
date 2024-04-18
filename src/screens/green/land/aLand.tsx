import { View, Text, StyleSheet, StatusBar, ScrollView, Image, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
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

export default function ALand() {
    const route = useRoute<any>();
    const data = route.params?.data;
    const navigation = useNavigation()
    const theme = useTheme();
    const styles = st();
    const [listTree, setListTree] = useState([])
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const req = {
                'landId': data.id
            }
            try {
                const res = await dispatch(searchTreeAction(req));
                if (res.payload) {
                    setListTree(res.payload.body);
                    console.log('listTree: ',data);
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
    }, []);

    return (

        <SafeAreaView style={{ backgroundColor: "#F0f0f0" }}>
            <StatusBar backgroundColor={theme.color_2} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Normal</Text>
                <Icon name="edit" style={{ marginLeft: 260, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
                {/* Header bar */}
                <View>
                    <ScrollView horizontal
                        pagingEnabled
                        contentContainerStyle={styles.contentContainer}
                    >
                        <Image
                            // key={index}
                            style={styles.imgCover}
                            source={require('../../../../assets/images/cover.png')}
                        // source={{ uri: `${getImgCustomerUrl}?imageId=${id}` }}
                        />

                    </ScrollView>

                    <View>
                        <View style={{
                            backgroundColor: theme.color_2,
                            paddingTop: 24,
                        }}>
                            <Text
                                style={styles.title}>
                                Thông tin {data.name}
                            </Text>
                            <View style={{ flexDirection: 'column', paddingHorizontal: 10, marginHorizontal: 15, }}>
                                <View style={styles.boxTextRoom}>
                                    <Icon name='info' color={'gray'} />
                                    <Text style={styles.textBox}>Tên: {data.name}</Text>
                                </View>

                                <View style={styles.boxTextRoom}>
                                    <Icon name='info' color={'gray'} />
                                    <Text style={styles.textBox}>Diện tích {data.area}</Text>

                                </View>
                                <View style={styles.boxTextRoom}>
                                    <Icon name='info' color='gray' />
                                    <Text style={styles.textBox}>{data.address} </Text>
                                </View>

                                <View style={{ padding: 8, paddingRight: 20 }}>
                                    <Text
                                        style={{ textAlign: 'right', fontWeight: "400", fontSize: 16 }}>
                                        Tổng: 100 cây</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    listTree.map((item) => <Tree data={item} />)
                }
            </ScrollView>
            <Loading visiable={loading} />

        </SafeAreaView >
    );

}