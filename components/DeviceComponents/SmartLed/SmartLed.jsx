import { Pressable, StyleSheet, View } from 'react-native'
import PaletteItem from './PaletteItem'
import { useEffect, useState } from 'react'
import useTheme from '@/hooks/useTheme'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import LedStripIcon from './Icons/LedStripIcon'
import useDebounce from '@/hooks/useDebounce'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Slider } from '@react-native-assets/slider'
import { SegmentedButtons, TouchableRipple, Text } from 'react-native-paper'
import CustomColorPicker from '@/components/CustomColorPicker/CustomColorPicker'

function SmartLed({ device }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const [currentTab, setCurrentTab] = useState(0)
  const [started, setStarted] = useState(false) //used to delay send change dimmer (change dimmer cause forced power ON)
  const [color, setColor] = useState('#000000')
  const [cold, setCold] = useState(0)
  const [warm, setWarm] = useState(0)
  const [dimmer, setDimmer] = useState(100)
  const debouncedDimmer = useDebounce(dimmer, 300)
  const [paletteSpeed, setPaletteSpeed] = useState(10)
  const debouncedPeletteSpeed = useDebounce(paletteSpeed, 300)
  const [paletteItems, setPaletteItems] = useState([])
  const [ledIcon, setLedIcon] = useState(<></>)
  const [pickerVisibility, setPickerVisibility] = useState(false)

  useEffect(() => {
    if (device.sub_type == 'ledStrip') {
      setLedIcon(
        <LedStripIcon
          size={50}
          color={device.attributes.status === 'ON' ? color : theme.inactive}
        />
      )
    } else {
      setLedIcon(
        <MaterialIcons
          name='lightbulb'
          size={50}
          color={device.attributes.status === 'ON' ? color : theme.inactive}
        />
      )
    }
  }, [device.attributes.status, color, theme])

  useEffect(() => {
    if (device.attributes.led_type?.includes('rgb')) {
      if (device.attributes.color?.substring(0, 6).toUpperCase() === 'FFFFFF') {
        setColor('#ffff00')
      } else if (device.attributes.color?.substring(0, 6) !== '000000') {
        setColor('#' + device.attributes.color?.substring(0, 6))
      }
    } else {
      setColor('#ffff00')
    }
    if (device.attributes.led_type == 'rgbw') {
      const cold_ch =
        parseInt(device.attributes.color?.substring(6, 8), 16) / 255
      setCold(cold_ch)
    }
    if (device.attributes.led_type == 'rgbcw') {
      const warm_ch = parseInt(device.attributes.color?.substring(8), 16) / 255
      setWarm(warm_ch)
    }
    setDimmer(device.attributes.dimmer)
    setPaletteSpeed(device.attributes.speed)
    setTimeout(() => {
      setStarted(true) //used to delay send change dimmer (change dimmer cause forced power ON)
    }, 1500)
  }, [device.attributes])

  useEffect(() => {
    populatePaletteItems(device.attributes.palette)
  }, [device.attributes.palette])

  const populatePaletteItems = (palette) => {
    let items = []
    for (let i = 0; i < palette.length; i++) {
      items.push(
        <PaletteItem
          key={i + palette[i].replace('#', '')}
          id={i}
          initColor={
            palette[i].length > 6 ? palette[i].substring(0, 6) : palette[i]
          }
          handlePaletteChange={handlePaletteChange}
        />
      )
    }
    setPaletteItems(items)
  }
  const sendChangeColor = async (rgbColor, cold, warm) => {
    let newColor = rgbColor.replace('#', '') + toHex(cold) + toHex(warm)
    try {
      await axios.post(
        `/SmartLed/color?device_id=${device.id}&color=${newColor}`
      )
    } catch (error) {
      console.log(error)
    }
  }
  const sendChangeDimmer = async (newValue) => {
    try {
      await axios.post(
        `/SmartLed/dimmer?device_id=${device.id}&dimmer=${newValue}`
      )
    } catch (error) {
      console.log(error)
    }
  }
  const sendChangePower = async () => {
    const newStatus = 'TOGGLE'
    try {
      await axios.post(
        `/SmartLed/power?device_id=${device.id}&status=${newStatus}`
      )
    } catch (error) {
      console.log(error)
    }
  }
  const toHex = (val) => {
    let hex = Math.round(val * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  const sendChangePalette = async (palette) => {
    try {
      await axios.post(
        `/SmartLed/palette?device_id=${device.id}&palette=${palette}`
      )
    } catch (error) {
      console.log(error)
    }
  }
  const sendChangePaletteSpeed = async () => {
    try {
      await axios.post(
        `/SmartLed/speed?device_id=${device.id}&speed=${paletteSpeed}`
      )
    } catch (error) {
      console.log(error)
    }
  }
  const sendChangeScheme = async (scheme) => {
    try {
      await axios.post(
        `/SmartLed/scheme?device_id=${device.id}&scheme=${scheme}`
      )
    } catch (error) {
      console.log(error)
    }
  }
  const handlePaletteChange = async (id, color) => {
    let temp = device.attributes.palette
    temp[id] = color.replaceAll('#', '').toUpperCase()
    sendChangePalette(temp)
  }
  useEffect(() => {
    //used to delay send change dimmer (because dimmer was changed before device init by debouncedDimmer )
    if (started) {
      sendChangeDimmer(debouncedDimmer)
    }
  }, [debouncedDimmer])

  useEffect(() => {
    //used to delay send change speed (because palette speed was changed before device init by debouncedPeletteSpeed)
    if (started) {
      sendChangePaletteSpeed(debouncedPeletteSpeed)
    }
  }, [debouncedPeletteSpeed])

  return (
    <View style={styles.smartLed}>
      <View style={styles.customTabContent}>
        {currentTab === 0 && (
          <View style={[styles.smartLedTab, styles.colorsTab]}>
            <View
              style={[
                styles.sliderItem,
                { gap: 8 },
                {
                  display: device.attributes.led_type?.includes('rgb')
                    ? 'flex'
                    : 'none',
                },
              ]}
            >
              <Text style={styles.label}>Color</Text>
              <Pressable
                style={[styles.pickerButton, { backgroundColor: color }]}
                onPress={() => setPickerVisibility(true)}
              ></Pressable>
              <CustomColorPicker
                color={color}
                onChange={(color) => {
                  sendChangeColor(color.hex?.substring(0, 7), cold, warm)
                }}
                visibility={pickerVisibility}
                setVisibility={setPickerVisibility}
              />
            </View>
            <View style={[styles.sliderItem]}>
              <Text style={styles.label}>Dimmer ({dimmer}%)</Text>
              <Slider
                style={{ width: '100%' }}
                trackHeight={5}
                thumbSize={15}
                value={dimmer}
                step={1}
                onSlidingComplete={(value) => {
                  setDimmer(value)
                }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={theme.active}
                maximumTrackTintColor={theme.inactive}
              />
              <View style={styles.sliderButtons}>
                <TouchableRipple
                  borderless={true}
                  onPress={() => {
                    let newDimmer = dimmer - 5
                    if (newDimmer < 0) {
                      newDimmer = 0
                    }
                    setDimmer(newDimmer)
                  }}
                  rippleColor={theme.ripple}
                  style={styles.sliderButton}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableRipple>
                <TouchableRipple
                  borderless={true}
                  onPress={() => {
                    setDimmer(100)
                  }}
                  rippleColor={theme.ripple}
                  style={[styles.sliderButton, { width: 70 }]}
                >
                  <Text style={[styles.sliderButtonText, { fontSize: 14 }]}>
                    Reset
                  </Text>
                </TouchableRipple>
                <TouchableRipple
                  borderless={true}
                  onPress={() => {
                    let newDimmer = dimmer + 5
                    if (newDimmer > 100) {
                      newDimmer = 100
                    }
                    setDimmer(newDimmer)
                  }}
                  rippleColor={theme.ripple}
                  style={styles.sliderButton}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableRipple>
              </View>
            </View>
            <View style={styles.bulbItem}>
              <TouchableRipple
                borderless={true}
                rippleColor={
                  device.attributes.status == 'ON' ? theme.ripple : `${color}4d`
                }
                style={[
                  styles.bulbItemIcon,
                  {
                    borderColor:
                      device.attributes.status == 'ON' ? color : theme.inactive,
                  },
                ]}
                onPress={sendChangePower}
              >
                {ledIcon}
              </TouchableRipple>
            </View>
          </View>
        )}
        {currentTab === 1 && (
          <View style={[styles.smartLedTab, styles.coldWarmTab]}>
            {device.attributes.led_type?.includes('c') ||
            device.attributes.led_type?.includes('w') ? (
              <>
                <View
                  style={[
                    styles.sliderItem,
                    {
                      display: device.attributes.led_type?.includes('c')
                        ? 'flex'
                        : 'none',
                    },
                  ]}
                >
                  <Text style={styles.label}>Cold ({~~(cold * 100)}%)</Text>
                  <Slider
                    style={{ width: '100%' }}
                    trackHeight={20}
                    thumbSize={25}
                    value={cold}
                    step={0.01}
                    onValueChange={(value) => {
                      setCold(value)
                    }}
                    onSlidingComplete={(value) => {
                      sendChangeColor(color, value, warm)
                    }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={'royalblue'}
                    maximumTrackTintColor={theme.inactive}
                  />
                  <View style={styles.sliderButtons}>
                    <TouchableRipple
                      borderless={true}
                      onPress={() => {
                        let newCold = cold - 0.05
                        if (newCold < 0) {
                          newCold = 0
                        }
                        setCold(newCold)
                        sendChangeColor(color, newCold, warm)
                      }}
                      rippleColor={theme.ripple}
                      style={styles.sliderButton}
                    >
                      <Text style={styles.sliderButtonText}>-</Text>
                    </TouchableRipple>
                    <TouchableRipple
                      borderless={true}
                      onPress={() => {
                        setCold(0)
                        sendChangeColor(color, 0, warm)
                      }}
                      rippleColor={theme.ripple}
                      style={[styles.sliderButton, { width: 70 }]}
                    >
                      <Text style={[styles.sliderButtonText, { fontSize: 14 }]}>
                        Reset
                      </Text>
                    </TouchableRipple>
                    <TouchableRipple
                      borderless={true}
                      onPress={() => {
                        let newCold = cold + 0.05
                        if (newCold > 1) {
                          newCold = 1
                        }
                        setCold(newCold)
                        sendChangeColor(color, newCold, warm)
                      }}
                      rippleColor={theme.ripple}
                      style={styles.sliderButton}
                    >
                      <Text style={styles.sliderButtonText}>+</Text>
                    </TouchableRipple>
                  </View>
                </View>
                <View
                  style={[
                    styles.sliderItem,
                    {
                      display: device.attributes.led_type?.includes('w')
                        ? 'flex'
                        : 'none',
                    },
                  ]}
                >
                  <Text style={styles.label}>Warm ({~~(warm * 100)}%)</Text>
                  <Slider
                    style={{ width: '100%' }}
                    trackHeight={20}
                    thumbSize={25}
                    value={warm}
                    step={0.01}
                    onValueChange={(value) => {
                      setWarm(value)
                    }}
                    onSlidingComplete={(value) => {
                      sendChangeColor(color, cold, value)
                    }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={'gold'}
                    maximumTrackTintColor={theme.inactive}
                  />
                  <View style={styles.sliderButtons}>
                    <TouchableRipple
                      borderless={true}
                      onPress={() => {
                        let newWarm = warm - 0.05
                        if (newWarm < 0) {
                          newWarm = 0
                        }
                        setWarm(newWarm)
                        sendChangeColor(color, cold, newWarm)
                      }}
                      rippleColor={theme.ripple}
                      style={styles.sliderButton}
                    >
                      <Text style={styles.sliderButtonText}>-</Text>
                    </TouchableRipple>
                    <TouchableRipple
                      borderless={true}
                      onPress={() => {
                        setWarm(0)
                        sendChangeColor(color, cold, 0)
                      }}
                      rippleColor={theme.ripple}
                      style={[styles.sliderButton, { width: 70 }]}
                    >
                      <Text style={[styles.sliderButtonText, { fontSize: 14 }]}>
                        Reset
                      </Text>
                    </TouchableRipple>
                    <TouchableRipple
                      borderless={true}
                      onPress={() => {
                        let newWarm = warm + 0.05
                        if (newWarm >= 1) {
                          newWarm = 1
                        }
                        setWarm(newWarm)
                        sendChangeColor(color, cold, newWarm)
                      }}
                      rippleColor={theme.ripple}
                      style={styles.sliderButton}
                    >
                      <Text style={styles.sliderButtonText}>+</Text>
                    </TouchableRipple>
                  </View>
                </View>
              </>
            ) : (
              <UnsupportedSmartLedOption
                additionalMessage={` It doesn't have Cold or Warm chanels.`}
                textColor={theme.text}
              />
            )}
          </View>
        )}
        {currentTab === 2 && (
          <View style={[styles.smartLedTab, styles.paletteTab]}>
            {device.manufacter == 'tasmota' &&
            device.attributes.led_type?.includes('rgb') ? (
              <View
                style={[
                  styles.paletteControl,
                  {
                    display: device.manufacter == 'tasmota' ? 'flex' : 'none',
                  },
                ]}
              >
                <View style={[styles.paletteControlItem, styles.paletteColors]}>
                  {paletteItems}
                </View>
                <View
                  style={[styles.paletteControlItem, styles.paletteButtons]}
                >
                  <TouchableRipple
                    borderless={true}
                    rippleColor={theme.ripple}
                    style={styles.paletteButton}
                    onPress={() => {
                      if (
                        device.attributes.scheme == '1' ||
                        device.attributes.scheme == '0'
                      ) {
                        sendChangeScheme(2)
                      }
                    }}
                  >
                    <Ionicons
                      name='play-circle-outline'
                      size={50}
                      color={
                        device.attributes.scheme == '1' ||
                        device.attributes.scheme == '0'
                          ? theme.safe
                          : theme.inactive
                      }
                    />
                  </TouchableRipple>
                  <TouchableRipple
                    borderless={true}
                    rippleColor={theme.ripple}
                    style={styles.paletteButton}
                    onPress={() => {
                      if (
                        device.attributes.scheme == '2' ||
                        device.attributes.scheme == '3'
                      ) {
                        sendChangeScheme(1)
                      }
                    }}
                  >
                    <Ionicons
                      name='stop-circle-outline'
                      size={50}
                      color={
                        device.attributes.scheme == '2' ||
                        device.attributes.scheme == '3'
                          ? theme.danger
                          : theme.inactive
                      }
                    />
                  </TouchableRipple>
                </View>
                <View style={[styles.paletteControlItem]}>
                  <Text style={styles.label}>
                    Speed ({~~(((41 - paletteSpeed) * 100) / 40)}%)
                  </Text>
                  <View
                    style={{
                      width: '100%',
                    }}
                  >
                    <Slider
                      style={{ width: '100%' }}
                      trackHeight={5}
                      thumbSize={15}
                      value={41 - paletteSpeed}
                      step={1}
                      onSlidingComplete={(value) => {
                        setPaletteSpeed(41 - value)
                      }}
                      minimumValue={1}
                      maximumValue={40}
                      minimumTrackTintColor={theme.active}
                      maximumTrackTintColor={theme.inactive}
                    />
                    <View style={styles.sliderButtons}>
                      <TouchableRipple
                        borderless={true}
                        onPress={() => {
                          let newSpeed = paletteSpeed + 1
                          if (newSpeed > 40) {
                            newSpeed = 40
                          }
                          setPaletteSpeed(newSpeed)
                        }}
                        rippleColor={theme.ripple}
                        style={styles.sliderButton}
                      >
                        <Text style={styles.sliderButtonText}>-</Text>
                      </TouchableRipple>
                      <TouchableRipple
                        borderless={true}
                        onPress={() => {
                          setPaletteSpeed(8)
                        }}
                        rippleColor={theme.ripple}
                        style={[styles.sliderButton, { width: 70 }]}
                      >
                        <Text
                          style={[styles.sliderButtonText, { fontSize: 14 }]}
                        >
                          Reset
                        </Text>
                      </TouchableRipple>
                      <TouchableRipple
                        borderless={true}
                        onPress={() => {
                          let newSpeed = paletteSpeed - 1
                          if (newSpeed < 1) {
                            newSpeed = 1
                          }
                          setPaletteSpeed(newSpeed)
                        }}
                        rippleColor={theme.ripple}
                        style={styles.sliderButton}
                      >
                        <Text style={styles.sliderButtonText}>+</Text>
                      </TouchableRipple>
                    </View>
                  </View>
                </View>
              </View>
            ) : device.manufacter == 'tasmota' ? (
              <UnsupportedSmartLedOption
                additionalMessage={` It is not a RGB one.`}
                textColor={theme.text}
              />
            ) : (
              <UnsupportedSmartLedOption
                additionalMessage={
                  ' Palette is available only for Tasmota devices.'
                }
                textColor={theme.text}
              />
            )}
          </View>
        )}
      </View>
      <SegmentedButtons
        style={styles.tabs}
        value={currentTab}
        onValueChange={setCurrentTab}
        density='medium'
        buttons={[
          {
            value: 0,
            label: 'Color',
            icon: 'format-color-fill',
            style: { borderRadius: 6 },
          },
          {
            value: 1,
            label: 'C/W',
            icon: 'white-balance-sunny',
          },
          {
            value: 2,
            label: 'Palette',
            icon: 'palette',
            style: { borderRadius: 6 },
          },
        ]}
      />
    </View>
  )
}

function UnsupportedSmartLedOption({ additionalMessage, textColor }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: '100%',
      }}
    >
      <Ionicons name='warning-outline' size={50} color='gold' />
      <Text style={{ color: textColor, fontSize: 15 }}>
        {`This option is unsupported for current device. ${additionalMessage}`}
      </Text>
    </View>
  )
}

export default SmartLed

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    pickerButton: {
      width: '100%',
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.inactive,
    },
    text: {
      color: theme.text,
    },
    label: {
      color: theme.text,
      fontWeight: 600,
    },
    smartLed: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      width: '100%',
    },
    customTabContent: {
      width: '100%',
      height: 210,
      flexDirection: 'row',
      alignItems: 'center',
    },
    smartLedTab: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    coldWarmTab: {
      paddingHorizontal: 10,
      justifyContent: 'space-around',
    },
    sliderItem: {
      width: '100%',
    },
    sliderButtons: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sliderButton: {
      borderWidth: 1,
      borderRadius: 20,
      width: 50,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.active,
    },
    sliderButtonText: {
      color: theme.active,
      fontSize: 18,
    },
    tabs: {
      marginTop: 10,
      width: '100%',
      borderRadius: 6,
    },
    activeTab: {
      backgroundColor: theme.background,
    },
    bulbItem: {
      // width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.inactive,
      borderRadius: '50%',
    },
    bulbItemIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 4,
      width: 75,
      height: 75,
      borderRadius: '50%',
    },

    paletteControl: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-around',
    },
    paletteControlItem: {
      width: '100%',
    },
    paletteColors: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paletteButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
      gap: 5,
    },
    paletteButton: {
      padding: 5,
      borderRadius: '50%',
    },
  })
}
