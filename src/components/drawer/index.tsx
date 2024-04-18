import 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NAVIGATION_TITLE } from '../../constants/navigation'
import { getInfoUserAction } from '../../services/user/actions'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../../constants/api'
import st from './styles'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Header = (props: any) => {
    const { isBack, title } = props
    const isFocused = useIsFocused()
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const styles = st();
    const [infoUser, setInfoUser] = useState({
        id: "",
        email: "",
        username: "",
        urlImage: "",
    })
    useEffect(() => {
        getInfoUser()
    }, [isFocused])
    const getInfoUser = () => {
        dispatch(getInfoUserAction())
            .then(res => {
                setInfoUser(res?.payload)
            })
            .catch(err => console.log('err', err))
    }
    return (
        <View style={styles.container}>
        </View>
    )
}

export default Header