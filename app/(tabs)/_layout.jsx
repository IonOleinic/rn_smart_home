import { Pressable } from 'react-native'
import { Tabs } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import TabBarIcon from '@/components/TabBar/TabBarIcon'
import useTheme from '@/hooks/useTheme'
import PersistLogin from '@/components/Auth/PersistLogin'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
const tabBarIconSize = 25

const TabsLayout = () => {
  const { colorScheme, theme } = useTheme()
  return (
    <PersistLogin>
      <Tabs
        screenOptions={{
          tabBarButton: (props) => (
            <Pressable {...props} android_ripple={{ color: 'transparent' }} />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            elevation: 0,
            position: 'absolute',
            bottom: 0,
            height: 64,
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.background,
            borderColor: theme.background,
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
            title: 'Add menu',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Menu' />
            },
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
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Profile' />
            },
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
    </PersistLogin>
  )
}

export default TabsLayout
