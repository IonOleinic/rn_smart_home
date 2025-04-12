import { StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated'

const AddDevice = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const styles = createStyleSheet(theme, colorScheme)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <Animated.View
        entering={FadeInDown.duration(400).delay(300)}
        exiting={FadeOut}
      >
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Add New Device
        </Text>
      </Animated.View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default AddDevice

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
