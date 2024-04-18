import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

const AddStatus = () => {

    const styles = st();
    const theme = useTheme();

    const [image, setImage] = useState(null)
    const [content, setContent] = useState('')
    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            return
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Avatar.Image size={30} source={require('../../../../../assets/images/cover.png')} />
                <Text style={styles.username}>Usename</Text>
            </View>
            <View style={{ marginTop: 10, marginHorizontal: 5, }}>
                <View style={styles.content}>
                    <TextInput
                        multiline={true}
                        numberOfLines={1}
                        textAlignVertical="top"
                        cursorColor={'gray'}
                        placeholder='Chia sẻ vô đây nhé.'
                        value={content}
                        onChangeText={(text) => setContent(text)}
                    ></TextInput>
                    {image &&
                        <Image source={{ uri: image.uri }} style={styles.image} />
                    }
                    <TouchableOpacity onPress={pickCover} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 }} >
                        <Icon name='camera' color={theme.color_1} size={20}></Icon>
                    </TouchableOpacity>
                </View>
                {(image || content) &&
                    <View style={styles.viewButton}>
                        <TouchableOpacity onPress={pickCover} style={styles.button}>
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickCover} style={styles.button}>
                            <Text>Đăng</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View >
    )
}
export default AddStatus;