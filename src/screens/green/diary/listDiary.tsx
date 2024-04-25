import { View, Text, StyleSheet, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import useTheme from '../../../hooks/useTheme'
import st from './styles'
import { SCREEN_WIDTH } from '../../../../utils/Dimension';
import { MEDIA } from '../../../constants/api';
import { useDispatch } from 'react-redux';
import { deleteDiaryAction } from '../../../services/diary/actions';

const ListDiary = ({ data, isShow }) => {
    const theme = useTheme();
    const styles = st();
    const navigation = useNavigation<any>();
    const diary = data;
    const dispatch = useDispatch<any>();
    const handleDeleteDiary = () => {
        // Hiển thị hộp thoại xác nhận
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa nhật ký này không? ',
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
                            const res = await dispatch(deleteDiaryAction({ 'id': diary.id }));
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
        <View style={styles.containerList}>
            <View style={styles.headerList}>
                <Ionicons name="calendar" size={20} color={theme.color_1} style={{ marginRight: 5, }} />
                <Text style={styles.date}>{moment(diary.createdAt).format('DD.MM.YYYY')}</Text>
                {(isShow) &&
                    <View style={styles.headerList}>
                        <TouchableOpacity
                            onPress={handleDeleteDiary}>
                            <Icon name="trash" size={20} color={theme.color_1} style={{ marginLeft: 160, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(NAVIGATION_TITLE.UPDATE_DIARY, { 'data': diary })}

                        >
                            <Icon name="pencil-square" size={20} color={theme.color_1} style={{ marginLeft: 8, }} />
                        </TouchableOpacity>
                    </View>
                }

            </View>
            <View style={styles.list}>
                <View style={styles.boxImage}>
                    <ScrollView horizontal pagingEnabled>
                        {diary.imgIds.map((id, index) => (
                            <Image
                                key={index}
                                style={{
                                    width: 120, // Lấy width của thẻ chứa hình ảnh
                                    height: 120,
                                    resizeMode: 'cover',
                                    borderRadius: 20,
                                }}
                                source={{ uri: `${MEDIA.SELF}?id=${id}` }}
                            />
                        ))}
                    </ScrollView>
                </View>

                <View >
                    <Text style={styles.boxStyle}>
                        {diary.description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ListDiary;