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

const useDeviceIcon = (device) => {
  const { theme } = useTheme()

  const [deviceIcon, setDeviceIcon] = useState(<></>)
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

  const getDeviceIcon = () => {
    const { device_type, sub_type, attributes } = device

    switch (device_type) {
      case 'smartSwitch':
        if (sub_type === 'plug') {
          return attributes?.nr_of_sockets === 1 ? (
            <SmartPlugIcon
              color={device.available ? theme.text : theme.inactive}
              size={75}
            />
          ) : (
            <SmartStripIcon
              color={device.available ? theme.text : theme.inactive}
              size={75}
            />
          )
        } else if (sub_type === 'switch')
          return (
            <SmartSwitchIcon
              color={device.available ? theme.text : theme.inactive}
              size={75}
            />
          )
        else if (sub_type === 'wall_switch')
          return (
            <SmartWallSwitchIcon
              color={device.available ? theme.text : theme.inactive}
              size={75}
            />
          )
        else if (sub_type === 'valve')
          return (
            <SmartValveIcon
              color={device.available ? theme.text : theme.inactive}
              size={75}
            />
          )
        break
      case 'smartIR':
        return (
          <SmartIrIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        )
      case 'smartTempSensor':
        return (
          <SmartTempSensorIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        )
      case 'smartDoorSensor':
        return (
          <SmartDoorIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        )
      case 'smartSirenAlarm':
        return (
          <SmartSirenAlarmIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        )
      case 'smartLed':
        return sub_type === 'bulb' ? (
          <SmartBulbIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        ) : (
          <SmartRGBControllerIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        )
      case 'smartMotionSensor':
        return (
          <SmartMotionIcon
            color={device.available ? theme.text : theme.inactive}
            size={75}
          />
        )
      default:
        return <></>
    }
  }

  // 🔁 Update icon states
  useEffect(() => {
    setDeviceIcon(getDeviceIcon())
  }, [device.device_type, device.available, theme])

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

  return { deviceIcon, availableIcon, batteryIcon, favIcon, favBool }
}

export default useDeviceIcon
