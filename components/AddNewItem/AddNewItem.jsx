import { Pressable, StyleSheet, Text } from 'react-native'
import { ThemeContext } from '@/context/ThemeContext'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInDown,
} from 'react-native-reanimated'

const AddNewItem = ({ title, icon }) => {
  const [refreshKey, setRefreshKey] = useState(0)
  const router = useRouter()
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
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
    <Animated.View
      key={refreshKey}
      entering={
        title === 'Device'
          ? FadeInLeft.delay(50)
          : title === 'Scene'
          ? FadeInRight.delay(200)
          : FadeInDown.delay(350)
      }
      style={{ borderRadius: 20, overflow: 'hidden' }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.addNewItem,
          {
            borderColor: pressed ? theme.active : theme.text,
            backgroundColor: pressed
              ? theme.activePressedBackground
              : 'transparent',
          },
        ]}
        onPress={() => {
          if (title === 'Device') {
            router.push('/device/add')
          }
          if (title === 'Scene') {
            router.push('/scene/add')
          }
          if (title === 'Group') {
            router.push('/group/add')
          }
        }}
      >
        {icon}
        <Text style={styles.addNewItemText}>{title}</Text>
      </Pressable>
    </Animated.View>
  )
}

export default AddNewItem

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({
    addNewItem: {
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      borderRadius: 20,
      borderWidth: 3,
      width: 150,
      height: 150,
      borderColor: theme.text,
    },
    addNewItemText: {
      color: theme.text,
      fontSize: 30,
    },
  })
}
