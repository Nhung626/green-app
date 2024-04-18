
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/Dimension";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();
  const st = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    boxStyle: {
      margin: 10,
      flexDirection: "row"
    },
    boxText: {
      flexDirection: 'row',
      columnGap: 10,
      alignItems: 'center',
    },
    textInfo: {
      color: theme.text_3,
      flexWrap: 'wrap',
      textAlign: 'left'
    },


    //add tree
    backgroundStyle: {
      flex: 1,

    },
    body: {
      marginTop: 50,
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
      flexDirection: 'row',
      fontWeight: "600",
      color: theme.text_3,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    name: {
      color: theme.text_3,
      fontSize: 10,
      marginLeft: 10,
      marginTop: 5,
    },
    text: {
      color: theme.text_3,
      fontSize: 15,
      marginTop: 10,
      marginHorizontal: 5,
    },
    note: {
      color: theme.text_3,
      fontSize: 13,
      marginTop: 5,
      marginRight: 18,
      textAlign: 'right'
    },
    inputBox: {
      padding: 6,
      paddingLeft: 15,
      backgroundColor: theme.color_2,
      borderRadius: 20,
      color: theme.color_1,
      marginTop: 5,
    },
    inputBoxDate: {
      padding: 10,
      marginRight: 5,
      width: '100%',
      backgroundColor:
        theme.color_2,
      borderRadius: 20,
      flexDirection: 'row',
      direction: 'rtl',
      marginTop: 5,
      paddingHorizontal: 15,
    },
    button: {
      alignItems: 'center',
      width: '50%',
      padding: 15,
      marginTop: 30,
      marginHorizontal: '25%',
      borderRadius: 50,
      backgroundColor: theme.color_1
    },
    textSignUp: {
      color: theme.color_1,
      // paddingLeft: 8,
    },
    add: {
      position: 'absolute',
      right: 20,
      bottom: 45,
      padding: 10,
      borderRadius: 50,
      backgroundColor: theme.color_2,
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

    //a-tree
    headerText: {
      fontWeight: '600',
      color: theme.color_1,
      fontSize: 24,
    },
    img: {
      height: 300,
      resizeMode: 'cover', // Chọn loại scale cho hình ảnh
    },
    contentContainer: {
      alignItems: 'center',
    },
    box: {
      width: 200,
      height: 200,
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxInfo: {
      flexDirection: 'row',
      flex: 1,
      columnGap: 10,
    },
    textBox: {
      // color: theme.color_1,
      flexWrap: 'wrap',
      textAlign: 'left',
    },
    info: {
      flex: 1,
      flexDirection: 'row',
      columnGap: 10,
      alignItems: 'center',
    },
    success: {
      padding: 8,
      backgroundColor: theme.bgColor,
      borderRadius: 10,
    },
    buttonUnsuccess: {
      padding: 10,
      backgroundColor: "#FFA500",
      borderRadius: 10,
    },
    buttonState: {
      paddingHorizontal: 10,
      paddingBottom: 10,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    buttonCancel: {
      paddingVertical: 10,
      backgroundColor: "#FFA500",
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10
    }
  })
  return st
}

export default styles