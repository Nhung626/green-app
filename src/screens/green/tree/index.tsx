import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, TouchableOpacity, FlatList, ScrollView, ToastAndroid } from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_TITLE } from '../../../constants/navigation';

import st from './styles'
import useTheme from '../../../hooks/useTheme'
import Tree from './tree';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTreeAction, searchTreeAction } from '../../../services/tree/actions';
import { useDispatch } from 'react-redux';
import Loading from '../../../../utils/loading/loading';



const ListTree = ({ data, isShow }) => {
  const styles = st();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [listTree, setListTree] = useState()
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const res = await dispatch(searchTreeAction({ 'gardenId': data }));
          if (res?.payload) {
            setListTree(res?.payload.body);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching garden info:', error);
          ToastAndroid.show('Có lỗi!', ToastAndroid.SHORT);
          setLoading(false);

        };
      }
      fetchData();
    }, []
    ))

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listTree}
        renderItem={({ item }) => <Tree data={item} isShow={isShow} />}
        keyExtractor={item => item.name}
        style={{
          marginBottom: 50,
        }}
      />

      {(isShow) &&
        <TouchableOpacity style={styles.add}
          onPress={() => navigation.navigate(NAVIGATION_TITLE.ADD_TREE)}
        >
          <Icon name='add' style={{ color: theme.color_4 }}>
          </Icon>
        </TouchableOpacity>
      }
      <Loading visiable={loading} />

    </SafeAreaView>
  );
};

export default ListTree;