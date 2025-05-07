import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTheme from '@/hooks/useTheme'

const SafeAreaWrapper = ({ children }) => {
  const { theme, colorScheme } = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {children}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default SafeAreaWrapper
