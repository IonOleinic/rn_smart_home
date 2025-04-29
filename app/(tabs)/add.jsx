import { StyleSheet, Text, View } from 'react-native'
import { useCallback, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useFocusEffect } from 'expo-router'
import AddNewItem from '@/components/AddNewItem/AddNewItem'
import useTheme from '@/hooks/useTheme'

const addNewItemIconSize = 45

const Add = () => {
  const [refreshKey, setRefreshKey] = useState(0)
  const { colorScheme, theme } = useTheme()
  const styles = useMemo(
    () => createStyleSheet(theme, colorScheme),
    [theme, colorScheme]
  )
  useFocusEffect(
    useCallback(() => {
      setRefreshKey((prev) => prev + 1)
    }, [])
  )
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.pageBck,
        paddingBottom: 64,
      }}
    >
      <View style={[styles.pageContainer]}>
        <Animated.View
          key={`title-${refreshKey}`}
          entering={FadeInUp.delay(20)}
          style={styles.addNewTitle}
        >
          <Text style={styles.addNewTitleText}>You want to add a new...</Text>
        </Animated.View>
        <View style={styles.addNewItemContainer}>
          <AddNewItem
            title='Device'
            icon={
              <MaterialCommunityIcons
                name='nintendo-switch'
                size={addNewItemIconSize}
                color={theme.text}
              />
            }
          />
          <AddNewItem
            title='Scene'
            icon={
              <MaterialIcons
                name='event-seat'
                size={addNewItemIconSize}
                color={theme.text}
              />
            }
          />
          <AddNewItem
            title='Group'
            icon={
              <FontAwesome5
                name='cubes'
                size={addNewItemIconSize}
                color={theme.text}
              />
            }
          />
        </View>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default Add

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({
    pageContainer: {
      width: '100%',
      position: 'relative',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      gap: 15,
    },
    addNewTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: 30,
    },
    addNewTitleText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: theme.text,
    },
    addNewItemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      gap: 20,
      padding: 30,
    },
  })
}
