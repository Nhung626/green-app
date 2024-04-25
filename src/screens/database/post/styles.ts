import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/Dimension";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            marginHorizontal: 25,
            paddingBottom: 150,
        },
        header2: {
            backgroundColor: '#fff',
            marginVertical: 2,
            paddingHorizontal: 20,
            paddingVertical: 20,
        },
        header: {
            borderBottomColor: theme.color_1,
            borderBottomWidth: 0.6,
            marginVertical: 20,
            paddingHorizontal: 15,
        },
        title: {
            color: theme.color_1,
            fontSize: 25,
            // marginLeft: 10,
            marginTop: 0,
            fontWeight: '600',
        },
        tag: {
            borderRadius: 20,
            paddingVertical: 2,
            paddingHorizontal: 10,
            backgroundColor: theme.color_2,
            margin: 3,
        },
        subtitle: {
            color: theme.color_1,
            textAlign: 'center',
        },
        general: {
            // marginLeft: 12,
            marginTop: 10,
        },
        textGeneral: {
            margin: 1,
            color: '#0f0f0f',
        },
        content: {
            marginVertical: 15,
        },
        titleContent: {
            color: theme.color_1,
            fontSize: 20,
            fontWeight: '600',
        },
        textContent: {
            fontSize: 18,
            marginRight: 10,
        },
        boxImage: {
            height: 200,
            width: SCREEN_WIDTH,
            marginVertical: 10,
        },

        boxRect: {
            marginVertical: 20,
            borderTopWidth: 0.5,
            paddingTop: 20,
            borderColor: theme.color_1,
            textAlign: 'right',
            justifyContent: 'space-around',
            flexDirection: 'row',
        },

    })
    return st;
}
export default styles