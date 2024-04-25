import React, { useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { MEDIA } from '../../../constants/api';
import moment from "moment";
import { deleteTreeAction } from '../../../services/tree/actions';
import { useDispatch } from 'react-redux';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';


const Tree = ({ data, isShow }) => {
    const theme = useTheme();
    const styles = st();
    const navigation = useNavigation<any>();
    const tree = data;
    const dispatch = useDispatch<any>();
    const handleDeleteTree = () => {
        // Hiển thị hộp thoại xác nhận
        Alert.alert(
            'Xác nhận',
            'Mọi dữ liệu liên quan đến cây này sẽ mất. Bạn có chắc chắn muốn xóa cây này? ',
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
                            const res = await dispatch(deleteTreeAction({ 'id': tree.id }));
                            if (res.payload) {
                                ToastAndroid.show('Đã xóa!', ToastAndroid.SHORT);
                            } else {
                                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                            }
                        } catch (error) {
                            console.error('Error fetching garden info:', error);
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
        <View style={styles.boxStyle}>
            <View style={{ marginRight: 15 }}>
                <Image
                    style={{ width: 114, height: 150, borderRadius: 30, resizeMode: 'cover' }}
                    source={{ uri: `${MEDIA.SELF}?id=${data?.imgId}` }}
                />
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(NAVIGATION_TITLE.A_TREE, { data: tree, isShow: isShow })}>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 20, flexWrap: 'wrap',
                        color: theme.text_3,
                        marginBottom: 10
                    }}>{data.name}</Text>
                </TouchableOpacity>

                <View style={styles.boxText}>

                    <Text style={styles.textInfo}>Loại cây: {data.type}</Text>
                </View>

                <View style={styles.boxText}>

                    <Text style={styles.textInfo}>Đã trồng được {moment().diff(data.startDate, 'days')} ngày</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>Số lượng: {tree.sum}</Text>
                </View>
                
                <View style={styles.boxText}>

                    <Text style={styles.textInfo}>Ngày bắt đầu: {moment(data.startDate).format('DD.MM.YYYY')}</Text>
                </View>


                <View style={styles.boxText}>

                    <Text style={styles.textInfo}>{data.landName}</Text>
                </View>
            </View>
            {(isShow) &&
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', top: 10, right: 15 }}>
                    <TouchableOpacity style={{ marginRight: 15 }}
                        onPress={handleDeleteTree}>
                        <Icon name='trash' color='gray' size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NAVIGATION_TITLE.UPDATE_TREE, { 'data': tree })}
                    >
                        <Icon name='pencil' color='gray' size={18} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default Tree;