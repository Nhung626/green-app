import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
    StatusBar
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
import { clearAllAsyncStorage, getItemObjectAsyncStorage, setItemAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from "../../../constants/storage";
import { createInfoUserAction, getInfoUserAction } from "../../../services/user/actions"
import { createGardenAction, getGardenAction } from "../../../services/garden/actions"
import { useDispatch } from 'react-redux'
import SelectDropdown from "react-native-select-dropdown";

const AddInfo = () => {
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
    const listGender=[
        {id:1, name: 'Nam'},
        {id:2, name: 'Nữ'},
        {id:3, name: 'Khác'},
    ]

    let userId
    const getUserId = async () => {
        userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    const getInfoData = async () => {
        await getUserId();
        const userInfo = new FormData()
        const gardenInfo = new FormData()
        if (avatar) {
            //@ts-ignore
            userInfo.append(`avatar`, {
                uri: avatar.uri,
                type: 'image/png',
                name: `avatar.png`,
            });
        }
        if (cover) {
            //@ts-ignore
            gardenInfo.append(`cover`, {
                uri: cover.uri,
                type: 'image/png',
                name: `avatar.png`,
            });
        }

        userInfo.append('userId', userId);
        userInfo.append('dateOfBirth', moment(dateOfBirth).format('YYYY-MM-DD'));
        userInfo.append('gender', gender)
        userInfo.append('isGenderP', `false`)
        userInfo.append('isDateOfBirthP', `true`);
        userInfo.append('address', address);
        userInfo.append('isAddressP', `true`);
        userInfo.append('phone', phone);
        userInfo.append('isPhoneP', `true`);
        gardenInfo.append('name', name);
        gardenInfo.append('description', description);

        return { userInfo, gardenInfo }
    }

    const handleSaveInformation = async () => {
        const { userInfo, gardenInfo } = await getInfoData();
        console.log('formdata', userInfo)
        setLoading(true)
        try {
            const res = await Promise.all([
                await dispatch(createInfoUserAction(userInfo)),
                await dispatch(createGardenAction(gardenInfo))
            ]);

            if (res.every(result => result?.payload)) {
                setLoading(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                await clearAllAsyncStorage();
                navigation.navigate(NAVIGATION_TITLE.LOGIN);

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

    const pickAvata = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
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

    const renderItem = (item, index, isSelected) => {
        return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
            </View>
        );
    }

    const renderButton = (selectedItem, isOpened) => {
        return (
            <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.name) || `Lựa chọn`}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.color_2} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Cập nhật thông tin cá nhân</Text>
            </View>
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
                                source={require("../../../../assets/images/avatar.png")}
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
                            <SelectDropdown
                                data={listGender}
                                onSelect={(selectedItem, index) => {
                                    setGender(selectedItem.name)
                                }}
                                renderButton={renderButton}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
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

export default AddInfo;