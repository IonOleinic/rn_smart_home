import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useTheme from '@/hooks/useTheme'
import RequireAuth from '@/components/Auth/RequireAuth'

const SceneDetails = () => {
  const { id } = useLocalSearchParams()
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
        <View>
          <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
            Scene Details {id}
          </Text>
        </View>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </SafeAreaView>
    </RequireAuth>
  )
}

export default SceneDetails

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
