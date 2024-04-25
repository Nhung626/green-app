import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { createLandAction, updateLandAction } from "../../../services/land/actions";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import Loading from "../../../../utils/loading/loading";
import { getItemObjectAsyncStorage } from "../../../../utils/asyncStorage";
import { KEY_STORAGE } from "../../../constants/storage";

const AddLand = () => {
    const theme = useTheme();
    const styles = st();
    const [image, setImage] = useState(null);
    const navigation = useNavigation<any>()
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<any>();

    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }
    const handleSaveLand = async () => {
        setLoading(true)
        const userId = await getUserId();
        const req = new FormData();
        if (image) {
            // @ts-ignore
            req.append('img', { uri: image.uri, name: 'image.jpg', type: 'image/jpeg' });
        }
        req.append('userId', userId);
        req.append('name', name);
        req.append('area', area);
        req.append('address', address);
        try {
            const res = await dispatch(createLandAction(req));
        
            if (res.payload) {
                setLoading(false);
                ToastAndroid.show('Thêm thành công!', ToastAndroid.SHORT);
                navigation.goBack();

            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
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
            <StatusBar backgroundColor={theme.color_2} />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerText}>Tạo mới</Text>
            </View>
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
                            <Text style={styles.text}>m²</Text>

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
            <Loading visiable={loading} />
        </SafeAreaView >
    );
}
export default AddLand;