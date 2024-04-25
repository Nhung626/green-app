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
import UpdateTree from '../screens/green/tree/updateTree';
import UpdateLand from '../screens/green/land/updateLand';
import UpdateDiary from '../screens/green/diary/updateDiary';
import AddStatus from '../screens/community/component/status/addStatus';
import AddComment from '../screens/community/component/comment/addComment';
import AStatus from '../screens/community/component/status/aStatus';
import MyProfile from '../screens/info/user';
import MyStatus from '../screens/community/myStatus';
import SavePost from '../screens/database/savePost';
import AddInfo from '../screens/info/updateInfo/addInfo';
import Profile from '../screens/info/user/profile';
import UpdateStatus from '../screens/community/component/status/updateStatus';
import FollowUser from '../screens/info/follow';
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

            <Stack.Screen name={NAVIGATION_TITLE.A_TREE} component={ATree} />
            <Stack.Screen name={NAVIGATION_TITLE.ADD_TREE} component={AddTree} />
            <Stack.Screen name={NAVIGATION_TITLE.UPDATE_TREE} component={UpdateTree} />

            <Stack.Screen name={NAVIGATION_TITLE.ADD_DIARY} component={AddDiary} />
            <Stack.Screen name={NAVIGATION_TITLE.UPDATE_DIARY} component={UpdateDiary} />

            <Stack.Screen name={NAVIGATION_TITLE.ADD_LAND} component={AddLand} />
            <Stack.Screen name={NAVIGATION_TITLE.A_LAND} component={ALand} />
            <Stack.Screen name={NAVIGATION_TITLE.UPDATE_LAND} component={UpdateLand} />

            <Stack.Screen name={NAVIGATION_TITLE.ADD_STATUS} component={AddStatus} />
            <Stack.Screen name={NAVIGATION_TITLE.A_STATUS} component={AStatus} />
            <Stack.Screen name={NAVIGATION_TITLE.ADD_COMMENT} component={AddComment} />

            <Stack.Screen name={NAVIGATION_TITLE.MYPROFILE} component={MyProfile} />
            <Stack.Screen name={NAVIGATION_TITLE.PROFILE} component={Profile} />
            <Stack.Screen name={NAVIGATION_TITLE.MYSTATUS} component={MyStatus} />
            <Stack.Screen name={NAVIGATION_TITLE.UPDATE_STATUS} component={UpdateStatus} />
            <Stack.Screen name={NAVIGATION_TITLE.SAVEPOST} component={SavePost} />

            <Stack.Screen name={NAVIGATION_TITLE.ADD_USERINFO} component={AddInfo} />
            <Stack.Screen name={NAVIGATION_TITLE.POST} component={Post} />
            <Stack.Screen name={NAVIGATION_TITLE.FOLLOW_USER} component={FollowUser} />
        </Stack.Navigator>
    )
}

export default Stack