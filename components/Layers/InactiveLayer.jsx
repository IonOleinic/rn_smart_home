import useTheme from '@/hooks/useTheme'
import { StyleSheet, Text, View } from 'react-native'

const InactiveLayer = ({ visibility, message, icon }) => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <View
      style={visibility ? styles.inactiveLayer : styles.inactiveLayerHidden}
    >
      <View
        style={
          message
            ? styles.inactiveLayerMessage
            : styles.inactiveLayerMessageHidden
        }
      >
        {icon}
        <Text style={styles.inactiveLayerText}>{message}</Text>
      </View>
    </View>
  )
}

export default InactiveLayer

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    inactiveLayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      opacity: 0.6,
    },
    inactiveLayerHidden: {
      display: 'none',
    },
    inactiveLayerMessage: {
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 5,
      paddingHorizontal: 8,
    },
    inactiveLayerMessageHidden: {
      display: 'none',
    },
    inactiveLayerText: {
      color: theme.text,
      fontSize: 18,
    },
  })
}
