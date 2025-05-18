import { Text, View } from 'react-native'
import NoDataFoundIcon from './NoDataFoundIcons/NoDataFoundIcon'
import useTheme from '@/hooks/useTheme'

const NoDataFound = () => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <NoDataFoundIcon size={150} color={theme.inactive} />
      <Text style={{ fontSize: 20, color: theme.inactive, fontWeight: '600' }}>
        No Data Found
      </Text>
    </View>
  )
}

export default NoDataFound
