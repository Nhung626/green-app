import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from '@rneui/themed';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { getItemObjectAsyncStorage, setItemAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from "../../../constants/storage";
import { createInfoUserAction, getInfoUserAction, updateInfoUserAction } from "../../../services/user/actions"
import { createGardenAction, getGardenAction, updateGardenAction } from "../../../services/garden/actions"
import { useDispatch } from 'react-redux'

const UpdateInfo = ({ mode, data }) => {
    const styles = st();
    const theme = useTheme();
    const dispatch = useDispatch<any>()
    const isFocused = useIsFocused()
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [viewDateOfBirth, setViewDateOfBirth] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [cover, setCover] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [isGenderP, setIsGenderP] = useState(false)
    const [isDateOfBirthP, setIsDateOfBirthP] = useState(false)
    const [isPhoneP, setIsPhoneP] = useState(false)
    const [isAddressP, setIsAddressP] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation<any>()

    let userId
    const getUserId = async () => {
        userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }
    if (mode === 'update') {
        useEffect(() => {
            getUserInfo()
        }, [isFocused])
    }
    const getUserInfo = async () => {
        getUserId()
        setLoading(true);
        try {
            const userInfoResponse = await dispatch(getInfoUserAction(userId));
            const gardenInfoResponse = await dispatch(getGardenAction(userId));
            setLoading(false);
            const userInfo = userInfoResponse.payload;
            const gardenInfo = gardenInfoResponse.payload;

            setAvatar(userInfo.avatarId);
            setGender(userInfo.gender);
            setIsGenderP(userInfo.isGenderP);
            setAddress(userInfo.address);
            setDateOfBirth(userInfo.dateOfBirth);
            setIsDateOfBirthP(userInfo.isAddressP);
            setPhone(userInfo.phone);
            setIsPhoneP(userInfo.isPhoneP);

            setCover(gardenInfo.coverId);
            setName(gardenInfo.name);
            setDescription(gardenInfo.description);
        } catch (userInfoError) {
            console.error('Error fetching user info:', userInfoError);
            setLoading(false);
        }
    };


    const getInfoData = async () => {
        getUserId();
        const userInfo = new FormData()
        const gardenInfo = new FormData()
        if (avatar) {
            // Tải hình ảnh và chuyển đổi thành Blob
            const response = await fetch(avatar.uri);
            const blob = await response.blob();
            // Thêm Blob vào FormData
            userInfo.append('avatar', blob, 'avatar');
        }
        if (cover) {
            // Tải hình ảnh và chuyển đổi thành Blob
            const response = await fetch(cover.uri);
            const blob = await response.blob();
            // Thêm Blob vào FormData
            gardenInfo.append('cover', blob, 'cover');
        }

        userInfo.append('userId', userId);
        userInfo.append('dateOfBirth', dateOfBirth.toISOString());
        userInfo.append('isDateOfBirthP', '${isDateOfBirthP}');
        userInfo.append('address', address);
        userInfo.append('isAddressP', '${isAddressP}');
        userInfo.append('phone', phone);
        userInfo.append('isPhoneP', '${isPhoneP}');
        gardenInfo.append('name', name);
        gardenInfo.append('description', description);

        return { userInfo, gardenInfo }
    }

    const handleSaveInformation = async () => {
        const { userInfo, gardenInfo } = await getInfoData();
        console.log('formdata', userInfo)
        setLoading(true)
        try {
            let res
            if (mode === 'create') {
                // Xử lý logic để tạo mới
                res = await Promise.all([
                    dispatch(createInfoUserAction(userInfo)),
                    dispatch(createGardenAction(gardenInfo))
                ]);
                console.log('Creating:', res.payload);
            } else if (mode === 'update') {
                // Xử lý logic để cập nhật
                res = await Promise.all([
                    dispatch(updateInfoUserAction(userInfo)),
                    dispatch(updateGardenAction(gardenInfo))
                ]);
                console.log('Updating:', res.payload);
            }

            if (res.every(result => result?.payload)) {
                setLoading(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                if (mode === 'create') {
                    navigation.navigate(NAVIGATION_TITLE.GREEN);
                } else if (mode === 'update') {
                    navigation.goBack();
                }
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

    const pickAvata = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0]);
            return
        }
    };
    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setCover(result.assets[0]);
            return
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView >
                <View style={{}}>
                    <TouchableOpacity onPress={() => pickCover()} style={{}}>
                        {cover ? (
                            <Image source={{ uri: cover.uri }} style={styles.imgCover} />
                        ) : (
                            <Image style={styles.imgCover}
                                source={require("../../../../assets/images/cover.png")}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pickAvata()} style={styles.avata}>
                        {avatar ? (
                            <Image source={{ uri: avatar.uri }} style={styles.imgAvt} />
                        ) : (
                            <Image style={styles.imgAvt}
                                source={require("../../../../assets/images/ava.png")}
                            />
                        )}
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>
                    <Text style={styles.header}>Cập nhật thông tin</Text>
                    <View style={{}}>
                        <Text style={styles.text}>Tên của bạn</Text>
                        <TextInput
                            placeholder="Tên của bạn"
                            style={styles.inputBox}
                            placeholderTextColor="grey"
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                        <View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
                            {/* <Text style={styles.title}>Hiển thị tên sẽ là: Vườn của </Text> */}
                            <Text style={styles.name}>
                                {name ? (
                                    <>
                                        <Text style={styles.name}>{name}</Text>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.name}>...</Text>
                                    </>
                                )}
                            </Text>
                        </View>
                        <View style={{}}>
                            <Text style={styles.text}> Giới thiệu</Text>
                            <TextInput
                                placeholder="Giới thiệu"
                                style={styles.inputBox}
                                placeholderTextColor="grey"
                                onChangeText={(text) => setDescription(text)}
                                value={description}
                            />
                        </View>

                        <Text style={styles.text}>Ngày sinh</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.inputBoxDate}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Icon name="calendar" size={22} color={theme.color_1} />
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={dateOfBirth}
                                        mode="date"
                                        display="default"
                                        style={{ backgroundColor: theme.color_2 }}
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                setDateOfBirth(selectedDate);
                                                setViewDateOfBirth(true)
                                            }
                                            setShowDatePicker(false);
                                        }}
                                    />
                                )}
                                <Text style={{ paddingLeft: 10 }}>
                                    {viewDateOfBirth ? (
                                        <>
                                            <Text style={{ color: theme.color_1 }}> {moment(dateOfBirth).format('DD/MM/YYYY')}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={{ color: 'grey' }}>DD/MM/YYYY</Text>
                                        </>
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <CheckBox
                            checked={isDateOfBirthP}
                            checkedColor={theme.color_4}
                            containerStyle={{ padding: 2 }}
                            onIconPress={() => setIsDateOfBirthP(!isDateOfBirthP)}
                            size={15}
                            textStyle={{
                                color: theme.color_4
                            }}
                            title="Riêng tư"
                            uncheckedColor={theme.color_1}
                        />
                        <View style={{}}>
                            <Text style={styles.text}>Giới tính</Text>
                            <TextInput
                                placeholder="Giới tính"
                                style={styles.inputBox}
                                placeholderTextColor="grey"
                                onChangeText={(text) => setGender(text)}
                                value={gender}
                            />
                            <CheckBox
                                checked={isGenderP}
                                checkedColor={theme.color_4}
                                containerStyle={{ padding: 1 }}
                                onIconPress={() => setIsGenderP(!isGenderP)}
                                size={18}
                                title="Riêng tư"
                                titleProps={{}}
                                uncheckedColor={theme.color_1}
                                textStyle={{
                                    color: theme.color_4
                                }}
                            />
                        </View>

                        <View style={{}}>
                            <Text style={styles.text}>Số điện thoại</Text>
                            <TextInput
                                placeholder="Số điện thoại"
                                style={styles.inputBox}
                                placeholderTextColor="grey"
                                onChangeText={(text) => setPhone(text)}
                                value={phone}
                            />
                            <CheckBox
                                checked={isPhoneP}
                                checkedColor={theme.color_4}
                                containerStyle={{ padding: 2 }}

                                onIconPress={() => setIsPhoneP(!isPhoneP)}
                                size={18}
                                textStyle={{
                                    color: theme.color_4
                                }}
                                title="Riêng tư"
                                titleProps={{}}
                                uncheckedColor={theme.color_1}
                            />

                        </View>

                        <View style={{}}>
                            <Text style={styles.text}>Địa chỉ</Text>
                            <TextInput
                                placeholder="Địa chỉ"
                                style={styles.inputBox}
                                placeholderTextColor="grey"
                                onChangeText={(text) => setAddress(text)}
                                value={address}
                            />
                            <CheckBox
                                checked={isAddressP}
                                checkedColor={theme.color_4}
                                containerStyle={{ padding: 2 }}
                                onIconPress={() => setIsAddressP(!isAddressP)}
                                size={15}
                                textStyle={{
                                    color: theme.color_4
                                }}
                                title="Riêng tư"
                                uncheckedColor={theme.color_1}
                            />

                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveInformation}
                        >
                            <Text style={{ color: 'white' }}>Lưu thông tin</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
            {/* </ImageBackground> */}
        </SafeAreaView >
    )
}

export default UpdateInfo;