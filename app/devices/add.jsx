import { StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import useTheme from '@/hooks/useTheme'

const AddDevice = () => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <View style={styles.pageContainer}>
      <Animated.View entering={FadeInDown.duration(400).delay(300)}>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Add New Device
        </Text>
      </Animated.View>
    </View>
  )
}

export default AddDevice

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
