import { Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { TouchableRipple } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const CustomHeader = ({ navigation, title }) => {
  const { theme } = useTheme()
  return (
    <View
      style={{
        height: 68,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        // ✅ Elevation (Android)
        elevation: 4,
        // ✅ Shadow (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // ✅ For consistent background in shadow
        zIndex: 1,
      }}
    >
      <TouchableRipple
        rippleColor={theme.ripple}
        borderless={true}
        onPress={() => navigation.goBack()}
        style={{
          padding: 8,
          borderRadius: '50%',
        }}
      >
        <MaterialIcons name='arrow-back' size={24} color={theme.text} />
      </TouchableRipple>

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.text,
          marginLeft: 16,
        }}
      >
        {title}
      </Text>
    </View>
  )
}

export default CustomHeader
