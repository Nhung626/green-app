
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/Dimension";
import useTheme from "../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor,
            minHeight: SCREEN_HEIGHT,
        },
        typeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        image: {
            height: 40,
            width: 40,
            borderRadius: 8,
            backgroundColor: theme.backgroundType,
            marginRight: 15,
        },
        title: {
            color: theme.text_black,
            fontSize: 20,
            marginTop: 50,
            marginHorizontal: 10,
            marginBottom: 10,
            fontWeight: '600',
        },
        addImageContainer: {
            height: 50,
            width: 50,
            borderRadius: 100,
            backgroundColor: theme.tabActive,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
        },
        addImage: {
            height: 25,
            width: 25,
            resizeMode: 'contain',
            tintColor: theme.text_white,
        },
        tabBar: {
            color: theme.text_3,
            fontSize: 18,
            fontWeight: '600',
        },
        title_header: {
            fontSize: 15,
            fontWeight: '500',
            color: '#fff',
        },

    })
    return st
}

export default styles