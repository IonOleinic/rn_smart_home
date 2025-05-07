import { View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const TabBarSafeAreaWrapper = ({ children }) => {
  const tabBarHeight = useBottomTabBarHeight()
  return (
    <View style={{ flex: 1, paddingBottom: tabBarHeight }}>{children}</View>
  )
}
export default TabBarSafeAreaWrapper
