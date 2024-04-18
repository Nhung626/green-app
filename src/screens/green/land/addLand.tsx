import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useDispatch } from "react-redux";
import { createLandAction, updateLandAction } from "../../../services/land/actions";
import { NAVIGATION_TITLE } from "../../../constants/navigation";

const AddLand = ({ mode, data }) => {
    const theme = useTheme();
    const styles = st();
    const [image, setImage] = useState(null);
    const navigation = useNavigation<any>()
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<any>();

    const handleSaveLand = async () => {
        setLoading(true)
        const req = new FormData();
        if (image) {
            // Tải hình ảnh và chuyển đổi thành Blob
            const response = await fetch(image.uri);
            const blob = await response.blob();
            // Thêm Blob vào FormData
            req.append('img', blob, 'img');
        }
        req.append('userId', data);
        req.append('name', name);
        req.append('area', area);
        req.append('address', address);
        try {
            let res
            if (mode === 'create') {
                // Xử lý logic để tạo mới
                res = dispatch(createLandAction(req));
            } else if (mode === 'update') {
                // Xử lý logic để cập nhật
                res = await dispatch(updateLandAction(req));
            }

            if (res.payload) {
                setLoading(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                navigation.goBack();
                // if (mode === 'create') {
                //     navigation.navigate(NAVIGATION_TITLE.GREEN);
                // } else if (mode === 'update') {
                //     navigation.goBack();
                // }
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
            console.log(res, 'update user');
        } catch (err) {
            console.log('Error:', err);
            setLoading(false);
            ToastAndroid.show('Đã xảy ra lỗi!', ToastAndroid.SHORT);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            return
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView >
                <View style={{}}>
                    <TouchableOpacity onPress={() => pickImage()} style={{}}>
                        {image ? (
                            <Image source={{ uri: image.uri }} style={styles.imgCover} />
                        ) : (
                            <Image style={styles.imgCover}
                                source={require("../../../../assets/images/cover.png")}
                            />
                        )}
                        <Text style={styles.note}>*Chọn ảnh cho mảnh vườn mới của bạn</Text>

                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <Text style={styles.header}>Khám phá thêm mảnh đất mới</Text>
                    <View style={{}}>
                        <Text style={styles.text}>Tên miền đất mới</Text>
                        <TextInput
                            placeholder="Ví dụ: Miền đất hứa"
                            style={styles.inputBox}
                            cursorColor='gray'
                            placeholderTextColor={theme.color_1}
                            onChangeText={(text) => { setName(text) }}
                            value={name}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10, alignContent: 'flex-start' }}>
                            <Text style={styles.text}>Diện tích:</Text>
                            <TextInput
                                placeholder="_______"
                                style={styles.inputBox1}
                                placeholderTextColor={theme.color_1}
                                cursorColor='gray'
                                onChangeText={(text) => setArea(text)}
                                value={area}
                            />
                            <Text style={styles.text}>m2</Text>


                            {/* <Text style={styles.text}>Chiều rộng:</Text>
                            <TextInput
                                placeholder="_______"
                                style={styles.inputBox1}
                                placeholderTextColor={theme.color_1}
                                cursorColor='gray'
                                onChangeText={handleChangeInfo('description')}
                                value={info.width}
                            />
                            <Text style={styles.text}>m</Text> */}

                        </View>

                        <View style={{}}>
                            <Text style={styles.text}>Địa chỉ</Text>
                            <TextInput
                                placeholder=""
                                style={styles.inputBox}
                                placeholderTextColor={theme.color_1}
                                multiline={true}
                                numberOfLines={3}
                                cursorColor='gray'
                                onChangeText={(text) => setAddress(text)}
                                value={address}
                            />

                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveLand}
                        >
                            <Text style={{ color: 'white' }}>Lưu thông tin</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView >
    );
}
export default AddLand;