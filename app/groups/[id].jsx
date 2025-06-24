import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import useTheme from '@/hooks/useTheme'

const GroupDetails = () => {
  const { id } = useLocalSearchParams()
  const { colorScheme, setColorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme, colorScheme)
  return (
    <View>
      <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
        Group Details {id}
      </Text>
    </View>
  )
}

export default GroupDetails

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
