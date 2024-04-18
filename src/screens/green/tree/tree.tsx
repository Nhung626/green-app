import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { MEDIA } from '../../../constants/api';


const Tree = ({data}) => {
    const theme = useTheme();
    const styles = st();
    const navigation = useNavigation<any>();
    const tree = data;
    return (
        <View style={styles.boxStyle}>
            <View style={{ marginRight: 15 }}>
                <Image
                    style={{ width: 114, height: 180, borderRadius: 30, resizeMode: 'cover' }}
                    source={{ uri: `${MEDIA.SELF}?id=${data?.imgId}` }}
                />
            </View>
            <View>
                <View style={{ rowGap: 5 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(NAVIGATION_TITLE.A_TREE, {data: tree})}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, flexWrap: 'wrap', color: theme.text_3 }}>{data.name}</Text>
                    </TouchableOpacity>

                    <View style={styles.boxText}>
                        {/* <Icon name='info' color={'gray'} size={15} /> */}
                        <Text style={styles.textInfo}>Loại cây: {data.typeTree}</Text>
                    </View>
                    <View style={styles.boxText}>
                        {/* <Icon name='info' color={'gray'} size={15} /> */}
                        <Text style={styles.textInfo}>Ngày bắt đầu: {data.startDate}</Text>
                    </View>
                    <View style={styles.boxText}>
                        {/* <Icon name='info' color={'gray'} size={15} /> */}
                        <Text style={styles.textInfo}>365 ngày</Text>
                    </View>

                    <View style={styles.boxText}>
                        {/* <Icon name='info' color={'gray'} size={15} /> */}
                        <Text style={styles.textInfo}>Dự kiến ngày thu hoạch: {data.endDate}</Text>
                    </View>
                    <View style={styles.boxText}>
                        {/* <Icon name='info' color={'gray'} size={15} /> */}
                        <Text style={styles.textInfo}>Trạng thái</Text>
                    </View>
                    <View style={styles.boxText}>
                        {/* <Icon name='info' color='gray' size={15} /> */}
                        <Text style={styles.textInfo}>{data.landName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{marginRight: 10}}>
                        <Icon name='trash' color='gray' size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='pencil' color='gray' size={18} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default Tree;