import React from 'react';
import { ScrollView, Text, View, StatusBar } from 'react-native';
import { SCREEN_HEIGHT } from '../../../utils/Dimension'
import Status from './component/status';
import AddStatus from './component/status/addStatus';
import st from './styles'
import useTheme from '../../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/FontAwesome";

const Community = () => {
  const styles = st();
  const theme = useTheme();
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar backgroundColor={theme.color_2} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Green</Text>
          <Icon name="search" style={{ marginLeft: 260, marginTop: 5 }} color={theme.color_1} size={25}></Icon>
        </View>
        <AddStatus></AddStatus>
        <Status></Status>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;
