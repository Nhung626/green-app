import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    ImageBackground,
    StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { createDiaryAction, updateDiaryAction } from "../../../services/diary/actions";
import { useDispatch } from "react-redux";
import { getItemObjectAsyncStorage } from "../../../../utils/asyncStorage";
import { KEY_STORAGE } from "../../../constants/storage";
import Loading from "../../../../utils/loading/loading";

const AddDiary = () => {
    const theme = useTheme();
    const styles = st();
    const route = useRoute<any>();
    const treeId = route.params?.treeId;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [images, setImages] = useState([]);
    const navigation = useNavigation<any>()
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<any>();

    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }
    const handleSaveDiary = async () => {
        setLoading(true)
        const userId = await getUserId();
        const req = new FormData();
        images.forEach((img, index) => {
            //@ts-ignore
            req.append(`images`, {
                uri: img,
                type: 'image/png',
                name: `image-${index}.png`,
            });
        });
        req.append('userId', userId);
        req.append('treeId', treeId);
        req.append('description', description);
        try {
            const res = await dispatch(createDiaryAction(req));

            if (res.payload) {
                setLoading(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
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

    const handlePickImg = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== 'granted') {
            console.log('Permission to access camera denied');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [16, 9],
            quality: 1
        });
        if (result.canceled) {
            console.log('User canceled!');
        } else {
            const selectedImage = result.assets.map((asset) => asset.uri);
            if (images.length + selectedImage.length <= 5) {
                setImages([...images, ...selectedImage]);
            } else {
                ToastAndroid.show('Số lượng ảnh vượt quá giới hạn (5 ảnh).', ToastAndroid.SHORT);
            }
        }
    };
    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== 'granted') {
            console.log('Permission to access camera denied');
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1
        });
        if (result.canceled) {
            console.log('User canceled!');
        } else {
            const selectedImage = result.assets.map((asset) => asset.uri);
            if (images.length + selectedImage.length <= 5) {
                setImages([...images, ...selectedImage]);
            } else {
                ToastAndroid.show('Số lượng ảnh vượt quá giới hạn (5 ảnh).', ToastAndroid.SHORT);
            }
        }
    };
    const handleRemoveImg = (indexToRemove) => {
        const updateImg = [...images];
        updateImg.splice(indexToRemove, 1);
        setImages(updateImg);
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

            </View>
            <ScrollView >
                <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: "center", flex: 1, marginHorizontal: 24 }}>
                    {images[0]
                        ? (
                            <View style={{ alignItems: "center" }}>
                                <ScrollView
                                    horizontal
                                    // pagingEnabled
                                    contentContainerStyle={{ alignItems: 'center' }}>
                                    {images.map((images, index) => (
                                        <View key={index} style={styles.imgReviewContainer}>
                                            <ImageBackground source={{ uri: images }} style={styles.imgReview}>
                                                <TouchableOpacity 
                                                onPress={() => handleRemoveImg(index)} 
                                                style={{ position: 'absolute', top: 5, right: 5, backgroundColor:'#fff', borderRadius:100, paddingHorizontal:2 }}
                                                >
                                                    <Icon name="close" size={15} color={theme.color_1}/>
                                                </TouchableOpacity>
                                            </ImageBackground>

                                        </View>
                                    ))}
                                </ScrollView>
                                <View style={{ flexDirection: 'row', margin: 20 }}>
                                    <TouchableOpacity
                                        onPress={handlePickImg}
                                        style={styles.imageContainer1}>
                                        <Icon name="image" />
                                        <Text >Thêm hình ảnh</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleTakePhoto}
                                        style={styles.imageContainer1}>
                                        <Icon name="camera" />
                                        <Text >Chụp ảnh</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )
                        : (
                            <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={handlePickImg}
                                    style={styles.imageContainer2}>
                                    <Icon name="image" />
                                    <Text>Thêm hình ảnh</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleTakePhoto}
                                    style={styles.imageContainer2}>
                                    <Icon name="camera" />
                                    <Text>Chụp ảnh</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                </View>
                <View style={styles.body}>
                    <Text style={styles.header}>Nhật ký hôm nay</Text>
                    <View style={{}}>
                        <View style={{}}>
                            <Text style={styles.text}>Note</Text>
                            <TextInput
                                editable
                                textAlignVertical="top"
                                style={styles.inputBox}
                                multiline={true}
                                numberOfLines={6}
                                placeholderTextColor="grey"
                                onChangeText={(text) => setDescription(text)}
                                value={description}
                            />

                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveDiary}
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
export default AddDiary;