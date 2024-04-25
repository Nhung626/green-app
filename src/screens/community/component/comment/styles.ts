import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../../utils/Dimension";
import useTheme from "../../../../hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        modalContainer:{
            
        }, 
        image:{

        },
        username: {
            fontSize: 10,
            fontWeight: '600',
            color: theme.color_1
        },
        comment:{
            fontSize: 11,
            color: theme.color_1
        },
        bott:{

        }
    })
    return st;
}
export default styles