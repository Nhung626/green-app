import { View, Text, StyleSheet, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../../../hooks/useTheme'
import st from './styles'
import ListDiary from '../diary/listDiary';
import { MEDIA } from '../../../constants/api';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { useDispatch } from 'react-redux';
import { searchDiaryAction } from '../../../services/diary/actions';

export default function ATree() {
    const navigation = useNavigation<any>()
    const theme = useTheme();
    const styles = st();
    const route = useRoute<any>();
    const tree = route.params?.data;
    const [loading, setLoading] = useState(false);
    const [listDiary, setListDiary] = useState([]);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const req = new FormData();
            req.append("treeId", tree.id)
            console.log(req)
            try {
                const res = await dispatch(searchDiaryAction(req));
                if (res.payload) {
                    setListDiary(res?.payload.body);
                    console.log('listDiary: ', res?.payload.body);
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
                <Text style={styles.headerText}>{tree.name}</Text>
                <TouchableOpacity>
                    <Icon name="edit" style={{ marginLeft: 260, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
                </TouchableOpacity>
            </View>
            {/* Header bar */}
            <ScrollView contentContainerStyle={{
                paddingBottom: 90,
            }}>
                <ScrollView horizontal
                    pagingEnabled
                    contentContainerStyle={styles.contentContainer}
                >
                    <Image
                        style={styles.imgCover}
                        // source={require('../../../../assets/images/cover.png')}
                        source={{ uri: `${MEDIA.SELF}?id=${tree.imgId}` }}
                    />

                </ScrollView>

                <View style={styles.container}>
                    <View style={{
                        backgroundColor: theme.color_2,
                        paddingTop: 24,
                    }}>
                        <Text
                            style={{
                                fontWeight: '600',
                                fontSize: 24,
                                paddingVertical: 10,
                                marginHorizontal: 16,
                                borderTopColor: 'grey',
                                color: theme.color_1,
                                borderTopWidth: 0.5,
                            }}>
                            Thông tin {tree.name}
                        </Text>
                        <View style={{ rowGap: 5, paddingHorizontal: 10, marginHorizontal: 15, paddingBottom: 10 }}>
                            <View style={styles.info}>
                                <Icon name='info' color={'gray'} size={12} />
                                <Text style={styles.textBox}>Tên: {tree.name}</Text>
                            </View>

                            <View style={styles.info}>
                                <Icon name='info' color={'gray'} size={12} />

                                <Text style={styles.textBox}>Loại cây: {tree.typeTree}</Text>

                            </View>
                            <View style={styles.info}>
                                <Icon name='info' color={'gray'} size={12} />

                                <Text style={styles.textBox}>{tree.startDate}</Text>
                            </View>
                            <View style={styles.info}>
                                <Icon name='info' color={'gray'} size={12} />
                                <Text style={styles.textBox}>Trạng thái: </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    listDiary.map((item) => <ListDiary data={item} />)
                }
            </ScrollView>
            <TouchableOpacity style={styles.add}
                onPress={() => navigation.navigate(NAVIGATION_TITLE.ADD_DIARY)}
            >
                <Icon name='plus' size={15} style={{ color: theme.color_4 }}></Icon>
            </TouchableOpacity>
        </SafeAreaView >
    );

}