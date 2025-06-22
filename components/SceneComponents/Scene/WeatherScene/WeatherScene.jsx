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
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

function WeatherScene({ scene }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const [execDevice, setExecDevice] = useState({})
  const execDeviceIcons = useDeviceIcon(execDevice)
  const getExecDevice = async () => {
    try {
      const response = await axios.get(`/device/${scene.exec_device_id}`)
      setExecDevice(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getExecDevice()
  }, [scene])

  return (
    <View style={styles.weatherScene}>
      <View style={styles.weatherSceneTop}>
        <View style={styles.weatherSceneItem}>
          <View style={styles.weatherSceneLocation}>
            <MaterialIcons name='location-pin' size={22} color='blue' />
            <Text style={styles.weatherSceneLocationText}>
              {`${scene?.city}, ${scene?.country}`}
            </Text>
          </View>
          <View style={styles.weatherSceneTemperature}>
            <FontAwesome6
              name='temperature-half'
              size={35}
              color={theme.danger}
            />
            <Text style={styles.weatherSceneTemperatureText}>
              {`${scene.comparison_sign} ${scene.target_temperature}`}
            </Text>
            <MaterialCommunityIcons
              name='temperature-celsius'
              size={30}
              color={theme.text}
            />
          </View>
        </View>
        <View>
          <AntDesign name='arrowright' size={30} color={theme.text} />
        </View>
        <View style={styles.weatherSceneItem}>
          <View style={styles.weatherSceneData}>
            <Text style={styles.weatherSceneDeviceName}>{execDevice.name}</Text>
            {execDeviceIcons.getDeviceIcon({ color: theme.text, size: 70 })}
            <View style={styles.weatherSceneConnectionType}>
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
          <View style={styles.weatherSceneEvent}>
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
    weatherScene: {
      position: 'relative',
      width: '100%',
      paddingVertical: 10,
      height: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weatherSceneTop: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    weatherSceneItem: {
      width: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weatherSceneData: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 100,
    },
    weatherSceneDeviceName: {
      width: 140,
      fontSize: 16,
      fontWeight: 600,
      color: theme.text,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    weatherSceneConnectionType: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    weatherSceneEvent: {
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
    weatherSceneLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    weatherSceneLocationText: {
      color: theme.text,
      fontSize: 18,
      textTransform: 'capitalize',
    },
    weatherSceneTemperature: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    weatherSceneTemperatureText: {
      color: theme.text,
      fontSize: 25,
      marginLeft: 5,
    },
  })
}
export default WeatherScene
