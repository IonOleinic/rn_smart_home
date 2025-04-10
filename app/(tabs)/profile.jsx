import { StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Profile = () => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
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
          Profile
        </Text>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
