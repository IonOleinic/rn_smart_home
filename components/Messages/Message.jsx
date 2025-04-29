import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import Octicons from '@expo/vector-icons/Octicons'
import Ionicons from '@expo/vector-icons/Ionicons'
import useTheme from '@/hooks/useTheme'

const Message = ({ severity, text }) => {
  const { theme } = useTheme()
  const errorIcon = <Feather name='x-circle' size={18} color={theme.error} />
  const infoIcon = <Octicons name='info' size={18} color={theme.info} />
  const successIcon = (
    <Ionicons name='checkmark-circle-outline' size={18} color={theme.success} />
  )
  const warningIcon = (
    <Ionicons name='warning-outline' size={18} color={theme.warning} />
  )
  const [severityIcon, setSeverityIcon] = useState(<></>)
  const [severityBckColor, setSeverityBckColor] = useState(theme.text)
  const [severityColor, setSeverityColor] = useState(theme.background)
  useEffect(() => {
    switch (severity) {
      case 'error':
        setSeverityIcon(errorIcon)
        setSeverityBckColor(theme.errorBck)
        setSeverityColor(theme.error)
        break
      case 'info':
        setSeverityIcon(infoIcon)
        setSeverityBckColor(theme.infoBck)
        setSeverityColor(theme.info)
        break
      case 'success':
        setSeverityIcon(successIcon)
        setSeverityBckColor(theme.successBck)
        setSeverityColor(theme.success)
        break
      case 'warn':
      case 'warning':
        setSeverityIcon(warningIcon)
        setSeverityBckColor(theme.warningBck)
        setSeverityColor(theme.warning)
        break
      default:
        setSeverityIcon(<></>)
        setSeverityBckColor(theme.text)
        setSeverityColor(theme.background)
    }
  }, [severity, theme])
  const styles = createStyleSheet()

  return (
    <View style={[styles.container, { backgroundColor: severityBckColor }]}>
      {severityIcon}
      <Text style={[styles.text, { color: severityColor }]}>{text}</Text>
    </View>
  )
}

export default Message

const createStyleSheet = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    text: {
      fontSize: 16,
      maxWidth: '92%',
    },
  })
}
