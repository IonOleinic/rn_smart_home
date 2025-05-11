import { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import useTheme from '@/hooks/useTheme'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

function SmartIR({ device }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const [numbersVisible, setNumbersVisible] = useState(false)

  const handlePressBtn = async (btn) => {
    try {
      await axios.post(`/smartIR?device_id=${device.id}&btn_code=${btn}`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.smartIR}>
      <View style={[styles.irBlock, styles.irBlockSection]}>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={[styles.irButton, styles.btnPow]}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_power?.code)
          }}
        >
          <MaterialCommunityIcons name='power' size={30} color={theme.text} />
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={[styles.irButton, styles.irNumber]}
          onPress={() => {
            setNumbersVisible(!numbersVisible)
          }}
        >
          <Text style={styles.text}>123</Text>
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={styles.irButton}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_exit?.code)
          }}
        >
          <Text style={styles.text}>Exit</Text>
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={styles.irButton}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_back?.code)
          }}
        >
          <AntDesign name='back' size={30} color={theme.text} />
        </TouchableRipple>
      </View>
      <View style={[styles.irBlock, styles.irBlockSection]}>
        <View style={[styles.irBlock, styles.irBlockVolCh]}>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_volUp?.code)
            }}
          >
            <MaterialCommunityIcons name='plus' size={30} color={theme.text} />
          </TouchableRipple>
          <View>
            <Text style={styles.text}>Vol</Text>
          </View>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(
                device.attributes.preset?.buttons?.btn_volDown?.code
              )
            }}
          >
            <MaterialCommunityIcons name='minus' size={30} color={theme.text} />
          </TouchableRipple>
        </View>
        <View style={[styles.irBlock, styles.irBlockOkMenu]}>
          <View style={styles.okUpContainer}>
            <TouchableRipple
              borderless={true}
              rippleColor={theme.ripple}
              style={[styles.irButton, styles.irNumber, { borderWidth: 0 }]}
              onPress={() => {
                handlePressBtn(device.attributes.preset?.buttons?.btn_up?.code)
              }}
            >
              <MaterialCommunityIcons
                name='chevron-up'
                size={30}
                color={theme.text}
              />
            </TouchableRipple>
          </View>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_left?.code)
            }}
          >
            <MaterialCommunityIcons
              name='chevron-left'
              size={30}
              color={theme.text}
            />
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_ok?.code)
            }}
          >
            <Text style={styles.text}>OK</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_right?.code)
            }}
          >
            <MaterialCommunityIcons
              name='chevron-right'
              size={30}
              color={theme.text}
            />
          </TouchableRipple>
          <View style={styles.okDownContainer}>
            <TouchableRipple
              borderless={true}
              rippleColor={theme.ripple}
              style={[styles.irButton, styles.irNumber, { borderWidth: 0 }]}
              onPress={() => {
                handlePressBtn(
                  device.attributes.preset?.buttons?.btn_down?.code
                )
              }}
            >
              <MaterialCommunityIcons
                name='chevron-down'
                size={30}
                color={theme.text}
              />
            </TouchableRipple>
          </View>
        </View>
        <View style={[styles.irBlock, styles.irBlockVolCh]}>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_chnUp?.code)
            }}
          >
            <MaterialCommunityIcons name='plus' size={30} color={theme.text} />
          </TouchableRipple>
          <View>
            <Text style={styles.text}>CH</Text>
          </View>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, { borderWidth: 0 }]}
            onPress={() => {
              handlePressBtn(
                device.attributes.preset?.buttons?.btn_chnDown?.code
              )
            }}
          >
            <MaterialCommunityIcons name='minus' size={30} color={theme.text} />
          </TouchableRipple>
        </View>
      </View>
      <View style={[styles.irBlock, styles.irBlockSection]}>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={styles.irButton}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_mute?.code)
          }}
        >
          <Ionicons name='volume-mute-outline' size={30} color={theme.text} />
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={[styles.irButton, { width: 60 }]}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_home?.code)
          }}
        >
          <Text style={styles.text}>Menu</Text>
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={styles.irButton}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_input?.code)
          }}
        >
          <MaterialIcons name='input' size={30} color={theme.text} />
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          style={styles.irButton}
          onPress={() => {
            handlePressBtn(device.attributes.preset?.buttons?.btn_info?.code)
          }}
        >
          <MaterialCommunityIcons
            name='information-outline'
            size={30}
            color={theme.text}
          />
        </TouchableRipple>
      </View>
      <View
        style={[styles.irNumbers, !numbersVisible && styles.irNumbersHidden]}
      >
        <View style={styles.irNumbersSection}>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_1?.code)
            }}
          >
            <Text style={styles.text}>1</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_2?.code)
            }}
          >
            <Text style={styles.text}>2</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_3?.code)
            }}
          >
            <Text style={styles.text}>3</Text>
          </TouchableRipple>
        </View>
        <View style={styles.irNumbersSection}>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_4?.code)
            }}
          >
            <Text style={styles.text}>4</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_5?.code)
            }}
          >
            <Text style={styles.text}>5</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_6?.code)
            }}
          >
            <Text style={styles.text}>6</Text>
          </TouchableRipple>
        </View>
        <View style={styles.irNumbersSection}>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_7?.code)
            }}
          >
            <Text style={styles.text}>7</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_8?.code)
            }}
          >
            <Text style={styles.text}>8</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_9?.code)
            }}
          >
            <Text style={styles.text}>9</Text>
          </TouchableRipple>
        </View>
        <View style={[styles.irNumbersSection, styles.irNumbersLast]}>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              handlePressBtn(device.attributes.preset?.buttons?.btn_0?.code)
            }}
          >
            <Text style={styles.text}>0</Text>
          </TouchableRipple>
          <TouchableRipple
            borderless={true}
            rippleColor={theme.ripple}
            style={[styles.irButton, styles.irNumber]}
            onPress={() => {
              setNumbersVisible(!numbersVisible)
            }}
          >
            <Text style={styles.text}>X</Text>
          </TouchableRipple>
        </View>
      </View>
    </View>
  )
}

export default SmartIR

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    text: {
      color: theme.text,
      fontWeight: 600,
      fontSize: 16,
    },
    smartIR: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      gap: 3,
    },
    irBlock: {
      display: 'flex',
      alignItems: 'center',
    },
    irBlockSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    irBlockVolCh: {
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: theme.inactive,
      borderRadius: 6,
    },
    irBlockOkMenu: {
      width: 150,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    irButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      width: 50,
      height: 50,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.inactive,
    },
    okUpContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    okDownContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    irNumbers: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      bottom: 0,
      width: '100%',
      height: '100%',
      maxHeight: 260,
      overflow: 'hidden',
      paddingHorizontal: 24,
      paddingVertical: 8,
      backgroundColor: theme.background,
    },
    irNumbersHidden: {
      maxHeight: 0,
      paddingVertical: 0,
    },
    irNumbersSection: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    irNumbersLast: {
      justifyContent: 'center',
      gap: 60,
    },
    irNumber: {
      borderRadius: '50%',
    },
  })
}
