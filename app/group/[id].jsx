import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const GroupDetails = () => {
  const { id } = useLocalSearchParams()
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
      <View>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Group Details {id}
        </Text>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default GroupDetails

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
