import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View, Text, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useTheme from '@/hooks/useTheme'
import useConfirmDialog from '@/hooks/useConfirmDialog'
import { TouchableRipple } from 'react-native-paper'

function ZbHub({ device, refreshDevices }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const [connectedDevices, setConnectedDevices] = useState([])

  useEffect(() => {
    setConnectedDevices(device.attributes?.connected_devices || [])
  }, [device.attributes?.connected_devices])

  const sendChangePairingMode = async (pairingMode) => {
    try {
      await axios.post(
        `/zbHub/pairing-mode?hub_id=${device.id}&pairing_mode=${pairingMode}`
      )
    } catch (error) {
      console.error('Error changing pairing mode:', error)
    }
  }
  const handleDeleteZbDevice = async (zbDevice) => {
    try {
      const response = await axios.delete(
        `/zbHub/device?hub_id=${device.id}&short_addr=${zbDevice.Device}`
      )
      setConnectedDevices(response.data.connectedDevices || [])
      if (refreshDevices) {
        refreshDevices()
      }
    } catch (error) {
      console.error('Error deleting zb device:', error)
    }
  }

  return (
    <View style={styles.zbHub}>
      <View style={styles.zbPairContainer}>
        <View style={styles.zbPairTitle}>
          <Text style={styles.title}>Pairing mode : </Text>
          <Text
            style={[
              styles.title,
              {
                color: device.attributes.pairingMode ? theme.safe : theme.text,
              },
            ]}
          >
            {device.attributes.pairingMode ? 'enabled' : 'disabled'}
          </Text>
        </View>
        <View style={styles.zbPairBtns}>
          <TouchableRipple
            rippleColor={theme.ripple}
            borderless={true}
            style={[
              styles.zbPairBtn,
              { backgroundColor: theme.active },
              device.attributes.pairingMode && styles.zbPairBtnDisabled,
            ]}
            disabled={device.attributes.pairingMode}
            onPress={() => sendChangePairingMode(true)}
          >
            <Text style={styles.zbPairBtnText}>Start pairing</Text>
          </TouchableRipple>
          <TouchableRipple
            rippleColor={theme.ripple}
            borderless={true}
            style={[
              styles.zbPairBtn,
              { backgroundColor: theme.danger },
              !device.attributes.pairingMode && styles.zbPairBtnDisabled,
            ]}
            disabled={!device.attributes.pairingMode}
            onPress={() => sendChangePairingMode(false)}
          >
            <Text style={styles.zbPairBtnText}>Stop pairing</Text>
          </TouchableRipple>
        </View>
      </View>
      <View style={styles.zbDevicesContainer}>
        <View style={styles.zbDevicesTitle}>
          <Text style={styles.title}>
            {connectedDevices.length} connected devices
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.zbDevicesPreview}
          scrollEnabled={true}
          style={{ minHeight: 100, maxHeight: 150 }}
        >
          {connectedDevices
            ?.sort((a, b) => b.Device - a.Device)
            .map((zbDevice) => (
              <ZbDevicePreview
                key={zbDevice.Device}
                zbDevice={zbDevice}
                handleDeleteZbDevice={handleDeleteZbDevice}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  )
}

function ZbDevicePreview({ zbDevice, handleDeleteZbDevice }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const [batteryIcon, setBatteryIcon] = useState(<></>)
  const [signalIcon, setSignalIcon] = useState(<></>)
  const { confirmDialog } = useConfirmDialog()

  useEffect(() => {
    if (zbDevice.BatteryPercentage !== undefined) {
      if (zbDevice.BatteryPercentage >= 80) {
        setBatteryIcon(
          <Ionicons name='battery-full' size={20} color={theme.text} />
        )
      } else if (zbDevice.BatteryPercentage >= 30) {
        setBatteryIcon(
          <Ionicons name='battery-half' size={20} color={theme.text} />
        )
      } else {
        setBatteryIcon(
          <Ionicons name='battery-dead' size={20} color={theme.text} />
        )
      }
    } else {
      setBatteryIcon(<></>)
    }
    if (zbDevice.LinkQuality !== undefined) {
      if (zbDevice.LinkQuality >= 150) {
        setSignalIcon(
          <MaterialCommunityIcons
            name='signal-cellular-3'
            size={24}
            color={theme.text}
          />
        )
      } else if (zbDevice.LinkQuality >= 90) {
        setSignalIcon(
          <MaterialCommunityIcons
            name='signal-cellular-2'
            size={24}
            color={theme.text}
          />
        )
      } else {
        setSignalIcon(
          <MaterialCommunityIcons
            name='signal-cellular-1'
            size={24}
            color={theme.text}
          />
        )
      }
    } else {
      setSignalIcon(<></>)
    }
  }, [zbDevice])

  const toMinutes = (seconds) => {
    if (!seconds) return ' - - '
    const minutes = Math.floor(seconds / 60)
    if (minutes <= 60) {
      return minutes.toString().padStart(2, '0') + ' m'
    }
    const hours = Math.floor(minutes / 60)
    if (hours <= 24) {
      return hours.toString().padStart(2, '0') + ' h'
    }
    const days = Math.floor(hours / 24)
    if (days <= 365) {
      return days.toString().padStart(2, '0') + ' d'
    }
    const months = Math.floor(days / 30)
    if (months <= 12) {
      return months.toString().padStart(2, '0') + ' y'
    }
    const years = Math.floor(months / 12)
    if (years > 0) {
      return years.toString().padStart(2, '0') + ' y'
    }
    return '?'
  }

  return (
    <View style={styles.zbDevicePreview}>
      <View style={styles.zbDeviceInfo}>
        <Text style={styles.zbDeviceInfoText} selectable={true}>{`(${
          zbDevice.Device
        }) ${zbDevice?.Name || 'unknown'}`}</Text>
      </View>
      <View style={styles.zbDeviceSection}>{batteryIcon}</View>
      <View style={styles.zbDeviceSection}>{signalIcon}</View>
      <View style={[styles.zbDeviceSection, styles.zbDeviceLastSeen]}>
        <AntDesign name='clockcircleo' size={16} color={theme.text} />
        <Text style={[styles.text, { fontSize: 14 }]}>
          {toMinutes(zbDevice?.LastSeen)}
        </Text>
      </View>
      <Pressable
        style={styles.zbDeviceDelete}
        onPress={() => {
          confirmDialog({
            header: 'Destroy confirmation',
            message: `Do you want to destroy and unpair zigbee device (${zbDevice.Device})?`,
            icon: 'trash-can-outline',
            onAccept: () => {
              handleDeleteZbDevice(zbDevice)
            },
            acceptIsDanger: true,
          })
        }}
      >
        <MaterialCommunityIcons
          name='trash-can-outline'
          size={22}
          color={theme.danger}
        />
      </Pressable>
    </View>
  )
}

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    text: { color: theme.text },
    title: { fontSize: 18, fontWeight: 'bold', color: theme.text },
    zbHub: {
      position: 'relative',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    zbPairContainer: {
      width: '100%',
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    zbPairTitle: {
      width: '100%',
      height: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    },
    zbPairBtns: {
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    zbPairBtn: {
      width: 110,
      height: 35,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    zbPairBtnDisabled: {
      backgroundColor: theme.inactive,
    },
    zbPairBtnText: {
      color: 'white',
      fontSize: 16,
    },
    zbDevicesContainer: {
      width: '100%',
      height: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    zbDevicesTitle: {
      width: '100%',
      height: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    zbDevicesPreview: {
      width: '100%',
      minHeight: 100,
      gap: 2,
    },
    zbDevicePreview: {
      width: '100%',
      height: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    zbDeviceInfo: {
      width: 190,
      alignItems: 'center',
    },
    zbDeviceInfoText: {
      width: 190,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'left',
      fontSize: 16,
      color: theme.text,
    },
    zbDeviceSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
    },
    zbDeviceLastSeen: {
      width: 55,
      paddingLeft: 3,
      gap: 2,
      justifyContent: 'flex-start',
    },
  })
}

export default ZbHub
