import { Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { TouchableRipple } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const CustomHeader = ({
  navigation,
  title,
  hideBackIcon = false,
  titlePosition = 'left', // 'center' or 'left'
}) => {
  const { theme } = useTheme()

  return (
    <View
      style={{
        width: '100%',
        height: 68,
        backgroundColor: theme.background,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        justifyContent: 'space-between',
      }}
    >
      {/* Back Icon - always on the left */}
      {!hideBackIcon ? (
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            padding: 6,
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name='arrow-back' size={24} color={theme.text} />
        </TouchableRipple>
      ) : (
        <View style={{ width: 40 }} /> // placeholder for spacing if icon is hidden
      )}

      {/* Title - center or left-aligned */}
      <View
        style={{
          flex: 1,
          alignItems: titlePosition === 'center' ? 'center' : 'flex-start',
          marginLeft: !hideBackIcon && titlePosition === 'left' ? 10 : 0,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
          }}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {title}
        </Text>
      </View>

      {/* Optional right-side placeholder to balance center alignment */}
      <View style={{ width: 40 }} />
    </View>
  )
}

export default CustomHeader
