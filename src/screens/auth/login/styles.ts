import { StyleSheet } from 'react-native'
import useTheme from '../../../hooks/useTheme'

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 40,
            backgroundColor: theme.color_2,
        },
        logo: {
            height: 100,
            width: 100,
            borderRadius: 100,
            alignSelf: 'center',
            resizeMode: 'cover',
            marginBottom: 10,
        },
        title: {
            color: theme.color_1,
            fontSize: 40,
            fontWeight: '800',
            marginBottom: 3,
            textAlign: 'center',
        },
        slogan: {
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 15,
            color: theme.color_1,
        },
        error: {
            color: theme.text_err,
            textAlign: 'center',
            marginTop: 20,
            fontStyle: 'italic',
            fontSize: 13,
        },
        inputLabel: {
            fontSize: 15,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: '500',
            color: theme.color_1,
        },
        input: {
            color: theme.color_1,
            fontSize: 14,
            paddingHorizontal: 20,
            borderRadius: 10,
            height: 50,
            overflow: 'hidden',
            backgroundColor: theme.backgroundColor_3,
        },
        formItem: {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.color_2,
            backgroundColor: theme.backgroundColor,
            justifyContent: 'center',
            shadowColor: theme.color_1,
            shadowOffset: {
                width: 0,
                height: 3,
            },
        },
        formBtn: {
            backgroundColor: theme.color_1,
            height: 50,
            width: '50%',
            marginHorizontal: '25%',
            justifyContent: 'center',
            borderRadius: 50,
            marginTop: 30,
        },
        textBtn: {
            textAlign: 'center',
            color: theme.text_white,
            fontWeight: '500',
            fontSize: 15,
        },
        register: {
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
        },
        registerText: {
            color: theme.text_1,
        },
        registerLink: {
            fontWeight: '500',
            color: theme.text_err,
        },
        bg: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            resizeMode: 'contain',
            zIndex: -10,
            opacity: 0.15,
        }
    })
    return st;
}
export default styles;