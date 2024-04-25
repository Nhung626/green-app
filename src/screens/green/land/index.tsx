import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, View, FlatList, ScrollView, ToastAndroid } from 'react-native';
import st from './styles'
import Land from './land';
import { Icon } from '@rneui/base';
import useTheme from '../../../hooks/useTheme'
import { NAVIGATION_TITLE } from '../../../constants/navigation';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { searchLandAction } from '../../../services/land/actions';
import Loading from '../../../../utils/loading/loading';

const ListLand = ({ data, isShow }) => {
  const styles = st();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [listLand, setListLand] = useState()
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const res = await dispatch(searchLandAction({ userId: data }));
          if (res.payload) {
            setListLand(res.payload.body);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching garden info:', error);
          ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
          setLoading(false);

        };
      }
      fetchData();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listLand}
        renderItem={({ item }) => <Land data={item} isShow={isShow} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      {(isShow) &&
        <TouchableOpacity style={styles.add}
          onPress={() => navigation.navigate(NAVIGATION_TITLE.ADD_LAND)}
        >
          <Icon name='add' style={{ color: theme.color_4 }}>
          </Icon>
        </TouchableOpacity>
      }
      <Loading visiable={loading} />
    </SafeAreaView>
  );
};

export default ListLand;