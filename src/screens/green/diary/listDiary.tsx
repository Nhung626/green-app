import { View, Text, StyleSheet, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
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

const ListDiary = ({ data }) => {
    const theme = useTheme();
    const styles = st();
    const navigation = useNavigation<any>();
    const diary = data;
    return (
        <View style={styles.containerList}>
            <View style={styles.headerList}>
                <Ionicons name="calendar" size={20} color={theme.color_1} style={{ marginRight: 5, }} />
                <Text style={styles.date}>2024.04.03</Text>
                <TouchableOpacity>
                    <Icon name="trash" size={20} color={theme.color_1} style={{ marginLeft: 180, }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="pencil-square" size={20} color={theme.color_1} style={{ marginLeft: 8, }} />
                </TouchableOpacity>

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