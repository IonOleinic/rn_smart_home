import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

const _Layout = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)

  const styles = createStyleSheet(theme, colorScheme)

  const TabBarIcon = ({ title, icon, focused }) => {
    if (focused) {
      return (
        <View style={[styles.tabBarIcon, styles.tabBarIconFocused]}>
          {icon}
          <Text style={styles.tabBarIconText}>{title}</Text>
        </View>
      )
    }
    return <View style={styles.tabBarIcon}>{icon}</View>
  }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        tabBarStyle: {
          elevation: 0,
          position: 'absolute',
          bottom: 5,
          height: 50,
          marginHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          borderWidth: 1,
          borderTopWidth: 1,
          overflow: 'hidden',
          borderColor:
            colorScheme === 'dark' ? 'rgb(55, 55, 55)' : theme.active,
          backgroundColor: colorScheme === 'dark' ? 'rgb(55, 55, 55)' : 'white',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title='Dash'
              icon={
                <MaterialIcons
                  name='dashboard'
                  size={focused ? 28 : 25}
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
                  size={focused ? 28 : 25}
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
                  size={focused ? 28 : 25}
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
                  size={focused ? 28 : 25}
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

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({
    tabBarIcon: {
      backgroundColor: 'transparent',
      width: 50,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabBarIconFocused: {
      backgroundColor: theme.active,
      width: 100,
      borderRadius: 6,
      gap: 3,
    },
    tabBarIconText: {
      color: 'white',
      fontSize: 16,
    },
  })
}
