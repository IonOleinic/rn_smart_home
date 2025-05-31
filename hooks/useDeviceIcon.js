import { useState, useEffect } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import useTheme from './useTheme'

// Device SVG Icons
import SmartIrIcon from '../components/DeviceComponents/DeviceTypeImages/SmartIRIcon'
import SmartDoorIcon from '../components/DeviceComponents/DeviceTypeImages/SmartDoorSensorIcon'
import SmartBulbIcon from '../components/DeviceComponents/DeviceTypeImages/SmartBulbIcon'
import SmartRGBControllerIcon from '../components/DeviceComponents/DeviceTypeImages/SmartRGBControllerIcon'
import SmartMotionIcon from '../components/DeviceComponents/DeviceTypeImages/SmartMotionSensorIcon'
import SmartStripIcon from '../components/DeviceComponents/DeviceTypeImages/SmartStripIcon'
import SmartPlugIcon from '../components/DeviceComponents/DeviceTypeImages/SmartPlugIcon'
import SmartSwitchIcon from '../components/DeviceComponents/DeviceTypeImages/SmartSwitchIcon'
import SmartWallSwitchIcon from '../components/DeviceComponents/DeviceTypeImages/SmartWallSwitchIcon'
import SmartTempSensorIcon from '../components/DeviceComponents/DeviceTypeImages/SmartThermometerIcon'
import SmartSirenAlarmIcon from '../components/DeviceComponents/DeviceTypeImages/SmartSirenAlarmIcon'
import SmartValveIcon from '../components/DeviceComponents/DeviceTypeImages/SmartValveIcon'
import SmartVibrationIcon from '../components/DeviceComponents/DeviceTypeImages/SmartVibrationSensorIcon'
import ZbHubIcon from '../components/DeviceComponents/DeviceTypeImages/ZbHubIcon'

const useDeviceIcon = (device) => {
  const { theme } = useTheme()

  const [availableIcon, setAvailableIcon] = useState(null)
  const [batteryIcon, setBatteryIcon] = useState(null)
  const [favIcon, setFavIcon] = useState(<></>)
  const [favBool, setFavBool] = useState(false)

  // 🔁 Icon builders
  const getAvailableIcon = () => (
    <MaterialCommunityIcons
      name={device.available ? 'access-point' : 'access-point-off'}
      size={20}
      color={device.available ? theme.safe : theme.inactive}
    />
  )

  const getBatteryIcon = () => {
    const batteryLevel = device.attributes?.battery_level
    switch (batteryLevel) {
      case 1:
        return (
          <MaterialCommunityIcons
            name='battery-20'
            size={24}
            color={theme.danger}
          />
        )
      case 2:
        return (
          <MaterialCommunityIcons
            name='battery-50'
            size={20}
            color={theme.warning}
          />
        )
      case 3:
        return (
          <MaterialCommunityIcons name='battery' size={20} color={theme.safe} />
        )
      case 4:
        return (
          <MaterialCommunityIcons
            name='battery-charging'
            size={20}
            color={theme.safe}
          />
        )
      default:
        return (
          <MaterialCommunityIcons
            name='battery-off-outline'
            size={20}
            color={theme.inactive}
          />
        )
    }
  }

  const getFavIcon = () =>
    device.favorite ? (
      <MaterialCommunityIcons name='star' size={26} color='gold' />
    ) : (
      <MaterialCommunityIcons
        name='star-outline'
        size={26}
        color={theme.text}
      />
    )

  const getDeviceIcon = (props) => {
    const { device_type, sub_type, attributes } = device

    switch (device_type) {
      case 'smartSwitch':
        if (sub_type === 'plug') {
          return attributes?.nr_of_sockets === 1 ? (
            <SmartPlugIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          ) : (
            <SmartStripIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          )
        } else if (sub_type === 'switch')
          return (
            <SmartSwitchIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          )
        else if (sub_type === 'wall_switch')
          return (
            <SmartWallSwitchIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          )
        else if (sub_type === 'valve')
          return (
            <SmartValveIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          )
        break
      case 'smartIR':
        return (
          <SmartIrIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        )
      case 'smartTempSensor':
        return (
          <SmartTempSensorIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        )
      case 'smartDoorSensor':
        return (
          <SmartDoorIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        )
      case 'smartSirenAlarm':
        return (
          <SmartSirenAlarmIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        )
      case 'smartLed':
        return sub_type === 'bulb' ? (
          <SmartBulbIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        ) : (
          <SmartRGBControllerIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        )
      case 'smartMotionSensor':
        if (device.sub_type === 'pir') {
          return (
            <SmartMotionIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          )
        } else if (device.sub_type === 'vibration') {
          return (
            <SmartVibrationIcon
              color={
                props.color || device.available ? theme.text : theme.inactive
              }
              size={props.size || 75}
            />
          )
        }
      case 'zbHub':
        return (
          <ZbHubIcon
            color={
              props.color || device.available ? theme.text : theme.inactive
            }
            size={props.size || 75}
          />
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    setAvailableIcon(getAvailableIcon())
  }, [device.available, theme])

  useEffect(() => {
    setFavIcon(getFavIcon())
    setFavBool(device.favorite)
  }, [device.favorite, theme])

  useEffect(() => {
    setBatteryIcon(getBatteryIcon())
  }, [device.attributes?.battery_level, theme])

  return { getDeviceIcon, availableIcon, batteryIcon, favIcon, favBool }
}

export default useDeviceIcon
