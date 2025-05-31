import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import useTheme from '@/hooks/useTheme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import useDeviceIcon from '@/hooks/useDeviceIcon'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { socket } from '@/api/io'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useFinalDevice from '@/hooks/useFinalDevice'
import InactiveLayer from '../Layers/InactiveLayer'
import wifiLogo from './ConnectionTypeImages/wifi-logo.png'
import zigbeeLogo from './ConnectionTypeImages/zigbee-logo.png'
import { Menu, TouchableRipple, Surface, Text } from 'react-native-paper'
import useConfirmDialog from '@/hooks/useConfirmDialog'

const Device = ({ handleDeleteDevice, initDevice, refreshDevices }) => {
  const { confirmDialog } = useConfirmDialog()
  const axios = useAxiosPrivate()
  const { theme } = useTheme()
  const [visibility, setVisibility] = useState(false)
  const [device, setDevice] = useState(initDevice)
  const styles = createStyleSheet(theme)
  const { getDeviceIcon, batteryIcon, availableIcon, favBool, favIcon } =
    useDeviceIcon(device)
  const finalDevice = useFinalDevice(device, refreshDevices)

  const [menuVisible, setMenuVisible] = useState(false)
  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)

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
    <Surface
      key={device.id}
      style={[
        styles.device,
        {
          borderColor:
            device.connection_type === 'wifi' ? theme.wifi : theme.zigbee,
        },
      ]}
      elevation={2}
    >
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
          {getDeviceIcon({ size: 75 })}
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
              style={{
                color: device.available ? theme.text : theme.inactive,
              }}
            >
              {device.group_name}
            </Text>
          </View>
        </Pressable>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          onPress={() => {
            device.favorite = !favBool
            updateDevice()
          }}
          style={styles.favIcon}
        >
          {favIcon}
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          style={[
            styles.varticalMenu,
            {
              backgroundColor: menuVisible
                ? theme.iconPressedBck
                : 'transparent',
            },
          ]}
          rippleColor={theme.ripple}
          onPress={openMenu}
        >
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <MaterialIcons name='more-vert' size={28} color={theme.text} />
            }
            style={{ marginTop: 35 }}
          >
            <Menu.Item
              leadingIcon='information-outline'
              onPress={() => {
                closeMenu()
              }}
              title='Info'
            />
            <Menu.Item
              leadingIcon='pencil-outline'
              onPress={() => {
                closeMenu()
              }}
              title='Edit'
            />

            <Menu.Item
              leadingIcon='trash-can-outline'
              onPress={() => {
                confirmDialog({
                  header: 'Delete confirmation',
                  message: `Do you want to move to trash device ${device.name}?`,
                  icon: 'trash-can-outline',
                  onAccept: () => {
                    handleDeleteDevice(device.id)
                  },
                  acceptIsDanger: true,
                })
                closeMenu()
              }}
              title='Delete'
            />
            <Menu.Item
              leadingIcon='cancel'
              onPress={() => {
                closeMenu()
              }}
              title='Cancel'
            />
          </Menu>
        </TouchableRipple>
        <View style={styles.deviceStatus}>
          <View style={styles.deviceAvailable}>
            {availableIcon}
            <Text
              style={{
                color: device.available ? theme.safe : theme.inactive,
                marginBottom: 3,
              }}
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
        <View style={styles.deviceRightIcons}>
          <Image
            source={device.connection_type === 'wifi' ? wifiLogo : zigbeeLogo}
            style={{
              width: device.connection_type === 'wifi' ? 30 : 20,
              height: 20,
            }}
          />
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
    </Surface>
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
      borderWidth: 1,
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
    deviceRightIcons: {
      position: 'absolute',
      right: 5,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    deviceDetailsBtn: {
      width: 20,
      height: 20,
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: theme.text,
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
      borderRadius: '50%',
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
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
      transform: [{ rotate: '90deg' }],
    },
    deviceBatteryHidden: {
      display: 'none',
    },
  })
}
