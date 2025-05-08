import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import useTheme from '@/hooks/useTheme'
import CustomColorPicker from '@/components/CustomColorPicker/CustomColorPicker'

function PaletteItem({ initColor, handlePaletteChange, id }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const [isClear, setIsClear] = useState(true)
  const [color, setColor] = useState('#' + initColor)
  const [pickerVisibility, setPickerVisibility] = useState(false)

  useEffect(() => {
    if (initColor) {
      setColor('#' + initColor)
      setIsClear(false)
    } else {
      setIsClear(true)
      setColor('#efab89')
    }
  }, [initColor])

  return (
    <View style={styles.paletteColoritem}>
      <Pressable
        style={styles.paletteBox}
        onPress={() => {
          setPickerVisibility(true)
        }}
      >
        <View style={[styles.paletteBoxAdd]}>
          <Feather name='plus' size={24} color={theme.text} />
        </View>
        <View
          style={[
            styles.paletteBoxColor,
            { backgroundColor: color },
            isClear && { display: 'none' },
          ]}
        />
      </Pressable>
      <CustomColorPicker
        color={color}
        onChange={(color) => {
          setColor(color.hex?.substring(0, 7))
        }}
        visibility={pickerVisibility}
        setVisibility={setPickerVisibility}
        onFinish={() => handlePaletteChange(id, color)}
        onClear={() => {
          setIsClear(true)
          handlePaletteChange(id, '')
        }}
      />
    </View>
  )
}

export default PaletteItem

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    paletteColoritem: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
    },
    paletteBox: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.text,
      borderRadius: 6,
      overflow: 'hidden',
    },
    paletteBoxAdd: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      top: 0,
      left: 0,
    },
    paletteBoxColor: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 0,
      top: 0,
      left: 0,
      zIndex: 2,
    },
  })
}
