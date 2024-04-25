import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View, StatusBar, ToastAndroid, FlatList, TextInput } from 'react-native';
import { SCREEN_HEIGHT } from '../../../utils/Dimension'
import Status from './component/status';
import AddStatus from './component/status/addStatus';
import st from './styles'
import useTheme from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { searchStatusAction } from '../../services/status/actions';
import { useFocusEffect } from '@react-navigation/native';
import { getItemObjectAsyncStorage } from '../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../constants/storage';
import { searchGardenAction } from '../../services/garden/actions';
import Loading from '../../../utils/loading/loading';
import { Avatar } from 'react-native-paper';
import { MEDIA } from '../../constants/api';
import { NAVIGATION_TITLE } from '../../constants/navigation';

const Community = () => {
  const styles = st();
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [listStatus, setListStatus] = useState([]);
  const [keyword, setKeyword] = useState('')
  const [user, setUser] = useState<any>();
  
  const onRefresh = async () => {
    setRefreshing(true);
    await handelGetStatus()
    setRefreshing(false);
  };

  let userId
  const getUserId = async () => {
    userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await getUserInfo()
        await handelGetStatus()
      }
      fetchData();
    }, []
    ))

  const getUserInfo = async () => {
    await getUserId();
    setLoading(true);
    const req = new FormData();
    req.append("userId", userId)
    try {
      const res = await dispatch(searchGardenAction(req));
      console.log('garden: ', res.payload.body[0])
      setUser(res.payload.body[0]);
      console.log(user)
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user info:', err);
      setLoading(false);
    }
  };

  const handelGetStatus = async () => {
    setLoading(true)
    try {
      const res = await dispatch(searchStatusAction({ 'keywords': keyword }));
      if (res?.payload) {
        console.log('status', res?.payload.body)
        setListStatus(res?.payload.body);
      } else {
        ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching satus info:', error);
      ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
      setLoading(false);
    };

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme.color_2} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Green</Text>
        <TouchableOpacity>
          <Icon name="search" style={{ marginLeft: 260, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
        </TouchableOpacity>
      </View>
      {/* <ScrollView> */}

      <TouchableOpacity
        onPress={() => navigation.navigate(NAVIGATION_TITLE.ADD_STATUS)}
        style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={30} source={{ uri: `${MEDIA.SELF}?id=${user?.userInfo.avatarId}` }} />
          <Text style={{
            borderWidth: 0.1,
            padding: 10,
            borderRadius: 5,
            color: 'gray',
            marginLeft: 10,
            width: 320,
          }}>Chia sẻ vô đây nhé.</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={listStatus}
        renderItem={({ item }) => <Status data={item} />}
        keyExtractor={item => item.id}
        refreshing={refreshing} // Trạng thái làm mới
        onRefresh={onRefresh} // Hàm được gọi khi làm mới
        onScroll={() => { onRefresh }}
      />
      <Loading visiable={loading}></Loading>
    </SafeAreaView>
  );
};

export default Community;
