
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/Dimension";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();
  const st = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    title_header: {
      fontSize: 20,
      fontWeight: '500',
      color: theme.color_1,
    },
    list: {
      height: '95%',
    },
    boxStyle: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      flexDirection: "row",
      borderColor: theme.color_1,
      borderWidth: 0.8,
      marginBottom: 12,
      marginHorizontal: 12,
      borderRadius: 10
    },
    boxText: {
      marginBottom: 4,
      width: 220,
    },
    textInfo: {
      color: theme.text_3,
      // flexWrap: 'wrap',
      textAlign: 'left'
    },


    //add land
    backgroundStyle: {
      flex: 1,

    },
    body: {
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 25,
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
    inputBox1: {
      marginTop: 7,
      paddingLeft: 3,
      // backgroundColor: theme.color_2,
      borderRadius: 20,
      color: theme.color_1,
      textAlign: 'center',
      width: 50,
    },
    button: {
      alignItems: 'center',
      width: '50%',
      marginHorizontal: '25%',
      padding: 15,
      marginTop: 20,
      borderRadius: 50,
      backgroundColor: theme.color_1
    },
    add: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      padding: 10,
      borderRadius: 50,
      backgroundColor: theme.color_2,
    },
    plus: {
      position: 'absolute',
      right: 20,
      bottom: 0,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 100,
      backgroundColor: theme.color_2,
    },

    // a land
    headerText: {
      color: theme.color_1,
      fontSize: 24,
      fontWeight: '600',
    },
    title: {
      fontWeight: '600',
      fontSize: 24,
      paddingVertical: 10,
      marginHorizontal: 16,
      borderTopColor: 'grey',
      color: theme.color_1,
      borderTopWidth: 0.5,
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
      flexWrap: 'wrap',
      textAlign: 'left',
      flex: 1
    },

    textRoomNight: {
      color: 'grey',
      fontSize: 12,
      textAlign: 'right',
      paddingBottom: 10,
    },


    boxStyleRoom: {
      margin: 10,
      flexDirection: "row"
    },
    boxTextRoom: {
      flexDirection: 'row',
      columnGap: 10,
      alignItems: 'center',
      marginBottom: 10,
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