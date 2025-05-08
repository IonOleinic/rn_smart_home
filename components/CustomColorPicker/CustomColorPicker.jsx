import useTheme from '@/hooks/useTheme'
import { StyleSheet, View } from 'react-native'
import { Button, Modal, Portal } from 'react-native-paper'
import ColorPicker, {
  HueSlider,
  Panel1,
  Preview,
  Swatches,
} from 'reanimated-color-picker'

const CustomColorPicker = ({
  color,
  onChange,
  visibility,
  setVisibility,
  onFinish,
  onClear,
}) => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <Portal>
      <Modal
        visible={visibility}
        onDismiss={() => {
          if (onFinish) onFinish()
          setVisibility(false)
        }}
        contentContainerStyle={styles.modal}
      >
        <ColorPicker
          style={[styles.colorPicker]}
          value={color}
          onCompleteJS={onChange}
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
              if (onFinish) onFinish()
              setVisibility(false)
            }}
          >
            Ok
          </Button>
          <Button
            mode='contained'
            labelStyle={{ color: 'white' }}
            buttonColor={theme.danger}
            style={[styles.button, { display: onClear ? 'flex' : 'none' }]}
            onPress={() => {
              if (onClear) onClear()
              setVisibility(false)
            }}
          >
            Clear
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default CustomColorPicker

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
      justifyContent: 'center',
      marginTop: 60,
      gap: 30,
    },
    button: {
      width: 100,
      borderRadius: 10,
    },
  })
}
