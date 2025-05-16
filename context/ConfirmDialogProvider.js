import { createContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { Button, Dialog, Icon, Portal, Text } from 'react-native-paper'
const ConfirmDialogContext = createContext({})

export const ConfirmDialogProvider = ({ children }) => {
  const [header, setHeader] = useState('')
  const [message, setMessage] = useState('')
  const [icon, setIcon] = useState('')
  const [acceptIsDanger, setAcceptIsDanger] = useState(false)
  const [onAccept, setOnAccept] = useState(null)
  const [onReject, setOnReject] = useState(null)
  const [visibility, setVisibility] = useState(false)

  const { theme } = useTheme()
  const styles = createStyleSheet(theme)

  const confirmDialog = (dialog) => {
    setVisibility(true)
    setHeader(dialog.header)
    setMessage(dialog.message)
    setIcon(dialog.icon)
    setAcceptIsDanger(dialog.acceptIsDanger)
    setOnAccept(() => () => {
      dialog.onAccept?.()
      setVisibility(false)
    })
    setOnReject(() => () => {
      dialog.onReject?.()
      setVisibility(false)
    })
  }
  return (
    <ConfirmDialogContext.Provider value={{ confirmDialog }}>
      {children}
      <Portal>
        <Dialog
          onDismiss={() => setVisibility(false)}
          visible={visibility}
          style={{ borderRadius: 12 }}
        >
          <Dialog.Title>
            <Text>{header}</Text>
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
            >
              <Icon source={icon} size={30} />
              <Text variant='bodyMedium' style={{ width: '92%' }}>
                {message}
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode='outlined'
              textColor={theme.active}
              style={[styles.dialogButton, { borderColor: theme.active }]}
              onPress={() => {
                onReject?.()
              }}
            >
              No
            </Button>
            <Button
              mode='outlined'
              textColor={'white'}
              style={[
                styles.dialogButton,
                { borderColor: acceptIsDanger ? theme.error : theme.active },
              ]}
              buttonColor={acceptIsDanger ? theme.error : theme.active}
              onPress={() => {
                onAccept?.()
              }}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ConfirmDialogContext.Provider>
  )
}

export default ConfirmDialogContext

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    dialogButton: {
      marginHorizontal: 15,
      borderRadius: 6,
      width: 50,
    },
  })
}
