import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PowerBtn from './PowerBtn'
import useTheme from '@/hooks/useTheme'
import TotalPowerIcon from './SensorDataIcons/TotalPowerIcon'
import PowerIcon from './SensorDataIcons/PowerIcon'
import CurrentIcon from './SensorDataIcons/CurrentIcon'
import VoltageIcon from './SensorDataIcons/VoltageIcon'

function SmartSwitch({ device }) {
  let initStatuses = []
  let initCheckedlist = []
  let sensorPart = <></>
  let powerButtons = []
  let powerBtnSize = 100
  if (device.attributes.nr_of_sockets == 2) {
    powerBtnSize = 70
  } else if (device.attributes.nr_of_sockets == 3) {
    powerBtnSize = 65
  } else if (device.attributes.nr_of_sockets >= 4) {
    powerBtnSize = 60
  }
  if (device.attributes.power_monitor == true) {
    powerBtnSize -= 10
  }
  for (let i = 0; i < device.attributes.nr_of_sockets; i++) {
    initStatuses.push('OFF')
    initCheckedlist.push(false)
  }
  const axios = useAxiosPrivate()
  const [statusList, setStatusList] = useState(initStatuses)
  const [isCheckedList, setIsCheckedList] = useState(initCheckedlist)
  const [sensorData, setSensorData] = useState({})
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)

  useEffect(() => {
    updateStatuses(device.attributes?.power_status)
    if (device.attributes?.power_monitor == true) {
      setSensorData(device.attributes?.sensor_data)
    }
  }, [device])

  const updateStatuses = (power_status) => {
    setStatusList(power_status)
    for (let i = 0; i < power_status.length; i++) {
      if (power_status[i] === 'ON') {
        isCheckedList[i] = true
        setIsCheckedList(isCheckedList)
      } else {
        isCheckedList[i] = false
        setIsCheckedList(isCheckedList)
      }
    }
  }
  const sendChangePower = async (socketNr, pwrStatus) => {
    await axios.post(
      `/smartSwitch?status=${pwrStatus}&device_id=${device.id}&socket_nr=${
        socketNr + 1
      }`
    )
  }
  const handlePower = async (id) => {
    try {
      if (statusList[id] === 'ON') {
        sendChangePower(id, 'OFF')
      } else {
        sendChangePower(id, 'ON')
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  //init sensor part (ENERGY)
  if (device.attributes?.power_monitor == true) {
    sensorPart = (
      <View
        style={[
          styles.sensorContainer,
          {
            display: sensorData === undefined ? 'none' : 'flex',
          },
        ]}
      >
        <View
          style={[
            styles.energyToday,
            {
              display: sensorData === undefined ? 'none' : 'flex',
            },
          ]}
        >
          <Text style={styles.energyTodayText}>{sensorData.Today} kW</Text>
        </View>
        <View style={styles.sensor}>
          <View style={styles.sensorItem}>
            <VoltageIcon size={30} color={theme.text} />
            <Text style={[styles.sensorItemText, { marginLeft: 3 }]}>
              {sensorData.Voltage} V
            </Text>
          </View>
          <View style={styles.sensorItem}>
            <CurrentIcon size={30} color={theme.text} />
            <Text style={styles.sensorItemText}>{sensorData.Current} A</Text>
          </View>
          <View style={styles.sensorItem}>
            <PowerIcon size={30} color={theme.text} />
            <Text style={[styles.sensorItemText, { marginLeft: 3 }]}>
              {sensorData.Power} W
            </Text>
          </View>
          <View style={[styles.sensorItem, { width: 140 }]}>
            <TotalPowerIcon size={30} color={theme.text} />
            <Text style={styles.sensorItemText}>{sensorData.Total} kW</Text>
          </View>
        </View>
      </View>
    )
  }
  //init power buttons
  for (let i = 0; i < device.attributes?.nr_of_sockets; i++) {
    powerButtons.push(
      <PowerBtn
        key={i}
        id={i}
        size={powerBtnSize}
        isChecked={isCheckedList[i]}
        handlePower={handlePower}
      />
    )
  }
  return (
    <View style={styles.smartSwitch}>
      <View style={styles.powerButtonsContainer}>
        <View
          style={[
            styles.powerButtons,
            {
              paddingHorizontal:
                device.attributes?.nr_of_sockets == 4 ? 64 : 16,
            },
          ]}
        >
          {powerButtons}
        </View>
      </View>
      {sensorPart}
    </View>
  )
}

export default SmartSwitch

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    smartSwitch: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    powerButtonsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 140,
    },
    powerButtons: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingHorizontal: 16,
    },
    energyToday: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 190,
      height: 50,
      gap: 8,
      marginTop: -5,
      marginBottom: 5,
    },
    energyTodayText: {
      fontSize: 40,
      color: theme.text,
    },
    sensorContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sensor: {
      marginLeft: 48,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      alignItems: 'center',
    },
    sensorItem: {
      margin: 0,
      padding: 0,
      flexDirection: 'row',
      width: 112,
    },
    sensorItemText: {
      color: theme.text,
      fontSize: 20,
    },
  })
}
