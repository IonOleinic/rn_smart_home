import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import useTheme from '@/hooks/useTheme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import useDeviceIcon from '@/hooks/useDeviceIcon'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { socket } from '@/api/io'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useFinalDevice from '@/hooks/useFinalDevice'
import InactiveLayer from '../Layers/InactiveLayer'

const Device = ({ initDevice }) => {
  const axios = useAxiosPrivate()
  const { theme } = useTheme()
  const [visibility, setVisibility] = useState(false)
  const [device, setDevice] = useState(initDevice)
  const styles = createStyleSheet(theme)
  const { deviceIcon, batteryIcon, availableIcon, favBool, favIcon } =
    useDeviceIcon(device)
  const finalDevice = useFinalDevice(device)

  const updateDevice = async () => {
    try {
      const response = await axios.put(`/device/${device.id}`, device)
      setDevice(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (socket) {
      const updateDeviceHandler = (data) => {
        if (data.device.mqtt_name === device.mqtt_name) {
          //there are an isssue that multiple devices of type smartIR are updating(they have same mqtt_name)
          if (data.device.device_type === 'smartIR') {
            setDevice((prev) => {
              return {
                ...prev,
                available: data.device.available,
              }
            })
          } else {
            setDevice(data.device)
          }
        }
      }
      socket.on('update_device', updateDeviceHandler)
      // Cleanup function to remove the listener when the component unmounts
      return () => {
        socket.off('update_device', updateDeviceHandler)
      }
    }
  }, [])

  return (
    <View style={styles.device}>
      <View style={styles.deviceTop}>
        <Pressable
          style={visibility ? { transform: [{ rotate: '180deg' }] } : {}}
          onPress={() => setVisibility((prev) => !prev)}
        >
          <MaterialIcons name='expand-more' size={30} color={theme.text} />
        </Pressable>
        <Pressable
          onPress={() => setVisibility((prev) => !prev)}
          style={styles.deviceIcon}
        >
          {deviceIcon}
        </Pressable>
        <Pressable
          onPress={() => setVisibility((prev) => !prev)}
          style={styles.deviceInfo}
        >
          <Text
            style={[
              styles.deviceName,
              { color: device.available ? theme.text : theme.inactive },
            ]}
          >
            {device.name}
          </Text>
          <View
            style={
              device.group_name
                ? styles.deviceGroupContainer
                : { display: 'none' }
            }
          >
            <FontAwesome
              name='cubes'
              size={14}
              color={device.available ? theme.text : theme.inactive}
            />
            <Text
              style={{ color: device.available ? theme.text : theme.inactive }}
            >
              {device.group_name}
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.favIcon,
            { backgroundColor: pressed ? theme.iconPressedBck : 'transparent' },
          ]}
          onPress={() => {
            device.favorite = !favBool
            updateDevice()
          }}
        >
          {favIcon}
        </Pressable>
        <Pressable onPress={() => {}} style={styles.varticalMenu}>
          <MaterialIcons name='more-vert' size={28} color={theme.text} />
        </Pressable>

        <View style={styles.deviceStatus}>
          <View style={styles.deviceAvailable}>
            {availableIcon}
            <Text
              style={{ color: device.available ? 'green' : theme.inactive }}
            >
              {device.available ? 'online' : 'offline'}
            </Text>
          </View>
          <View
            style={
              device.battery && device.available
                ? styles.deviceBattery
                : styles.deviceBatteryHidden
            }
          >
            {batteryIcon}
          </View>
        </View>
      </View>
      <View
        style={
          visibility
            ? styles.finalDevice
            : [styles.finalDevice, styles.finalDeviceHidden]
        }
      >
        {finalDevice}
        <InactiveLayer visibility={!device.available} />
      </View>
    </View>
  )
}

export default Device

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    device: {
      width: 340,
      minHeight: 120,
      backgroundColor: theme.background,
      padding: 8,
      borderRadius: 8,
    },
    deviceTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'relative',
      height: 110,
    },
    deviceIcon: {
      width: 75,
      height: 75,
    },
    deviceInfo: {
      width: 130,
      height: '100%',
      justifyContent: 'space-between',
    },
    deviceName: {
      color: theme.text,
      fontSize: 20,
      textAlign: 'center',
      width: '100%',
      height: 80,
    },
    deviceGroupContainer: {
      width: '100%',
      flexDirection: 'row',
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 3,
    },
    favIcon: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    },
    varticalMenu: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
    },
    finalDevice: {
      position: 'relative',
      width: '100%',
      height: 260,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
      overflow: 'hidden',
    },
    finalDeviceHidden: {
      height: 0,
    },
    deviceStatus: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    deviceAvailable: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    deviceBattery: {
      marginTop: 2,
      transform: [{ rotate: '90deg' }],
    },
    deviceBatteryHidden: {
      display: 'none',
    },
  })
}
