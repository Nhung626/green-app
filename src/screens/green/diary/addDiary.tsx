import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from '@rneui/themed';
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import { NAVIGATION_TITLE } from "../../../constants/navigation";

const AddDiary = ({mode, data}) => {
    const theme = useTheme();
    const styles = st();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [image, setImage] = useState(null);
    const navigation = useNavigation()
    const [description, setDescription] = useState('')

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
                    </TouchableOpacity>
                    <Text style= {styles.note}> *Chọn ảnh cho cây bạn</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.header}>Nhật ký hôm nay</Text>
                    <View style={{}}>
                        <View style={{}}>
                            <Text style={styles.text}>Note</Text>
                            <TextInput
                                editable
                                textAlignVertical="top"
                                style={styles.inputBox }
                                multiline={true}
                                numberOfLines={6}
                                maxLength={50}
                                placeholderTextColor="grey"
                                onChangeText={(text)=>  setDescription(text)}
                                value={description}
                            />

                        </View>
                        <TouchableOpacity
                            style={styles.button}
                        // onPress={handleSaveInformation}
                        >
                            <Text style={{ color: 'white' }}>Lưu thông tin</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView >
    );
}
export default AddDiary;