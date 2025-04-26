import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown } from 'react-native-reanimated'
import useTheme from '@/hooks/useTheme'
import RequireAuth from '@/components/Auth/RequireAuth'

const AddDevice = () => {
  const { colorScheme, setColorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme, colorScheme)
  return (
    <RequireAuth>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <Animated.View entering={FadeInDown.duration(400).delay(300)}>
          <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
            Add New Device
          </Text>
        </Animated.View>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </SafeAreaView>
    </RequireAuth>
  )
}

export default AddDevice

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
