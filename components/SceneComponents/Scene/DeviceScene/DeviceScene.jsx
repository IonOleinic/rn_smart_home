import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import useDeviceIcon from '@/hooks/useDeviceIcon'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useTheme from '@/hooks/useTheme'
import zigbeeLogo from '@/components/DeviceComponents/ConnectionTypeImages/zigbee-logo.png'
import wifiLogo from '@/components/DeviceComponents/ConnectionTypeImages/wifi-logo.png'

function DeviceScene({ scene }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const [condDevice, setCondDevice] = useState({})
  const [execDevice, setExecDevice] = useState({})
  const condDeviceIcons = useDeviceIcon(condDevice)
  const execDeviceIcons = useDeviceIcon(execDevice)

  const getCondDevice = async () => {
    try {
      const response = await axios.get(`/device/${scene.cond_device_id}`)
      setCondDevice(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getExecDevice = async () => {
    try {
      const response = await axios.get(`/device/${scene.exec_device_id}`)
      setExecDevice(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getCondDevice()
    getExecDevice()
  }, [scene])

  return (
    <View style={styles.deviceScene}>
      <View style={styles.deviceSceneTop}>
        <View style={styles.deviceSceneItem}>
          <View style={styles.deviceSceneData}>
            <Text style={styles.deviceSceneDeviceName}>{condDevice.name}</Text>
            {condDeviceIcons.getDeviceIcon({ color: theme.text, size: 70 })}
            <View style={styles.deviceSceneConnectionType}>
              {condDevice.connection_type && (
                <Image
                  source={
                    condDevice.connection_type === 'zigbee'
                      ? zigbeeLogo
                      : wifiLogo
                  }
                  style={{
                    width: condDevice.connection_type === 'wifi' ? 30 : 20,
                    height: 20,
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.deviceSceneEvent}>
            <MaterialIcons
              name='pending-actions'
              size={22}
              color={theme.text}
            />
            <Text style={styles.text}>{scene.conditional_text}</Text>
          </View>
        </View>
        <View>
          <AntDesign name='arrowright' size={30} color={theme.text} />
        </View>
        <View style={styles.deviceSceneItem}>
          <View style={styles.deviceSceneData}>
            <Text style={styles.deviceSceneDeviceName}>{execDevice.name}</Text>
            {execDeviceIcons.getDeviceIcon({ color: theme.text, size: 70 })}
            <View style={styles.deviceSceneConnectionType}>
              {execDevice.connection_type && (
                <Image
                  source={
                    execDevice.connection_type === 'zigbee'
                      ? zigbeeLogo
                      : wifiLogo
                  }
                  style={{
                    width: execDevice.connection_type === 'wifi' ? 30 : 20,
                    height: 20,
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.deviceSceneEvent}>
            <MaterialCommunityIcons
              name='connection'
              size={20}
              color={theme.text}
            />
            {scene.executable_text.includes('Color') ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Text style={styles.text}>{'Color'}</Text>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    borderWidth:
                      scene.executable_text.split(' ')[1] == 'ffffff' ? 1 : 0,
                    borderColor: theme.text,
                    backgroundColor: `#${scene.executable_text.split(' ')[1]}`,
                  }}
                ></View>
              </View>
            ) : (
              <Text style={styles.text}>{scene.executable_text}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
const createStyleSheet = (theme) => {
  return StyleSheet.create({
    text: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 600,
    },
    deviceScene: {
      position: 'relative',
      width: '100%',
      paddingVertical: 10,
      height: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deviceSceneTop: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    deviceSceneItem: {
      width: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deviceSceneData: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 100,
    },
    deviceSceneDeviceName: {
      width: 140,
      fontSize: 16,
      fontWeight: 600,
      color: theme.text,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    deviceSceneConnectionType: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deviceSceneEvent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      padding: 3,
      height: 30,
      marginTop: 8,
      borderWidth: 1,
      borderColor: theme.text,
      borderRadius: 4,
    },
  })
}
export default DeviceScene
