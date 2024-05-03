import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT } from '../../../utils/Dimension'
import { StatusBar } from 'expo-status-bar';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import st from './styles'
import useTheme from '../../hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context';
import APost from './post/aPost';
import { getItemObjectAsyncStorage } from '../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../constants/storage';
import { searchGardenAction } from '../../services/garden/actions';
import { searchPostAction } from '../../services/post/actions';
import { useDispatch } from 'react-redux';
import Post from './post/post';

const Database = () => {
  const styles = st();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [listPost, setListPost] = useState([]);
  const dispatch = useDispatch<any>();
  const [userInfo, setUserInfo] = useState<any>();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await handelGetPost()
    setRefreshing(false);
  }, []);

  let userId
  const getUserId = async () => {
    userId = await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
  }


  useFocusEffect(
    useCallback(() => {
      getUserInfo()
      handelGetPost()
    }, [])
  );


  const getUserInfo = async () => {
    await getUserId();
    setLoading(true);
    const req = new FormData();
    req.append("userId", userId)
    try {
      const res = await dispatch(searchGardenAction(req));
      console.log('garden: ', res.payload.body[0])
      setUserInfo(res.payload.body[0]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user info:', err);
      setLoading(false);
    }
  };

  const handelGetPost = async () => {
    setLoading(true)
    try {
      const res = await dispatch(searchPostAction({ 'keyword': searchQuery }));
      if (res?.payload) {
        console.log('status', res?.payload.body)
        setListPost(res?.payload.body);
        setSearchQuery('')
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
      <StatusBar backgroundColor={theme.color_1}></StatusBar>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        onIconPress={handelGetPost}
        value={searchQuery}
        style={{ marginTop: 20, marginHorizontal: 15 }}
      />
      <View>
        <View>
          <Text style={styles.title}>Gợi ý</Text>
          {(listPost[0]) ? (
            <FlatList
              data={listPost}
              renderItem={({ item }) => <APost data={item} />}
              keyExtractor={item => item.id}
              style={{
                marginBottom: 180,
              }}
              refreshing={refreshing} // Trạng thái làm mới
              onRefresh={onRefresh} // Hàm được gọi khi làm mới
              onScroll={() => { onRefresh }}
            // onEndReached={onEndReached} // Hàm được gọi khi người dùng đến cuối danh sách
            // onEndReachedThreshold={0.1}
            />
          ) : (
            <Text style={{ marginLeft: 100, marginTop: 100, color: theme.color_1 }}>Không có kết quả phù hợp.</Text>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Database;