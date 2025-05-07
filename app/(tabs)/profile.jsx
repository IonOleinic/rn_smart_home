import { StyleSheet, Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import useLogout from '@/hooks/useLogout'
import { Button } from 'react-native-paper'

const Profile = () => {
  const { colorScheme, theme } = useTheme()
  const logout = useLogout()
  const styles = createStyleSheet(theme)
  return (
    <View style={styles.pageContainer}>
      <Button
        mode='contained'
        buttonColor={theme.active}
        style={styles.button}
        onPress={logout}
        textColor='white'
      >
        Sign Out
      </Button>
    </View>
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
      borderRadius: 5,
      width: 110,
    },
  })
}
