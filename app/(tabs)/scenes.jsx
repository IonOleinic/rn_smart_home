import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useTheme from '@/hooks/useTheme'

const Scenes = () => {
  const { colorScheme, setColorScheme, theme } = useTheme()
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
      <View>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Scenes
        </Text>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default Scenes

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
