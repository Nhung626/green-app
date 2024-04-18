import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import st from './styles'
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../../services/auth/actions';
import { getItemObjectAsyncStorage, setItemAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';
import Loading from '../../../../utils/loading/loading';
import Toast from '../../../../utils/toast';

const Login = () => {
    const [account, setAccount] = useState({
        email: '',
        password: '',
    });
    const navigation = useNavigation<any>()
    const dispatch = useDispatch<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const styles = st();

    const handleChangeAccount = (textInputName) => {
        return (value: any) => {
            setAccount({ ...account, [textInputName]: value })
        }
    }

    const handleLogin = () => {
        setLoading(true)
        dispatch(loginActions(account))
            .then(res => {
                setLoading(false)
                if (res.payload) {
                    setItemAsyncStorage(KEY_STORAGE.SAVED_INFO, JSON.stringify(res.payload));
                    setItemAsyncStorage(KEY_STORAGE.USER_ID, JSON.stringify(res.payload.id));
                    navigation.navigate(NAVIGATION_TITLE.TAB, { screen: NAVIGATION_TITLE.GREEN })
                    setAccount({
                        email: '',
                        password: '',
                    });
                    console.log(res.payload)
                    return(<Toast description='Đăng nhập thành công' time={3} />)
                } else {
                    ToastAndroid.show('Xem lại thông tin đăng nhập!', ToastAndroid.SHORT)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log('hello', err)
                ToastAndroid.show('Xem lại thông tin đăng nhập!', ToastAndroid.SHORT)
            })
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../../assets/icon.png')}
            />
            <Text style={styles.slogan}>Xanh</Text>
            <Text style={styles.inputLabel}>E-mail: </Text>
            <View style={styles.formItem}>
                <TextInput
                    style={styles.input}
                    value={account.email}
                    onChangeText={handleChangeAccount('email')}
                    placeholder='Nhập email'
                />
            </View>
            <Text style={styles.inputLabel}>Mật khẩu:</Text>
            <View style={styles.formItem}>
                <TextInput
                    style={styles.input}
                    value={account.password}
                    onChangeText={handleChangeAccount('password')}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                onPress={handleLogin} 
                style={styles.formBtn}>
                <Text style={styles.textBtn}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.register}>
                <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate(NAVIGATION_TITLE.REGISTER) }}>
                    <Text style={[styles.registerText, styles.registerLink]}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <Loading visiable={loading} />
        </KeyboardAvoidingView>

    );
};

export default Login;
