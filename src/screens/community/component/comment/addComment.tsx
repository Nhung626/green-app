import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar } from 'react-native-paper';
import { Input } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome";

const AddComment = () => {

    const styles = st();
    const theme = useTheme();
    const [content, setContent] = useState('')

    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
    };
    return (
        <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity>
                <Avatar.Image size={30} source={require('../../../../../assets/images/ava.png')} />
            </TouchableOpacity>
            <View style={{
                flexDirection: 'column',
                padding: 10,
                borderWidth: 0.2,
                borderColor: theme.color_1,
                marginLeft: 10,
                width: 310,
            }}>
                <TextInput
                    multiline={true}
                    numberOfLines={1}
                    textAlignVertical="top"
                    cursorColor={'gray'}
                    placeholder='Viết bình luận'
                    value={content}
                    onChangeText={(text) => setContent(text)}
                ></TextInput>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Icon name='send' color={theme.color_1} size={20}></Icon>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default AddComment;