import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SCREEN_HEIGHT } from '../../../utils/Dimension'
import { StatusBar } from 'expo-status-bar';
import { Searchbar } from 'react-native-paper';

import st from './styles'
import useTheme from '../../hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context';
import APost from './post/aPost';

const Database = () => {
  const styles = st();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={theme.color_1}></StatusBar>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{ marginTop: 20, marginHorizontal: 15 }}
      />
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.subtitle}>subtitle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.subtitle}>type</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.subtitle}>type</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.subtitle}>type</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text style={styles.subtitle}>type</Text>
          </TouchableOpacity><TouchableOpacity style={styles.tag}>
            <Text style={styles.subtitle}>type</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Gợi ý</Text>
        <APost></APost>
        <APost></APost>
        <APost></APost>
        <APost></APost>
      </View>
    </SafeAreaView>
  );
};

export default Database;