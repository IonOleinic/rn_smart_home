import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Modal, Button, Portal } from 'react-native-paper'
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  HueSlider,
} from 'reanimated-color-picker'
import Feather from '@expo/vector-icons/Feather'
import useTheme from '@/hooks/useTheme'

function PaletteItem({ initColor, handlePaletteChange, id }) {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const [isClear, setIsClear] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const showModal = () => setModalVisible(true)
  const hideModal = () => setModalVisible(false)

  const [color, setColor] = useState('#' + initColor)

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
          showModal()
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
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <ColorPicker
            style={[styles.colorPicker]}
            value={color}
            onCompleteJS={(color) => {
              setIsClear(false)
              setColor(color.hex)
            }}
          >
            <Preview />
            <Panel1 />
            <HueSlider />
            <Swatches />
          </ColorPicker>
          <View style={styles.buttons}>
            <Button
              mode='contained'
              labelStyle={{ color: 'white' }}
              buttonColor={theme.active}
              style={styles.button}
              onPress={() => {
                handlePaletteChange(id, color)
                hideModal()
              }}
            >
              Ok
            </Button>
            <Button
              mode='contained'
              labelStyle={{ color: 'white' }}
              buttonColor={theme.active}
              style={[styles.button, { backgroundColor: theme.danger }]}
              onPress={() => {
                setIsClear(true)
                handlePaletteChange(id, '')
                hideModal()
              }}
            >
              Clear
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default PaletteItem

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    colorPicker: {
      width: '70%',
      gap: 30,
    },
    buttons: {
      width: '60%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 100,
    },
    button: {
      width: 100,
      borderRadius: 10,
    },
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
