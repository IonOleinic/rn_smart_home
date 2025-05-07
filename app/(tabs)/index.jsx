import { StyleSheet, Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'

const Dashboard = () => {
  const { colorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <View style={styles.pageContainer}>
      <View>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Dashboard
        </Text>
      </View>
    </View>
  )
}

export default Dashboard

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
  })
}
