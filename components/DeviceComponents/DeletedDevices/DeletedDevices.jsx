import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useTheme from '@/hooks/useTheme'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import {
  TouchableRipple,
  Text,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper'
import useConfirmDialog from '@/hooks/useConfirmDialog'
import { useEffect, useState } from 'react'
import FullRecycleBin from './DeletedDevicesIcons/FullRecycleBin'
import EmptyRecycleBin from './DeletedDevicesIcons/EmptyRecycleBin'
import DeletedDevice from '../DeletedDevice/DeletedDevice'
import NoDataFound from '@/components/NoDataFound/NoDataFound'

function DeletedDevices({ devices, refreshDevices }) {
  const { theme, colorScheme } = useTheme()
  const styles = createStyleSheet(theme, colorScheme)
  const { confirmDialog } = useConfirmDialog()
  const axios = useAxiosPrivate()
  const [deletedDevices, setDeletedDevices] = useState([])
  const [visibility, setVisibility] = useState(false)
  const hideDeletedDevices = () => setVisibility(false)

  const getDeletedDevices = async () => {
    try {
      const response = await axios.get(`/deleted-devices`)
      setDeletedDevices(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const destroyAll = async () => {
    try {
      const destroyList = deletedDevices.map((device) => device.id)
      await axios.delete(`/destroy-all-devices?destroyList=${destroyList}`)
      refreshDevices()
    } catch (error) {
      console.log(error)
    }
  }
  const recoverAll = async () => {
    try {
      const recoverList = deletedDevices.map((device) => device.id)
      await axios.delete(`/recover-all-devices?recoverList=${recoverList}`)
      refreshDevices()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDeletedDevices()
  }, [devices])

  useEffect(() => {
    if (deletedDevices.length == 0) {
      setTimeout(() => {
        setVisibility(false)
      }, 400)
    }
  }, [deletedDevices])

  return (
    <View style={styles.deletedDevicesContainer}>
      <Portal>
        <Dialog
          onDismiss={() => setVisibility(false)}
          visible={visibility}
          style={{ borderRadius: 12 }}
        >
          <Dialog.Title>
            <Text>Deleted Devices</Text>
          </Dialog.Title>
          <Dialog.Content>
            <View style={styles.deletedDevicesContent}>
              {deletedDevices.length > 0 ? (
                <ScrollView
                  contentContainerStyle={styles.deletedDevices}
                  scrollEnabled={true}
                  style={{ minHeight: 200, maxHeight: 300 }}
                >
                  {deletedDevices.map((device) => {
                    return (
                      <DeletedDevice
                        key={device.id}
                        device={device}
                        refreshDevices={refreshDevices}
                        confirmDialog={confirmDialog}
                        hideDeletedDevices={hideDeletedDevices}
                      />
                    )
                  })}
                </ScrollView>
              ) : (
                <NoDataFound />
              )}
              <View
                style={[
                  styles.deletedDevicesToolbar,
                  !deletedDevices.length > 0 && { display: 'none' },
                ]}
              >
                <TouchableRipple
                  rippleColor={theme.rippleActive}
                  borderless={true}
                  style={[styles.deletedDevicesToolbarItem]}
                  onPress={() => {
                    confirmDialog({
                      message:
                        deletedDevices.length === 1
                          ? `Do you want to recover device ${deletedDevices[0].name}?`
                          : `Do you want to recover ${deletedDevices.length} devices?`,
                      header: 'Recover Confirmation',
                      icon: 'undo',
                      onAccept: () => {
                        recoverAll()
                      },
                    })
                    setVisibility(false)
                  }}
                >
                  <>
                    <MaterialCommunityIcons
                      name='undo'
                      size={25}
                      color={theme.text}
                    />
                    <Text style={{ fontSize: 18 }}>Recover all</Text>
                  </>
                </TouchableRipple>
                <TouchableRipple
                  rippleColor={theme.rippleDanger}
                  borderless={true}
                  style={[
                    styles.deletedDevicesToolbarItem,
                    { borderColor: theme.danger },
                  ]}
                  onPress={() => {
                    confirmDialog({
                      message:
                        deletedDevices.length === 1
                          ? `Do you want to destroy device ${deletedDevices[0].name}?`
                          : `Do you want to destroy ${deletedDevices.length} devices?`,
                      header: 'Destroy Confirmation',
                      icon: 'trash-can-outline',
                      onAccept: () => {
                        destroyAll()
                      },
                      acceptIsDanger: true,
                    })
                    setVisibility(false)
                  }}
                >
                  <>
                    <MaterialCommunityIcons
                      name='trash-can-outline'
                      size={24}
                      color={theme.danger}
                    />
                    <Text style={{ fontSize: 18, color: theme.danger }}>
                      Destroy all
                    </Text>
                  </>
                </TouchableRipple>
              </View>
              <Button
                mode='contained'
                labelStyle={{ color: 'white' }}
                buttonColor={theme.active}
                style={styles.button}
                onPress={() => {
                  setVisibility(false)
                }}
              >
                Ok
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <TouchableRipple
        rippleColor={theme.ripple}
        borderless={true}
        style={styles.recycleBin}
        onPress={() => {
          setVisibility((prev) => !prev)
        }}
      >
        {deletedDevices.length > 0 ? (
          <FullRecycleBin size={60} color={theme.text} />
        ) : (
          <EmptyRecycleBin size={60} color={theme.text} />
        )}
      </TouchableRipple>
    </View>
  )
}

export default DeletedDevices

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({
    button: {
      width: 100,
      borderRadius: 10,
      marginTop: 20,
    },
    deletedDevicesContainer: {
      position: 'absolute',
      bottom: 85,
      right: 10,
      zIndex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deletedDevicesContent: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      minHeight: 300,
    },
    deletedDevices: {
      marginTop: 16,
      width: '100%',
      gap: 15,
      paddingBottom: 20,
    },
    deletedDevicesToolbar: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      paddingTop: 15,
      borderTopColor: theme.text,
    },
    deletedDevicesToolbarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: theme.text,
      gap: 5,
    },
    recycleBin: {
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      padding: 8,
      backgroundColor:
        colorScheme === 'dark'
          ? 'rgba(125, 125, 125,0.6)'
          : 'rgba(204, 204, 204, 0.6)',
    },
  })
}
