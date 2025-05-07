import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import useTheme from '@/hooks/useTheme'
import RequireAuth from '@/components/Auth/RequireAuth'

const SceneDetails = () => {
  const { id } = useLocalSearchParams()
  const { colorScheme, setColorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme, colorScheme)
  return (
    <RequireAuth>
      <View>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Scene Details {id}
        </Text>
      </View>
    </RequireAuth>
  )
}

export default SceneDetails

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({})
}
