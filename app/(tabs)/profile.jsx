import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useTheme from '@/hooks/useTheme'
import useLogout from '@/hooks/useLogout'

const Profile = () => {
  const { colorScheme, setColorScheme, theme } = useTheme()
  const logout = useLogout()
  const styles = createStyleSheet(theme, colorScheme)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed
                ? theme.buttonPressedBackground
                : theme.buttonBackground,
            },
          ]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default Profile

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.buttonText,
    },
  })
}
