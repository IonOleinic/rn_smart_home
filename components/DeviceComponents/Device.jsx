import { Image, Pressable, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import useTheme from '@/hooks/useTheme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import useDeviceIcon from '@/hooks/useDeviceIcon'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { socket } from '@/api/io'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useFinalDevice from '@/hooks/useFinalDevice'
import InactiveLayer from '../Layers/InactiveLayer'
import tasmotaLogoPng from './ManufacterImages/tasmota-logo-blue.png'
import openBekenLogoPng from './ManufacterImages/openBeken-logo.png'
import wifiLogo from './ConnectionTypeImages/wifi-logo.png'
import zigbeeLogo from './ConnectionTypeImages/zigbee-logo.png'
import bluetoothLogo from './ConnectionTypeImages/bluetooth-logo.png'
import {
  Menu,
  TouchableRipple,
  Surface,
  Text,
  Portal,
  Dialog,
  Button,
  Icon,
} from 'react-native-paper'

const Device = ({ initDevice }) => {
  const axios = useAxiosPrivate()
  const { theme } = useTheme()
  const [visibility, setVisibility] = useState(false)
  const [device, setDevice] = useState(initDevice)
  const styles = createStyleSheet(theme)
  const { deviceIcon, batteryIcon, availableIcon, favBool, favIcon } =
    useDeviceIcon(device)
  const finalDevice = useFinalDevice(device)

  const [menuVisible, setMenuVisible] = useState(false)
  const openMenu = () => setMenuVisible(true)
  const closeMenu = () => setMenuVisible(false)

  const [dialogVisible, setDialogVisible] = useState(false)
  const showDialog = () => setDialogVisible(true)
  const hideDialog = () => setDialogVisible(false)

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
        { borderColor: device.manufacter === 'tasmota' ? 'skyblue' : 'orange' },
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
                showDialog()
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
          <Image
            source={
              device.manufacter === 'tasmota'
                ? tasmotaLogoPng
                : openBekenLogoPng
            }
            style={{ width: 20, height: 20 }}
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
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={hideDialog}
            style={{ borderRadius: 12 }}
          >
            <Dialog.Title>
              <Text>Delete confirmation</Text>
            </Dialog.Title>
            <Dialog.Content>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
              >
                <Icon source='trash-can-outline' size={30} />
                <Text variant='bodyMedium'>
                  Do you want to move to trash device {device.name}?
                </Text>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode='outlined'
                textColor={theme.active}
                style={[styles.dialogButton, { borderColor: theme.active }]}
                onPress={() => {
                  hideDialog()
                }}
              >
                No
              </Button>
              <Button
                mode='outlined'
                textColor={'white'}
                style={[styles.dialogButton, { borderColor: theme.error }]}
                buttonColor={theme.error}
                onPress={() => {
                  hideDialog()
                }}
              >
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
      right: 8,
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
      marginTop: 2,
      transform: [{ rotate: '90deg' }],
    },
    deviceBatteryHidden: {
      display: 'none',
    },
    dialogButton: {
      marginHorizontal: 15,
      borderRadius: 6,
      width: 50,
    },
  })
}
