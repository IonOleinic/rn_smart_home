import { StyleSheet, Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import RequireAuth from '@/components/Auth/RequireAuth'

const AddGroup = () => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <RequireAuth>
      <View style={styles.pageContainer}>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Add New Group
        </Text>
      </View>
    </RequireAuth>
  )
}

export default AddGroup

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
