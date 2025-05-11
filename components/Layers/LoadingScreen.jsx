import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'
import useTheme from '@/hooks/useTheme'

const LoadingScreen = () => {
  const { theme } = useTheme()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator animating={true} color={theme.active} size='large' />
      <Text style={{ fontSize: 18, color: theme.text }}>Loading...</Text>
    </SafeAreaView>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({})
