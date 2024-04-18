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
    })
    return st;
}
export default styles