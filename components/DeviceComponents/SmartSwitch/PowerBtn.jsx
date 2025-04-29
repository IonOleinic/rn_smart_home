import useTheme from '@/hooks/useTheme'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { Pressable, StyleSheet } from 'react-native'

const PowerBtn = ({ isChecked, size, handlePower, id }) => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <Pressable
      style={styles.powerBtn}
      id={`power_btn${id}`}
      onPress={() => {
        handlePower(id)
      }}
    >
      <FontAwesome5
        name='power-off'
        size={size}
        color={isChecked ? theme.active : theme.inactive}
      />
    </Pressable>
  )
}

export default PowerBtn

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    powerBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 6,
    },
  })
}
