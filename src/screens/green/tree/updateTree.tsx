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
import { MEDIA } from "../../../constants/api";
import { getItemObjectAsyncStorage } from "../../../../utils/asyncStorage";
import { KEY_STORAGE } from "../../../constants/storage";
import Loading from "../../../../utils/loading/loading";

const UpdateTree = () => {
    const theme = useTheme();
    const styles = st();
    const route = useRoute<any>();
    const tree = route.params?.data;
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
    const [state, setState] = useState('');
    const [sum, setSum] = useState('');

    const listState =
        [
            { 'id': 1, 'value': 'STATE_DEAD', 'name': 'Cây bị chết hoặc đã thu hoạch' },
            { 'id': 2, 'value': 'STATE_PLANTED', 'name': 'Tươi tốt' },
            { 'id': 2, 'value': 'STATE_INFESTED', 'name': 'Sâu bệnh' },
        ]

    useEffect(() => {
        const fetchData = async () => {
            const userId = await getUserId();
            setLoading(true)
            setName(tree.name)
            setLandId(tree.landId)
            setSum(tree.sum.toString())
            setStartDate(new Date(tree.startDate))
            setTypeTree(tree.type)
            setImage(`${MEDIA.SELF}?id=${tree?.imgId}`)
            setViewStartDate(true)
            try {
                const res = await dispatch(searchLandAction({ userId: userId }));
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

    const getUserId = async () => {
        return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
    }

    const handleSaveTree = async () => {
        setLoading(true)
        const userId = await getUserId();
        const req = new FormData();

        if (image) {
            // @ts-ignore
            req.append('img', { uri: image, name: 'image.jpg', type: 'image/jpeg' });
        }
        // console.log(startDate.toString())
        req.append('startDate', moment(startDate).format('YYYY-MM-DD'));
        req.append('userId', userId);
        req.append('landId', landId);
        req.append('state', state);
        req.append('name', name);
        req.append('sum', sum);
        req.append('type', typeTree);
        req.append('id', tree.id)
        console.log(req)

        try {
            const res = await dispatch(updateTreeAction(req));
            if (res.payload) {
                setLoading(false);
                ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
                navigation.goBack();
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
            console.log(res, 'update tree');
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
            setImage(result.assets[0].uri);
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
             <StatusBar backgroundColor={theme.color_2} />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="remove" style={{ marginRight: 0, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
                </TouchableOpacity>
                <Text style={styles.headerText}>Cập nhật thông tin </Text>
            </View>
            <ScrollView >
                <View style={{}}>
                    <TouchableOpacity onPress={() => pickImage()} style={{}}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.imgCover} />
                        ) : (
                            <Image style={styles.imgCover}
                                source={require("../../../../assets/images/cover.png")}
                            />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.note}> *Chọn ảnh cho cây bạn</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.header}>CÂP NHẬT THÔNG TIN</Text>
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
                        <View style={{}}>
                            <Text style={styles.text}>Số lượng</Text>
                            <TextInput
                                placeholder=""
                                style={styles.inputBox}
                                placeholderTextColor="grey"
                                onChangeText={(text) => { setSum(text) }}
                                value={sum}
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

                        <Text style={styles.text}>Cập nhật trạng thái cây</Text>
                        <SelectDropdown
                            data={listState}
                            onSelect={(selectedItem, index) => {
                                setState(selectedItem.value)
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
            <Loading visiable={loading}></Loading>
        </SafeAreaView >
    );
}
export default UpdateTree;