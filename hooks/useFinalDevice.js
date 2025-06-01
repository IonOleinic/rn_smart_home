import { useEffect, useState } from 'react'
import SmartTempSensor from '@/components/DeviceComponents/Device/SmartTempSensor/SmartTempSensor'
import SmartMotionSensor from '@/components/DeviceComponents/Device/SmartMotionSensor/SmartMotionSensor'
import SmartDoorSensor from '@/components/DeviceComponents/Device/SmartDoorSensor/SmartDoorSensor'
import SmartSwitch from '@/components/DeviceComponents/Device/SmartSwitch/SmartSwitch'
import SmartSirenAlarm from '@/components/DeviceComponents/Device/SmartSirenAlarm/SmartSirenAlarm'
import SmartLed from '@/components/DeviceComponents/Device/SmartLed/SmartLed'
import SmartIR from '@/components/DeviceComponents/Device/SmartIR/SmartIR'
import ZbHub from '@/components/DeviceComponents/Device/zbHub/zbHub'

function useFinalDevice(device, refreshDevices) {
  const [finalDevice, setFinalDevice] = useState(<></>)

  useEffect(() => {
    const loadFinalDevice = async () => {
      try {
        if (device.device_type === 'smartSwitch') {
          setFinalDevice(<SmartSwitch device={device} />)
        } else if (device.device_type === 'smartIR') {
          setFinalDevice(<SmartIR device={device} />)
        } else if (device.device_type === 'smartTempSensor') {
          setFinalDevice(<SmartTempSensor device={device} />)
        } else if (device.device_type === 'smartDoorSensor') {
          setFinalDevice(<SmartDoorSensor device={device} />)
        } else if (device.device_type === 'smartSirenAlarm') {
          setFinalDevice(<SmartSirenAlarm device={device} />)
        } else if (device.device_type === 'smartLed') {
          setFinalDevice(<SmartLed device={device} />)
        } else if (device.device_type === 'smartMotionSensor') {
          setFinalDevice(<SmartMotionSensor device={device} />)
        } else if (device.device_type === 'zbHub') {
          setFinalDevice(
            <ZbHub device={device} refreshDevices={refreshDevices} />
          )
        }
      } catch (error) {
        console.error(
          `Error loading final device for device with id:${device.id}`,
          error
        )
      }
    }
    loadFinalDevice()
  }, [device])

  return finalDevice
}

export default useFinalDevice
