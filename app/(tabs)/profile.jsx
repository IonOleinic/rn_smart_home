import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useTheme from '@/hooks/useTheme'
import useLogout from '@/hooks/useLogout'

const Profile = () => {
  const { colorScheme, theme } = useTheme()
  const logout = useLogout()
  const styles = createStyleSheet(theme)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.pageBck,
        paddingBottom: 64,
      }}
    >
      <View style={styles.pageContainer}>
        <View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed
                  ? theme.buttonPressedBck
                  : theme.buttonBck,
              },
            ]}
            onPress={logout}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default Profile

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    pageContainer: {
      width: '100%',
      position: 'relative',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      gap: 15,
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
