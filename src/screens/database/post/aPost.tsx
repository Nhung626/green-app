import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import st from './styles'
import useTheme from '../../../hooks/useTheme'
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../../utils/Dimension';
import { Button } from "@rneui/base";
import { NAVIGATION_TITLE } from "../../../constants/navigation";
import { useNavigation, useIsFocused } from "@react-navigation/native";


const APost = () => {
    const styles = st();
    const theme = useTheme();
    const navigation = useNavigation<any>();

    return (
        <View>
            <View style={styles.header2}>
                <TouchableOpacity  onPress={() => navigation.navigate(NAVIGATION_TITLE.POST)}>
                    <Text style={styles.title}>Title</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>subtitle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.subtitle}>type</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 15, right: 20 }}>
                    <Icon color={theme.color_1} size={30} name="bookmark-o"></Icon>
                </TouchableOpacity>
                <View style={styles.general}>
                    <Text style={[styles.textGeneral, { fontStyle: 'italic', fontSize: 10 }]}>Ngày: 2024.04.04</Text>
                    <Text style={styles.textGeneral}>Tac gia</Text>
                    <Text style={styles.textGeneral}>Gioi thieu</Text>
                </View>
            </View>
        </View >
    )
}

export default APost