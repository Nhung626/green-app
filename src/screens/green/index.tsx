import React, { useEffect, useState } from 'react';
import { Header } from '@rneui/themed';
import { Text, View, SafeAreaView, useWindowDimensions, ToastAndroid } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import st from './styles'
import useTheme from '../../hooks/useTheme'
import { getItemObjectAsyncStorage } from '../../../utils/asyncStorage';
import { KEY_STORAGE } from '../../constants/storage';
import { useDispatch } from 'react-redux'
import { getGardenAction, searchGardenAction } from '../../services/garden/actions';
import ListLand from './land';
import ListTree from './tree';
import Loading from '../../../utils/loading/loading';
import { useNavigation, useRoute } from '@react-navigation/native';

const Green = () => {
  const theme = useTheme();
  const styles = st();
  const layout = useWindowDimensions();
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  let userId
  const [gardenInfo, setGardenInfo] = useState({
    "id": "",
    "userId": "",
    "name": "",
    "coverId": "",
    "description": ""
  });
  const [loading, setLoading] = useState(false)
  const getUserId = async () => {
    return await getItemObjectAsyncStorage(KEY_STORAGE.USER_ID);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const id = await getUserId();
      const req = new FormData();
      req.append("userId", id)
      dispatch(searchGardenAction(req))
        .then(res => {
          console.log('tree: ', res)
          setGardenInfo(res?.payload.body[0]);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching garden info:', error);
          ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
          setLoading(false);
        })
    };

    fetchData();
  }, []);

  const TreeScreen = () => (
    <ListTree data={gardenInfo?.id} />
  );

  const LandScreen = () => (
    <ListLand data={gardenInfo?.id} />
  );

  const renderScene = SceneMap({
    first: TreeScreen,
    second: LandScreen,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Cây' },
    { key: 'second', title: 'Vườn' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text style={styles.tabBar}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: theme.backgroundColor_1 }}
      style={{
        backgroundColor: theme.backgroundColor_2
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        placement="left"
        backgroundColor={theme.color_1}
        centerComponent={{ text: `Vườn của ${gardenInfo?.name}`, style: styles.title_header }}
        rightComponent={{ icon: 'search', color: '#fff' }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <Loading visiable={loading} />

    </SafeAreaView>
  );
};

export default Green;