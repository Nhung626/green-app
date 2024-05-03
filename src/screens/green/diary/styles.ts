
import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../utils/Dimension";
import useTheme from "../../../hooks/useTheme";

const styles = () => {
  const theme = useTheme();
  const st = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
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

    headerText: {
      color: theme.color_1,
      fontSize: 24,
      fontWeight: '600',
    },

    //add tree
    backgroundStyle: {
      flex: 1,

    },
    body: {
      marginTop: 20,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'center',
    },

    header1: {
      justifyContent: 'flex-end',
      // color: theme.text_3,
      paddingHorizontal: 15,
      paddingVertical: 20,
      flexDirection: 'row'
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
      marginTop: 20,
      marginHorizontal: '25%',
      borderRadius: 50,
      backgroundColor: theme.color_1
    },
    textButton: {
      color: theme.color_1,
      // paddingLeft: 8,
    },
    add: {
      position: 'absolute',
      right: 20,
      bottom: 185,
      padding: 10,
      borderRadius: 50,
      backgroundColor: theme.color_2,
    },

    //list diary
    containerList: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5, // Cho Android
      marginVertical: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      marginHorizontal: 10,
      paddingBottom: 10,
    },
    headerList: {
      flexDirection: 'row',
      borderBottomWidth: 0.6,
      borderBottomColor: theme.color_2,
      marginTop: 10,
      marginHorizontal: 20,
    },
    list: {
      flexDirection: 'row'
    },
    date: {
      fontWeight: '600',
      fontSize: 15,
      color: theme.color_1,
    },
    boxStyle: {
      margin: 10,
      marginRight: 30,
      width: 200,
      color: theme.color_1,
    },
    boxImage: {
      overflow: 'hidden',
      borderRadius: 20,
      marginTop: 10,
      marginLeft: 15,
      width: 120, // Cho Android
    },
    imgReviewContainer: {
      margin: 5,
    },
    imgReview: {
      width: 160,
      height: 200,
      borderRadius: 10,
    },
    imageContainer1: {
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.color_1,
      margin: 5,
      paddingHorizontal: 5,
      width: '40%'
    },
    imageContainer2: {
      width: '40%',
      margin: 5,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.color_1,
      paddingVertical: 10,
    },
  })
  return st
}

export default styles