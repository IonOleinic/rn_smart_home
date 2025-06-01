import { StyleSheet, Text, View } from 'react-native'
import MotionImage from './MotionSensorImages/MotionImage'
import NoMotionImage from './MotionSensorImages/NoMotionImage'
import VibrationImage from './MotionSensorImages/VibrationImage'
import NoVibrationImage from './MotionSensorImages/NoVibrationImage'
import useTheme from '@/hooks/useTheme'
import { useEffect, useState } from 'react'

function SmartMotionSensor({ device }) {
  const { theme } = useTheme()
  const [status, setStatus] = useState('No Motion')
  const [statusImg, setStatusImg] = useState(<></>)
  const motionDetectedMessage =
    device.sub_type === 'pir' ? 'Motion Detected!' : 'Vibration Detected!'
  const noMotionDetectedMessage =
    device.sub_type === 'pir' ? 'No Motion' : 'No Vibration'
  const styles = createStyleSheet(theme)
  useEffect(() => {
    setStatus(device.attributes.status)
    if (device.attributes.status == 'ON') {
      if (device.sub_type === 'pir')
        setStatusImg(<MotionImage color={theme.text} size={200} />)
      else if (device.sub_type === 'vibration')
        setStatusImg(<VibrationImage color={theme.text} size={200} />)
    } else {
      if (device.sub_type === 'pir')
        setStatusImg(<NoMotionImage color={theme.text} size={200} />)
      else if (device.sub_type === 'vibration')
        setStatusImg(<NoVibrationImage color={theme.text} size={200} />)
    }
  }, [device, theme])

  return (
    <View style={styles.smartMotionSensor}>
      <View style={styles.motionImageContainer}>{statusImg}</View>
      <View style={styles.motionStatusContainer}>
        <Text
          style={[
            styles.motionStatusText,
            { color: status == 'ON' ? theme.danger : theme.text },
          ]}
        >
          {status == 'ON' ? motionDetectedMessage : noMotionDetectedMessage}
        </Text>
      </View>
    </View>
  )
}

export default SmartMotionSensor

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    smartMotionSensor: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    motionImageContainer: {
      width: 200,
      height: 200,
    },
    motionStatusContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    motionStatusText: {
      fontSize: 20,
      fontWeight: 500,
      textTransform: 'capitalize',
      letterSpacing: 1,
    },
  })
}
