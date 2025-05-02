import useTheme from '@/hooks/useTheme'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { StyleSheet } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

const PowerBtn = ({ isChecked, size, handlePower, id }) => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <TouchableRipple
      borderless={true}
      rippleColor={isChecked ? theme.ripplePwrBtnOff : theme.ripplePwrBtnOn}
      style={styles.powerBtn}
      id={`power_btn${id}`}
      onPress={() => {
        handlePower(id)
      }}
      foreground={true}
    >
      <FontAwesome5
        name='power-off'
        size={size}
        color={isChecked ? theme.active : theme.inactive}
      />
    </TouchableRipple>
  )
}

export default PowerBtn

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    powerBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 6,
      borderRadius: '50%',
    },
  })
}
