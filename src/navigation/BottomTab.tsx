import React from "react";
import { Image, Text, View } from "react-native";
import { TabsData } from "../constants/bottomTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Green from "../screens/green";
import Database from "../screens/database";
import Community from "../screens/community";
import Info from "../screens/info";
import { NAVIGATION_TITLE } from "../constants/navigation";
import useTheme from "../hooks/useTheme";

const MyBottomTabs = () => {
  const Tab = createBottomTabNavigator();

  const TabBar = ({ focused, tabName }) => {
    const tab = TabsData.find((item) => item?.name === tabName);
    const getColor = () => {
      return focused ? useTheme().tabActive : useTheme().tabColor;
    };

    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={tab?.icon}
          style={{ tintColor: getColor(), height: 30, width: 28 }}
          resizeMode="contain"
        />
        <Text style={{ color: getColor(), fontSize: 13, marginTop: 5 }}>
          {tabName}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80, // Điều chỉnh chiều cao ở đây
          backgroundColor: useTheme().backgroundColor,
        },
      }}
    >
      <Tab.Screen
        name={NAVIGATION_TITLE.GREEN}
        component={Green}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBar focused={focused} tabName={NAVIGATION_TITLE.GREEN} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.COMMUNITY}
        component={Community}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBar focused={focused} tabName={NAVIGATION_TITLE.COMMUNITY} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.DATABASE}
        component={Database}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBar focused={focused} tabName={NAVIGATION_TITLE.DATABASE} />
          ),
        }}
      />
      <Tab.Screen
        name={NAVIGATION_TITLE.INFO}
        component={Info}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBar focused={focused} tabName={NAVIGATION_TITLE.INFO} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTabs;
