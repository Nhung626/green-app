import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid, Alert } from 'react-native'
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { MEDIA } from '../../../constants/api';
import Icon from "react-native-vector-icons/FontAwesome";
import { deleteLandAction } from '../../../services/land/actions';
import { useDispatch } from 'react-redux';
import { getItemObjectAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import moment from 'moment';

const Land = ({ data, isShow }) => {
    const theme = useTheme();
    const styles = st();
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<any>();
    const land = data;

    const handleDeleteLand = () => {
        // Hiển thị hộp thoại xác nhận
        Alert.alert(
            'Xác nhận',
            'Mọi dữ liệu liên quan đến mảnh vườn này sẽ mất. Bạn có chắc chắn muốn xóa không? ',
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
                            const res = await dispatch(deleteLandAction({ 'id': land.id }));
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
                <View style={{}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NAVIGATION_TITLE.A_LAND, { data: land, isShow: isShow })}>
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 20,
                            flexWrap: 'wrap',
                            color: theme.text_3,
                            marginBottom: 10
                        }}>{data.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.boxText}>
                        <Text style={styles.textInfo}>Diện tích: {data.area} m²</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.textInfo}>Ngày bắt đầu: {moment(data.createdAt).format('DD-MM-YYYY')}</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Text style={styles.textInfo}>Địa chỉ: {data.address}</Text>
                    </View>
                </View>

            </View>
            {(isShow) &&
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', top: 10, right: 15 }}>
                    <TouchableOpacity style={{ marginRight: 15 }}
                        onPress={handleDeleteLand}>
                        <Icon name='trash' color='gray' size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NAVIGATION_TITLE.UPDATE_LAND, { 'data': land })}
                    >
                        <Icon name='pencil' color='gray' size={18} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default Land;