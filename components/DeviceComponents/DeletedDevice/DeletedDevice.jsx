import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import useDeviceIcon from '@/hooks/useDeviceIcon'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useTheme from '@/hooks/useTheme'
import { Text, StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

function DeletedDevice({
  device,
  refreshDevices,
  confirmDialog,
  hideDeletedDevices,
}) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const { getDeviceIcon } = useDeviceIcon(device)

  const recoverDevice = async () => {
    try {
      await axios.post(`/recover-device/${device.id}`)
      if (refreshDevices) refreshDevices()
    } catch (error) {
      console.log(error)
    }
  }
  const destroyDevice = async () => {
    try {
      await axios.delete(`/destroy-device/${device.id}`)
      if (refreshDevices) refreshDevices()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.deletedDevice}>
      <View style={styles.deletedDeviceInfo}>
        <View style={styles.deletedDeviceIcon}>
          {getDeviceIcon({ size: 35, color: theme.text })}
        </View>
        <Text style={styles.deletedDeviceName}>{device.name}</Text>
      </View>
      <View style={styles.deletedDeviceBtns}>
        <TouchableRipple
          rippleColor={theme.rippleActive}
          borderless={true}
          style={[styles.deletedDeviceBtn, styles.recoverDeviceBtn]}
          onPress={() => {
            confirmDialog({
              message: `Do you want to recover device ${device.name}?`,
              header: 'Recover Confirmation',
              icon: 'undo',
              onAccept: () => {
                recoverDevice()
              },
            })
            hideDeletedDevices()
          }}
        >
          <MaterialCommunityIcons name='undo' size={25} color={theme.text} />
        </TouchableRipple>
        <TouchableRipple
          rippleColor={theme.rippleDanger}
          borderless={true}
          style={[styles.deletedDeviceBtn, styles.destroyDeviceBtn]}
          onPress={() => {
            confirmDialog({
              message: `Do you want to destroy device ${device.name}?`,
              header: 'Destroy Confirmation',
              icon: 'trash-can-outline',
              onAccept: () => {
                // destroyDevice()
              },
              acceptIsDanger: true,
            })
            hideDeletedDevices()
          }}
        >
          <MaterialCommunityIcons
            name='trash-can-outline'
            size={24}
            color={theme.danger}
          />
        </TouchableRipple>
      </View>
    </View>
  )
}

export default DeletedDevice

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    deletedDevice: {
      width: '100%',
      height: 42,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.text,
    },
    deletedDeviceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    deletedDeviceIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 35,
      height: 35,
    },
    deletedDeviceName: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 2,
      width: 150,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    deletedDeviceBtns: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      marginRight: 8,
      padding: 3,
    },
    deletedDeviceBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      padding: 5,
    },
  })
}
