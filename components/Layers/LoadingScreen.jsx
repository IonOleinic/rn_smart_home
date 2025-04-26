import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoadingScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Loading...</Text>
    </SafeAreaView>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({})
