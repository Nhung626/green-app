import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../../utils/Dimension";
import useTheme from "../../../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            // flex: 1,
            borderRadius: 5,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginVertical: 5,
            width: '100%',
        },
        header: {
            marginTop: 40,
            marginHorizontal: 20,
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        headerText: {
            color: theme.color_1,
            fontSize: 20,
            fontWeight: '600',
        },
        username: {
            marginLeft: 5,
            fontSize: 15,
            fontWeight: '600',
            color: theme.color_1
        },
        date: {
            marginLeft: 5,
            fontSize: 10,
            fontWeight: '600',
            color: theme.color_1
        },
        image: {
            height: 180,
            width: 320,
            borderRadius: 8,
            marginRight: 15,
            marginTop: 10,
        },
        content: {
            borderWidth: 0.1,
            padding: 10,
            borderRadius: 5,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',

        },
        textContent: {
            marginBottom: 5,
            paddingRight: 5,
            fontSize: 15,
            color: theme.color_1
        },
        viewButton: {
            marginTop: 10,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'flex-end'
        },
        button: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: theme.color_2,
            borderRadius: 20,
            marginLeft: 10,
        },
    })
    return st;
}
export default styles