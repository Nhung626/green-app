import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid, KeyboardAvoidingView, Platform } from 'react-native';
import st from './styles'
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { validateEmail, validatePassword } from '../../../../utils/validate';
import { useDispatch } from 'react-redux';
import { loginActions, registerActions } from '../../../services/auth/actions';
import { setItemAsyncStorage } from '../../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../../constants/storage';

const Register = () => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigation = useNavigation<any>()
  const dispatch = useDispatch<any>()
  const styles = st();

  const handleChangeAccount = (textInputName) => {
    return (value: any) => {
      setAccount({ ...account, [textInputName]: value });
    };
  };

  const showToast = () => {
    ToastAndroid.show(
      'Đăng ký thành công!',
      ToastAndroid.LONG,
    );
  };

  const handleRegister = async () => {
    if (account.password !== account.confirmPassword) {
      ToastAndroid.show('Mật khẩu không khớp!', ToastAndroid.SHORT)
    }
    if (!account.email || !account.password) {
      ToastAndroid.show('Vui lòng điền đủ thông tin!', ToastAndroid.SHORT)
    }
    else if (validateEmail(account.email)) {
      ToastAndroid.show('Kiểm tra lại email!', ToastAndroid.SHORT)
    }
    else if (validatePassword(account.password)) {
      ToastAndroid.show('Mật khẩu dài tối thiểu 8 ký tự!', ToastAndroid.SHORT)
    }
    else {
      dispatch(registerActions({
        email: account.email,
        password: account.password,
      })).then(async res => {
        if (res.payload) {
          showToast()
          await handleLogin();
          navigation.navigate(NAVIGATION_TITLE.ADD_USERINFO);
          setAccount({
            email: "",
            password: "",
            confirmPassword: ""
          });
        }
      })
        .catch(err => ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT))
    }
  };

  const handleLogin = async () => {
    await dispatch(loginActions(account))
      .then(async res => {
        if (res.payload) {
          await setItemAsyncStorage(KEY_STORAGE.SAVED_INFO, JSON.stringify(res.payload));
          await setItemAsyncStorage(KEY_STORAGE.USER_ID, JSON.stringify(res.payload.id));
        }
      })
      .catch(err => {
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


      <Text style={styles.inputLabel}>Email: </Text>
      <View>
        <TextInput
          style={styles.input}
          value={account.email}
          onChangeText={handleChangeAccount('email')}
          placeholder='Nhập email'
          keyboardType='email-address'
        />
      </View>

      <View>
        <Text style={styles.inputLabel}>Mật khẩu:</Text>
        <TextInput
          style={styles.input}
          value={account.password}
          onChangeText={handleChangeAccount('password')}
          placeholder="Nhập mật khẩu"
          secureTextEntry
        />
      </View>

      <Text style={styles.inputLabel}>Xác nhận mật khẩu:</Text>
      <View>
        <TextInput
          style={styles.input}
          value={account.confirmPassword}
          onChangeText={handleChangeAccount('confirmPassword')}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        onPress={handleRegister}
        style={[, styles.formBtn]}>
        <Text style={styles.textBtn}>Đăng ký</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text style={styles.registerText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => { navigation.navigate(NAVIGATION_TITLE.LOGIN) }}>
          <Text style={[styles.registerText, styles.registerLink]}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
