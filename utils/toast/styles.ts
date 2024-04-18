import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../Dimension";
import useTheme from "../../src/hooks/useTheme";

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {width: SCREEN_WIDTH,  position: "absolute", alignItems: "center", justifyContent: "center", top: 50, zIndex: 10000},
        mainBlock: { maxWidth: SCREEN_WIDTH-50, height: 50, backgroundColor: theme.WHITE, borderRadius: 50, alignItems: "center", justifyContent: 'center', flexDirection: 'row'},
        img: {resizeMode: 'contain', height: 30, marginBottom: 10},
        mgr: {marginRight: 8, fontSize: 14, fontWeight: '500', color: theme.text_1}
    })
    
    return st
}

export default styles