import { StyleSheet } from 'react-native'
import useTheme from '../../hooks/useTheme'

const styles = () => {
    const theme = useTheme();
    const st = StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: 60,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 25,
        },
        back: {
            height: 40,
            width: 40,
            justifyContent: 'center',
        },
        backIcon: {
            height: 20,
            width: 20,
            resizeMode: 'contain',
            tintColor: theme.text_1,
        },
        title: {
            fontSize: 18,
            fontWeight: '400',
            color: theme.text_1,
        },
        avatar: {
            height: 40,
            width: 40,
            resizeMode: 'cover',
            borderRadius: 8,
        }
    })
    return st
}

export default styles;