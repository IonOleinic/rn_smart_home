import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown'
import useTheme from '@/hooks/useTheme'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useDebounce from '@/hooks/useDebounce'
import { TouchableRipple } from 'react-native-paper'

function SmartSirenAlarm({ device }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const [status, setStatus] = useState('OFF')
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [ringtone, setRingtone] = useState(0)
  const [volume, setVolume] = useState(2)
  const [soundDuration, setSoundDuration] = useState(0)
  const debouncedSoundDuration = useDebounce(soundDuration, 300)
  const [volumeMapper, setVolumeMapper] = useState([])
  const [selectedVolume, setSelectedVolume] = useState(undefined)
  const [selectedRingtone, setSelectedRingtone] = useState(undefined)
  const [volumeFocus, setVolumeFocus] = useState(false)
  const [ringtoneFocus, setRingtoneFocus] = useState(false)
  const [soundDurationFocus, setSoundDurationFocus] = useState(false)

  const ringtonesArray = []
  for (let i = 1; i <= device.attributes.nr_of_ringtones; i++) {
    ringtonesArray.push({ name: `${i}`, code: i })
  }

  useEffect(() => {
    setStatus(device.attributes.status)
    setTemperature(device.attributes.temperature)
    setHumidity(device.attributes.humidity)
    setRingtone(device.attributes.ringtone)
    setVolume(device.attributes.volume)
    setVolumeMapper(device.attributes.volume_mapper)
    setSoundDuration(device.attributes.sound_duration)
  }, [device])

  useEffect(() => {
    const findedVolume = volumeMapper.find((item) => item.code == volume)
    if (findedVolume) {
      setSelectedVolume(findedVolume)
    } else {
      setSelectedVolume(volumeMapper[0])
    }
  }, [volume, volumeMapper])

  useEffect(() => {
    const findedRingtone = ringtonesArray.find((item) => item.code == ringtone)
    if (findedRingtone) {
      setSelectedRingtone(findedRingtone)
    } else {
      setSelectedRingtone(undefined)
    }
  }, [ringtone])

  useEffect(() => {
    if (debouncedSoundDuration == 0) {
      return
    }
    updateAlarmOptions(ringtone, volume, debouncedSoundDuration)
  }, [debouncedSoundDuration])

  const sendChangePower = async (powerStatus) => {
    try {
      await axios.post(
        `/smartSirenAlarm/power?status=${powerStatus}&device_id=${device.id}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  const updateAlarmOptions = async (newRingtone, newVolume, newDuration) => {
    try {
      await axios.post(
        `/smartSirenAlarm/options?new_sound=${newRingtone}&new_volume=${newVolume}&new_duration=${newDuration}&device_id=${device.id}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.smartSiren}>
      <View
        style={[
          styles.sirenSensors,
          !device.attributes.temp_hum_sensor && styles.sirenSensorsHidden,
        ]}
      >
        <View style={styles.sirenSensorItem}>
          <FontAwesome6 name='temperature-half' size={25} color='red' />
          <Text style={[styles.sirenSensorItemText, { marginHorizontal: 2 }]}>
            {temperature}
          </Text>
          <MaterialCommunityIcons
            name='temperature-celsius'
            size={18}
            color={theme.text}
          />
        </View>
        <View style={styles.sirenSensorItem}>
          <MaterialCommunityIcons name='water-percent' size={35} color='blue' />
          <Text style={styles.sirenSensorItemText}>{humidity}</Text>
          <MaterialCommunityIcons
            name='percent-outline'
            size={20}
            color={theme.text}
          />
        </View>
      </View>
      <View style={styles.sirenControl}>
        <View style={styles.sirenOption}>
          <Text style={styles.label}>Sound Type</Text>
          <Dropdown
            style={[
              styles.dropdown,
              { width: 90 },
              ringtoneFocus && { borderColor: theme.active },
            ]}
            selectedTextStyle={{ color: theme.text, marginLeft: 5 }}
            data={ringtonesArray}
            labelField='name'
            valueField='code'
            placeholder='Select'
            onFocus={() => setRingtoneFocus(true)}
            onBlur={() => setRingtoneFocus(false)}
            value={selectedRingtone}
            onChange={(item) => {
              updateAlarmOptions(
                item.code,
                selectedVolume.code,
                debouncedSoundDuration
              )
            }}
            renderLeftIcon={() => (
              <Feather name='music' size={16} color={theme.text} />
            )}
            renderItem={(item) => {
              return (
                <View style={styles.dropdownItem}>
                  <Feather name='music' size={16} color={theme.text} />
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </View>
              )
            }}
          />
        </View>
        <TouchableRipple
          borderless={true}
          rippleColor={
            status == 'ON' ? theme.ripplePwrBtnOff : theme.ripplePwrBtnOn
          }
          style={[styles.sirenBtn, status == 'ON' && styles.sirenActive]}
          onPress={() => sendChangePower('TOGGLE')}
        >
          <>
            <SimpleLineIcons
              name={status == 'ON' ? 'volume-2' : 'volume-off'}
              size={40}
              color={status == 'ON' ? theme.active : theme.text}
            />
            <Text
              style={[
                styles.sirenBtnInfo,
                { borderTopColor: status == 'ON' ? theme.active : theme.text },
                { color: status == 'ON' ? theme.active : theme.text },
              ]}
            >
              Tap To Toggle
            </Text>
          </>
        </TouchableRipple>
        <View style={styles.sirenOption}>
          <Text style={styles.label}>{'Duration (s)'}</Text>
          <TextInput
            style={[
              styles.textInput,
              soundDurationFocus && { borderColor: theme.active },
            ]}
            value={soundDuration.toString()}
            placeholderTextColor={theme.placeholderText}
            keyboardType='numeric'
            onFocus={() => setSoundDurationFocus(true)}
            onBlur={() => setSoundDurationFocus(false)}
            onChangeText={setSoundDuration}
          />
        </View>
      </View>
      <View style={styles.sirenVolume}>
        <Text style={styles.label}>Volume</Text>
        <Dropdown
          style={[
            styles.dropdown,
            { width: 130 },
            volumeFocus && { borderColor: theme.active },
          ]}
          selectedTextStyle={{ color: theme.text, marginLeft: 5 }}
          placeholder='Select...'
          placeholderStyle={{ color: theme.text }}
          data={volumeMapper}
          labelField='name'
          valueField='code'
          onFocus={() => setVolumeFocus(true)}
          onBlur={() => setVolumeFocus(false)}
          value={selectedVolume}
          onChange={(item) => {
            updateAlarmOptions(ringtone, item?.code, debouncedSoundDuration)
          }}
          renderLeftIcon={() => {
            return (
              <SimpleLineIcons
                name={
                  selectedVolume?.name === 'mute' ? 'volume-off' : 'volume-2'
                }
                size={16}
                color={theme.text}
              />
            )
          }}
          renderItem={(item) => {
            return (
              <View style={styles.dropdownItem}>
                <SimpleLineIcons
                  name={item.name === 'mute' ? 'volume-off' : 'volume-2'}
                  size={16}
                  color={theme.text}
                />
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

export default SmartSirenAlarm

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    dropdown: {
      borderColor: theme.inputBorder,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 10,
      height: 45,
      backgroundColor: theme.background,
      color: theme.text,
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: theme.background,
      borderBottomWidth: 0.6,
      borderBottomColor: theme.inputBorder,
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    dropdownItemText: {
      color: theme.text,
      fontSize: 16,
    },
    textInput: {
      width: 90,
      borderColor: theme.inputBorder,
      borderWidth: 1,
      borderRadius: 6,
      paddingLeft: 10,
      height: 45,
      color: theme.text,
      fontSize: 16,
    },
    label: {
      color: theme.text,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    smartSiren: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 160,
      position: 'relative',
      height: '100%',
    },
    sirenSensors: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      gap: 15,
      height: 40,
    },
    sirenSensorsHidden: {
      display: 'none',
    },
    sirenSensorItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 35,
    },
    sirenSensorItemText: {
      fontSize: 18,
      color: theme.text,
    },
    sirenControl: {
      width: '100%',
      height: 130,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sirenOption: {
      width: 100,
      maxHeight: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    sirenVolume: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    sirenBtn: {
      width: 115,
      height: 115,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.text,
      borderRadius: '50%',
      backgroundColor: 'transparent',
    },
    sirenBtnInfo: {
      borderTopWidth: 2,
      color: theme.text,
      paddingTop: 4,
      marginTop: 8,
      fontSize: 12,
      textAlign: 'center',
    },
    sirenActive: {
      borderColor: theme.active,
      color: theme.active,
    },
  })
}
