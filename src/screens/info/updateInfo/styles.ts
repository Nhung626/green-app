
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/Dimension";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();
  const st = StyleSheet.create({
    backgroundStyle: {
      flex: 1,

    },
    container: {
      marginTop: 60,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingTop: 10,
      borderColor: theme.color_3,
      borderRadius: 10,
      borderWidth: 0.6,
      marginHorizontal: 20,
      paddingVertical: 20
    },
    imgCover: {
      resizeMode: "cover",
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH / 16 * 9,
      overflow: 'hidden',
    },
    avata: {
      borderWidth: 1,
      borderRadius: 100,
      borderColor: theme.color_1,
      position: 'absolute',
      top: 100,
      left: 10
    },
    imgAvt: {
      resizeMode: "cover",
      height: 160,
      width: 160,
      borderRadius: 100,
      overflow: 'hidden',
    },
    checkbox: {
      alignSelf: 'center',
    },
    header: {
      fontSize: 25,
      fontWeight: "600",
      color: theme.text_3,
      paddingHorizontal: 15,
      paddingVertical: 20,
      textAlign: 'center',
    },
    header1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 25,
      fontWeight: "600",
      color: theme.text_3,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    title: {
      color: theme.text_3,
      fontSize: 10,
      marginLeft: 10,
      marginTop: 5,
    },
    name: {
      color: theme.text_3,
      fontSize: 10,
      marginTop: 5,
    },
    text: {
      color: theme.text_3,
      fontSize: 15,
      fontWeight: '500',
      marginTop: 10,
      marginLeft: 10,
    },
    inputBox: {
      padding: 10,
      backgroundColor: theme.color_2,
      borderRadius: 20,
      color: theme.color_1,
      marginTop: 5,
    },
    inputBoxDate: {
      padding: 12,
      marginRight: 5,
      width: '100%',
      backgroundColor:
        theme.color_2,
      borderRadius: 20,
      flexDirection: 'row',
      marginTop: 5,
      paddingHorizontal: 20,
    },
    inputBoxGender: {
      padding: 10,
      backgroundColor:
        theme.color_1,
      borderRadius: 20,
      alignItems: 'center',
      paddingHorizontal: 20
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      marginTop: 20,
      marginLeft: 65,
      borderRadius: 35,
      backgroundColor: theme.text_3,
      width: '55%',
    },
    headerText: {
      color: theme.color_1,
      fontSize: 24,
      fontWeight: '600',
    },
    dropdownButtonStyle: {
      height: 40,
      backgroundColor: theme.color_2,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 5,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 15,
      fontWeight: '400',
      color: theme.color_1,
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownMenuStyle: {
      backgroundColor: theme.color_2,
      borderRadius: 20,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: theme.color_1,
    },


  })
  return st
}

export default styles