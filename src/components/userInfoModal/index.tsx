import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import { useDispatch } from 'react-redux'
import { BASE_URL } from '../../constants/api';
import useTheme from '../../hooks/useTheme';
import { Avatar } from 'react-native-paper';

const ListCategoryModal = ({ modalVisible, setModalVisible, setEntryClassify, isHideNav }) => {

    const styles = st();
    const theme = useTheme();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
                <View style={styles.modalContainer}>
                    <Avatar.Image size={24} source={require('../../../assets/images/ava.png')} />
                    <Image></Image> //cover
                    <Text>Username</Text>
                    <Text>Bio</Text>
                    <TouchableOpacity>
                        <Text>Sang thăm vườn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Theo dõi</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={() => { setModalVisible(true) }}>

                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
export default ListCategoryModal;