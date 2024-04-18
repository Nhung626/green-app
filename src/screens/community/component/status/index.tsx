import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar, IconButton } from 'react-native-paper';
import Comment from '../comment';
import AddComment from '../comment/addComment';
import Icon from "react-native-vector-icons/FontAwesome";

const Status = () => {

    const styles = st();
    const theme = useTheme();

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '4',
            title: 'Third Item',
        }, {
            id: '5',
            title: 'Third Item',
        },
    ];

    type ItemProps = { title: string };

    const Item = ({ title }: ItemProps) => (
        <Comment></Comment>
    );

    return (
        <View>
            <View style={{ paddingHorizontal: 15, paddingTop: 15, marginVertical: 5, backgroundColor: 'white', borderRadius: 5, }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <Avatar.Image size={30} source={require('../../../../../assets/images/cover.png')} />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.username}>Usename</Text>
                        <Text style={styles.date}>Date</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 5 }}>
                    <Text style={styles.textContent}>Content Status.
                        Lorem ipsum, dolor sit amet consectetur
                        adipisicing elit.
                        Cum eaque, est libero incidunt consequuntur,
                        a illo veniam molestias totam asperiores tempora quod
                        reprehenderit sit maiores neque error dignissimos hic
                        corrupti!
                    </Text>
                    <Image>

                    </Image>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                        <Icon name='heart-o'
                            color={theme.color_2}
                            size={20}></Icon>
                        <Text style={{ color: theme.color_1, fontSize: 12, fontWeight: '600' }}> 25 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', marginRight: 10 }}>
                        <Icon name='comment-o'
                            color={theme.color_2}
                            size={20}></Icon>
                        <Text style={{ color: theme.color_1, fontSize: 12, fontWeight: '600' }}> 5 </Text>
                    </TouchableOpacity>
                </View>

                {/* <AddComment></AddComment> */}
            </View>
            {/* {
                DATA.map((item) => <Item title={item.title} />)
            } */}
        </View>
    )
}
export default Status;