import { View, Text, TouchableOpacity, Image, ScrollView, ToastAndroid } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../utils/Dimension';
import { Button } from "@rneui/base";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { savePostAction, unsavePostAction } from "../../../services/post/actions";


const APost = ({ data }) => {
    const styles = st();
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const post = data;
    const [isSave, setIsSave] = useState(post.userSaved)
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(false)
    const handleSave = async () => {
        try {
            const res = await dispatch(savePostAction({ postId: post.id }))
            if (res.payload) {
                ToastAndroid.show('save', ToastAndroid.SHORT);
                setIsSave(true)
                setLoading(false);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        }
    }
    const handleUnSave = async () => {
        try {
            const res = await dispatch(unsavePostAction({ postId: post.id }))
            if (res.payload) {
                setIsSave(false);
                setLoading(false);
                ToastAndroid.show('unsave', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
                setLoading(false);
            }
        } catch (err) {
            ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
            setLoading(false);
        }
    }
    return (
        <View>
            <View style={styles.header2}>
                <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION_TITLE.POST, { data: post })}>
                    <Text style={styles.title}>{post.title}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>{post.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>{post.typeTree}</Text>
                    </TouchableOpacity>
                </View>
                {isSave ? (
                    <TouchableOpacity style={{ position: 'absolute', top: 25, right: 10 }}
                        onPress={handleUnSave}>
                        <Icon color={theme.color_1} size={35} name="bookmark"></Icon>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{ position: 'absolute', top: 25, right: 10 }}
                        onPress={handleSave}>
                        <Icon color={theme.color_1} size={35} name="bookmark-o"></Icon>
                    </TouchableOpacity>
                )}
                <View style={styles.general}>
                    <Text style={[styles.textGeneral, { fontStyle: 'italic', fontSize: 10 }]}>Ngày: {post.createdAt}</Text>
                    <Text style={styles.textGeneral}>Tác giả: {post.auth}</Text>
                    <Text style={styles.textGeneral}>Giới thiệu: {post.general}</Text>
                </View>
            </View>
        </View >
    )
}

export default APost