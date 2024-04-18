import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Button, TextInput, Modal, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, ToastAndroid, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import st from './styles'
import useTheme from '../../../../hooks/useTheme';
import { Avatar, IconButton } from 'react-native-paper';

const Comment = () => {

    const styles = st();
    const theme = useTheme();

    return (
        <View style={{marginVertical: 5, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Avatar.Image size={25} source={require('../../../../../assets/images/ava.png')} />
                <Text>Usename</Text>
            </View>
            <Text style={{marginTop: 5,}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore odit quae odio perferendis vel, magni, officia at quisquam quibusdam, voluptate recusandae nemo eos. Culpa aliquid assumenda et asperiores incidunt sequi?</Text>
            <View style={{ flexDirection: 'row', marginTop: 5, }}>
                {/* <IconButton icon="like"
                    iconColor={theme.color_2}
                    size={20}
                /> */}
                <TouchableOpacity style={{ marginRight: 10, }}>
                    <Text>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10, }}>
                    <Text>Reply</Text>
                </TouchableOpacity >
                <Text>Date</Text>
            </View>
        </View>
    )
}
export default Comment;