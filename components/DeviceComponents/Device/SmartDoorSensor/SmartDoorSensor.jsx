import { Pressable, StyleSheet, Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import DoorMainModuleImage from './DoorSensorImages/DoorMainModuleImage'
import DoorSecondModuleImage from './DoorSensorImages/DoorSecondModuleImage'
import Octicons from '@expo/vector-icons/Octicons'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function SmartDoorSensor({ device }) {
  const { theme } = useTheme()
  const axios = useAxiosPrivate()
  const [status, setStatus] = useState('Closed')
  const [lockImg, setLockImg] = useState(<></>)
  const styles = createStyleSheet(theme)

  useEffect(() => {
    setStatus(device.attributes.status)
    if (device.attributes.status === 'ON') {
      setStatus('Opened')
      setLockImg(<Feather name='unlock' size={25} color={theme.danger} />)
    } else {
      setStatus('Closed')
      setLockImg(<Feather name='lock' size={25} color={theme.safe} />)
    }
  }, [device])

  const sendToggleDirection = async () => {
    try {
      await axios.post(`/smartDoorSensor?device_id=${device.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.smartDoorSensor}>
      <View style={styles.doorStatusContainer}>
        {lockImg}
        <Text
          style={[
            styles.doorStatusText,
            { color: status === 'Opened' ? theme.danger : theme.safe },
          ]}
        >
          {status}
        </Text>
      </View>
      <View
        style={[
          styles.doorImageContainer,
          { gap: status == 'Opened' ? 50 : 0 },
        ]}
      >
        <DoorMainModuleImage color={theme.text} width={72} height={130} />
        <DoorSecondModuleImage color={theme.text} width={50} height={80} />
      </View>
      <Pressable
        style={[
          styles.doorSwitchDirectionBtn,
          {
            display:
              device.connection_type === 'wifi' &&
              device.manufacter === 'tasmota'
                ? 'flex'
                : 'none',
          },
        ]}
        onPress={sendToggleDirection}
      >
        <Octicons name='arrow-switch' size={20} color={theme.text} />
      </Pressable>
    </View>
  )
}

export default SmartDoorSensor

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    smartDoorSensor: {
      position: 'relative',
      marginVertical: 8,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 120,
      overflow: 'hidden',
      gap: 5,
    },
    doorStatusContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
      gap: 5,
    },
    doorStatusText: {
      fontSize: 24,
      fontWeight: 500,
      textTransform: 'capitalize',
      letterSpacing: 1,
    },
    doorImageContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    doorSwitchDirectionBtn: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 30,
      height: 25,
      borderWidth: 1,
      borderColor: theme.text,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}
