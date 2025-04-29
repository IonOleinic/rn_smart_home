import { useEffect, useState } from 'react'
import SmartTempSensor from '@/components/DeviceComponents/SmartTempSensor/SmartTempSensor'
import SmartMotionSensor from '@/components/DeviceComponents/SmartMotionSensor/SmartMotionSensor'
import SmartDoorSensor from '@/components/DeviceComponents/SmartDoorSensor/SmartDoorSensor'
import SmartSwitch from '@/components/DeviceComponents/SmartSwitch/SmartSwitch'

function useFinalDevice(device) {
  const [finalDevice, setFinalDevice] = useState(<></>)

  useEffect(() => {
    const loadFinalDevice = async () => {
      try {
        if (device.device_type === 'smartStrip') {
          setFinalDevice(<SmartSwitch device={device} />)
        } else if (device.device_type === 'smartIR') {
          setFinalDevice(<></>)
        } else if (device.device_type === 'smartTempSensor') {
          setFinalDevice(<SmartTempSensor device={device} />)
        } else if (device.device_type === 'smartDoorSensor') {
          setFinalDevice(<SmartDoorSensor device={device} />)
        } else if (device.device_type === 'smartSirenAlarm') {
          setFinalDevice(<></>)
        } else if (device.device_type === 'smartLed') {
          setFinalDevice(<></>)
        } else if (device.device_type === 'smartMotionSensor') {
          setFinalDevice(<SmartMotionSensor device={device} />)
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
