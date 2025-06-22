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

function Schedule({ scene }) {
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
  const addZero = (i) => {
    if (i <= 9) {
      return '0' + i
    } else {
      return i
    }
  }
  return (
    <View style={styles.scheduleScene}>
      <View style={styles.scheduleSceneTop}>
        <View style={styles.scheduleSceneItem}>
          <View style={styles.scheduleSceneData}>
            <Text style={styles.scheduleSceneDeviceName}>
              {execDevice.name}
            </Text>
            {execDeviceIcons.getDeviceIcon({ color: theme.text, size: 70 })}
          </View>
        </View>
        <View>
          <AntDesign name='arrowright' size={30} color={theme.text} />
        </View>
        <View style={styles.scheduleSceneItem}>
          <View style={styles.scheduleSceneEvent}>
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
      <View style={styles.scheduleTime}>
        <View style={styles.scheduleTimeGroup}>
          <MaterialCommunityIcons
            name='clock-outline'
            size={20}
            color={theme.text}
          />
          <Text style={styles.scheduleTimeGroupText}>{`${scene.hour}:${addZero(
            Number(scene.minute)
          )}`}</Text>
          <MaterialCommunityIcons
            name='repeat-once'
            size={20}
            color={theme.danger}
            style={{
              display: scene.dayOfWeek == '' ? 'flex' : 'none',
            }}
          />
        </View>
      </View>
      <View style={styles.scheduleRepeat}>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(1) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(1)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(1)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Mon
        </Text>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(2) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(2)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(2)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Tue
        </Text>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(3) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(3)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(3)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Wed
        </Text>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(4) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(4)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(4)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Thru
        </Text>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(5) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(5)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(5)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Fri
        </Text>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(6) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(6)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(6)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Sat
        </Text>
        <Text
          style={[
            styles.scheduleRepeatText,
            {
              color: scene.dayOfWeek.includes(7) ? 'white' : theme.inactive,
              borderColor: scene.dayOfWeek.includes(7)
                ? theme.text
                : theme.inactive,
              backgroundColor: scene.dayOfWeek.includes(7)
                ? '#30b301'
                : 'transparent',
            },
          ]}
        >
          Sun
        </Text>
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
    scheduleScene: {
      position: 'relative',
      width: '100%',
      height: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scheduleSceneTop: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    scheduleSceneItem: {
      width: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scheduleSceneData: {
      position: 'relative',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 100,
    },
    scheduleSceneDeviceName: {
      width: 140,
      fontSize: 16,
      fontWeight: 600,
      color: theme.text,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    scheduleSceneConnectionType: {
      position: 'absolute',
      bottom: 0,
      right: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scheduleSceneEvent: {
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
    scheduleTime: {
      marginBottom: 5,
      width: '100%',
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scheduleTimeGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      gap: 3,
    },
    scheduleTimeGroupText: {
      color: theme.text,
      fontSize: 21,
      fontWeight: 600,
      marginBottom: 5,
    },
    scheduleRepeat: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    scheduleRepeatText: {
      width: 40,
      height: 30,
      padding: 5,
      color: theme.inactive,
      fontSize: 12,
      fontWeight: 600,
      borderWidth: 1,
      borderColor: theme.inactive,
      borderRadius: 4,
      textAlign: 'center',
    },
  })
}

export default Schedule
