import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import st from './styles'
import * as Icon from "react-native-feather";
import useTheme from '../../../hooks/useTheme'
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { MEDIA } from '../../../constants/api';

const Land = ({ data }) => {
    const theme = useTheme();
    const styles = st();
    const navigation = useNavigation<any>();
    const land = data;
    console.log('land', land)
    return (

        <View style={styles.boxStyle}>
            <View style={{ marginRight: 15 }}>
                <Image
                    style={{ width: 144, height: 200, borderRadius: 30, resizeMode: 'cover' }}
                    source={require("../../../../assets/images/cover.png")}
                />
            </View>
            <View>
                <View style={{ rowGap: 5 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NAVIGATION_TITLE.A_LAND, {data: land})}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            flexWrap: 'wrap',
                            color: theme.text_3
                        }}>{data.name}</Text>
                    </TouchableOpacity>

                    <View style={styles.boxText}>
                        <Icon.Info color={'gray'} width={15} height={15} />
                        <Text style={styles.textInfo}>Mùa cây thứ 2</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Icon.Info color={'gray'} width={15} height={15} />
                        <Text style={styles.textInfo}>Trồng cây: {data.typeTree}</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Icon.Info color={'gray'} width={15} height={15} />
                        <Text style={styles.textInfo}>Diện tích: {data.area}</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Icon.Info color={'gray'} width={15} height={15} />
                        <Text style={styles.textInfo}>Ngày bắt đầu: {data.creatAt}</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Icon.Info color={'gray'} width={15} height={15} />
                        <Text style={styles.textInfo}>Cập nhật trạng thái</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Icon.Phone color={'gray'} width={15} height={15} />
                        <Text style={styles.textInfo}>Loại đất</Text>
                    </View>
                    <View style={styles.boxText}>
                        <Icon.MapPin color='gray' width={15} height={15} />
                        <Text style={styles.textInfo}>{data.address}</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Land;