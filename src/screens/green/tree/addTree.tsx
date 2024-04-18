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
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch } from "react-redux";
import { searchLandAction } from "../../../services/land/actions";
import { createTreeAction, updateTreeAction } from "../../../services/tree/actions";

const AddTree = () => {
    const theme = useTheme();
    const styles = st();
    const route = useRoute<any>();
    const mode = route.params?.mode;
    console.log('data: ', route.params);
    const userId = route.params?.userId;
    const [startDate, setStartDate] = useState(new Date());
    const [viewStartDate, setViewStartDate] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [image, setImage] = useState(null);
    const navigation = useNavigation<any>()
    const [name, setName] = useState('');
    const [typeTree, setTypeTree] = useState('');
    const [landId, setLandId] = useState('');
    const [loading, setLoading] = useState(false)
    const [listLand, setListLand] = useState()
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await dispatch(searchLandAction({ 'userId': { userId } }));
                if (res.payload) {
                    setListLand(res.payload.body);
                } else {
                    ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching garden info:', error);
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);

            };
        }
        fetchData();
    }, []);

    const handleSaveTree = async () => {
        setLoading(true)
        const req = new FormData();
        
        if (image) {
            // @ts-ignore
            req.append('img', {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'});
        }
        // console.log(startDate.toString())
        req.append('startDate', moment(startDate).format('YYYY-MM-DD'));
        req.append('userId', userId);
        req.append('landId', landId);
        req.append('name', name);
        req.append('type', typeTree);
        console.log(req)

        try {
            let res
            if (mode === 'create') {
                // Xử lý logic để tạo mới
                console.log('create')
                res = await dispatch(createTreeAction(req));

            } else if (mode === 'update') {
                // Xử lý logic để cập nhật
                console.log('update')
                res = await dispatch(updateTreeAction(req));
            }

            if (res.payload) {
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
                    {(selectedItem && selectedItem.name) || 'Lựa chọn'}
                </Text>
            </View>
        );
    }

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
                    </TouchableOpacity>
                    <Text style={styles.note}> *Chọn ảnh cho cây bạn</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.header}>Thêm cây cho vườn thêm xanh</Text>
                    <View style={{}}>
                        <Text style={styles.text}>Nickname</Text>
                        <TextInput
                            placeholder="VD: 01"
                            style={styles.inputBox}
                            placeholderTextColor="grey"
                            onChangeText={(text) => { setName(text) }}
                            value={name}
                        />
                        <View style={{}}>
                            <Text style={styles.text}>Loại cây</Text>
                            <TextInput
                                placeholder=""
                                style={styles.inputBox}
                                placeholderTextColor="grey"
                                onChangeText={(text) => { setTypeTree(text) }}
                                value={typeTree}
                            />
                        </View>

                        <Text style={styles.text}>Ngày bắt đầu</Text>
                        <TouchableOpacity
                            style={styles.inputBoxDate}
                            onPress={() => setShowDatePicker(true)}
                        >
                            {showDatePicker && (
                                <DateTimePicker
                                    value={startDate}
                                    mode="date"
                                    display="default"
                                    style={{ backgroundColor: theme.color_2 }}
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            setStartDate(selectedDate);
                                            setViewStartDate(true)
                                        }
                                        setShowDatePicker(false);
                                    }}
                                />
                            )}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{}}>
                                    {viewStartDate ? (
                                        <>
                                            <Text style={{ color: theme.color_1 }}> {moment(startDate).format('DD/MM/YYYY')}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={{ color: 'grey' }}>DD/MM/YYYY</Text>
                                        </>
                                    )}
                                </Text>
                                <Icon name="calendar" size={20} color={theme.color_1} style={{ marginLeft: 185 }} />
                            </View>
                        </TouchableOpacity>

                        <View style={{}}>
                            <Text style={styles.text}>Mô tả</Text>
                            <TextInput
                                editable
                                textAlignVertical="top"
                                style={styles.inputBox}
                                multiline={true}
                                numberOfLines={6}
                                maxLength={50}
                                cursorColor={'gray'}
                                placeholderTextColor="grey"
                            // onChangeText={}
                            // value={info.description}
                            />

                        </View>

                        <Text style={styles.text}>Ở mảnh đất nào?</Text>
                        <SelectDropdown
                            data={listLand}
                            onSelect={(selectedItem, index) => {
                                setLandId(selectedItem.id)
                            }}
                            renderButton={renderButton}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveTree}
                        >
                            <Text style={{ color: 'white' }}>Lưu thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
}
export default AddTree;