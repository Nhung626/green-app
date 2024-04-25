import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils/Dimension";
import useTheme from "../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        header: {
            flexDirection: 'row',
            fontSize: 25,
            fontWeight: "600",
            color: theme.text_3,
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: theme.color_2,
            justifyContent: 'space-between',
        },
        headerText: {
            color: theme.color_1,
            fontSize: 24,
        },
        container: {
            borderRadius: 5,
            backgroundColor: 'white',
            padding: 10,
            width: '100%',
        },
        username: {
            marginLeft: 5,
            fontSize: 15,
            fontWeight: '600',
            color: theme.color_1
        },
        content: {
            borderWidth: 0.1,
            padding: 10,
            borderRadius: 5,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignContent: 'flex-end'
        },
    })
    return st;
}
export default styles