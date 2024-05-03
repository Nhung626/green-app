import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/Dimension";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            marginHorizontal: 25,
            paddingBottom: 300,
        },
        header: {
            borderBottomColor: theme.color_1,
            borderWidth: 0.6,
            marginHorizontal: 20,
        },
        header_save: {
            flexDirection: 'row',
            justifyContent:'space-between',
            padding: 15,
        },
        title: {
            color: theme.color_1,
            fontSize: 25,
            marginLeft: 15,
            marginBottom: 10,
            marginTop: 10,
            fontWeight: '600',
        },

        headerText: {
            color: theme.color_1,
            fontSize: 24,
        },

    })
    return st;
}
export default styles