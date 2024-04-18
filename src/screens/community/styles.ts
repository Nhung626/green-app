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
            backgroundColor: theme.color_2
        },
        headerText: {
            color: theme.color_1,
            fontSize: 24,
        },
    })
    return st;
}
export default styles