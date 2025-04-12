import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import TabBarIcon from '@/components/TabBar/TabBarIcon'

const tabBarIconSize = 25

const _Layout = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  return (
    <Tabs
      screenOptions={{
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: 'transparent' }} />
        ),
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          position: 'absolute',
          bottom: 5,
          height: 54,
          marginHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          borderWidth: 1,
          borderTopWidth: 1,
          backgroundColor: theme.tabBarBackground,
          borderColor: theme.tabBarBackground,
        },
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Dasboard',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title='Dashboard'
              icon={
                <MaterialIcons
                  name='dashboard'
                  size={tabBarIconSize}
                  color={
                    colorScheme === 'dark'
                      ? 'white'
                      : focused
                      ? 'white'
                      : 'black'
                  }
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='devices'
        options={{
          title: 'Devices',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title='Devices'
              icon={
                <MaterialCommunityIcons
                  name='nintendo-switch'
                  size={tabBarIconSize}
                  color={
                    colorScheme === 'dark'
                      ? 'white'
                      : focused
                      ? 'white'
                      : 'black'
                  }
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='add'
        options={{
          title: 'Add',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title='Add'
              icon={
                <AntDesign
                  name='plussquare'
                  size={tabBarIconSize}
                  color={
                    colorScheme === 'dark'
                      ? 'white'
                      : focused
                      ? 'white'
                      : 'black'
                  }
                />
              }
            />
          ),
          tabBarItemStyle: {
            bottom: 20,
            zIndex: 100,
            width: 50,
            height: 50,
          },
        }}
      />
      <Tabs.Screen
        name='scenes'
        options={{
          title: 'Scenes',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title='Scenes'
              icon={
                <MaterialIcons
                  name='event-seat'
                  size={tabBarIconSize}
                  color={
                    colorScheme === 'dark'
                      ? 'white'
                      : focused
                      ? 'white'
                      : 'black'
                  }
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title='Profile'
              icon={
                <FontAwesome
                  name='user-circle-o'
                  size={tabBarIconSize}
                  color={
                    colorScheme === 'dark'
                      ? 'white'
                      : focused
                      ? 'white'
                      : 'black'
                  }
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default _Layout
