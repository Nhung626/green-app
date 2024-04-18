
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/Dimension";
import useTheme from "../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor,
            minHeight: SCREEN_HEIGHT,
            flex: 1,
        },
        header: {
            flexDirection: 'row',
        },
        cover: {
            resizeMode: "cover",
            width: SCREEN_WIDTH,
            height: 200,
            overflow: 'hidden',
        },
        avata: {
            borderWidth: 1,
            borderRadius: 100,
            borderColor: theme.color_1,
            resizeMode: "cover",
            height: 150,
            width: 150,
            marginTop: 10,
            overflow: 'hidden',
        },
        iconCamera: {
            borderRadius: 100,
            position: 'absolute',
            right: 140,
            bottom: 5,
            padding: 5,
            backgroundColor: theme.color_2
        },
        userName: {
            fontSize: 20,
            fontWeight: '600',
            color: theme.text_3,
            marginLeft: 25,
            textAlign: 'center',
            marginTop: 10,
        },
        bio: {
            fontSize: 15,
            fontWeight: "bold",
            color: theme.text_3,
            marginLeft: 1
        },
        iconBio: {
            tintColor: theme.text_3,
            height: 20,
            width: 20,
            marginLeft: 25,
        },
        body: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: theme.backgroundColor_2,
        },
        scroll: {
            marginTop: 10,
            width: '100%',
        },
        fix: {
            marginTop: 30,
            flexDirection: 'row',
            marginLeft: 20,
            alignItems: 'center',
        },
        icon: {
            tintColor: theme.text_3,
            height: 25,
            width: 20,
            marginRight: 15,
        },

        text: {
            color: theme.text_3,
            fontSize: 18,
            fontWeight: '600',
        }

    })
    return st
}

export default styles