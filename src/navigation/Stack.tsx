import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION_TITLE } from '../constants/navigation';
import MyBottomTabs from './BottomTab';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Green from "../screens/green"
import Database from "../screens/database"
import Community from "../screens/community"
import Info from "../screens/info"
import UpdateInfo from '../screens/info/updateInfo';
import AddTree from '../screens/green/tree/addTree';
import AddLand from '../screens/green/land/addLand';
import ATree from '../screens/green/tree/aTree';
import ALand from '../screens/green/land/aLand';
import AddDiary from '../screens/green/diary/addDiary';
import Post from '../screens/database/post/post';
const Stack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName={NAVIGATION_TITLE.LOGIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NAVIGATION_TITLE.TAB} component={MyBottomTabs} />
            {/* <Stack.Screen name={NAVIGATION_TITLE.DETAIL} component={EntryDetail} /> */}
            <Stack.Screen name={NAVIGATION_TITLE.LOGIN} component={Login} />
            <Stack.Screen name={NAVIGATION_TITLE.REGISTER} component={Register} />
            <Stack.Screen name={NAVIGATION_TITLE.GREEN} component={Green} />
            <Stack.Screen name={NAVIGATION_TITLE.COMMUNITY} component={Community} />
            <Stack.Screen name={NAVIGATION_TITLE.DATABASE} component={Database} />
            <Stack.Screen name={NAVIGATION_TITLE.INFO} component={Info} />
            <Stack.Screen name={NAVIGATION_TITLE.UPDATE_INFO} component={UpdateInfo} />
            <Stack.Screen name={NAVIGATION_TITLE.ADD_LAND} component={AddLand} />
            <Stack.Screen name={NAVIGATION_TITLE.ADD_TREE} component={AddTree} />
            <Stack.Screen name={NAVIGATION_TITLE.ADD_DIARY} component={AddDiary} />
            <Stack.Screen name={NAVIGATION_TITLE.A_TREE} component={ATree} />
            <Stack.Screen name={NAVIGATION_TITLE.A_LAND} component={ALand} />
            <Stack.Screen name={NAVIGATION_TITLE.POST} component={Post} />
        </Stack.Navigator>
    )
}

export default Stack