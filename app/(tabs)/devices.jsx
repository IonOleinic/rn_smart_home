import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useTheme from '@/hooks/useTheme'
import { useFocusEffect } from 'expo-router'
import Animated, { LinearTransition } from 'react-native-reanimated'
import Device from '@/components/DeviceComponents/Device'

const Devices = () => {
  const { colorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme)
  const [devices, setDevices] = useState([])
  const axios = useAxiosPrivate()
  const [loading, setLoading] = useState(true)
  const [toolbarExpanded, setToolbarExpanded] = useState(false)
  const [filter, setFilter] = useState({
    name: '',
    favorite: undefined,
    groups: [],
  })
  const [selectedOrder, setSelectedOrder] = useState({ name: 'Date' })

  const getDevices = async (usedFilter = filter, usedOrder = selectedOrder) => {
    try {
      const response = await axios.get(
        `/devices?filter=${JSON.stringify(usedFilter)}&order=${usedOrder?.name}`
      )
      setDevices(response.data)
      console.log('getDevices success')
    } catch (error) {
      console.log(error)
    }
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     getDevices()
  //   }, [])
  // )
  useEffect(() => {
    getDevices()
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
        paddingBottom: 64,
      }}
    >
      <View
        style={[
          styles.pageContainer,
          { paddingBottom: toolbarExpanded ? 0 : 15 },
        ]}
      >
        <View
          style={
            toolbarExpanded
              ? [styles.toolbar, styles.toolbarExpanded]
              : styles.toolbar
          }
        >
          <Pressable onPress={() => setToolbarExpanded((prev) => !prev)}>
            <Text style={{ color: theme.text }}>Toolbar</Text>
          </Pressable>
        </View>
        <Animated.FlatList
          data={devices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Device initDevice={item} />}
          contentContainerStyle={styles.devices}
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode='on-drag'
        />
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default Devices

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    pageContainer: {
      width: '100%',
      position: 'relative',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      gap: 15,
    },
    toolbar: {
      position: 'sticky',
      top: 0,
      left: 0,
      width: '100%',
      height: 68,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9,
      backgroundColor: theme.background,
    },
    toolbarExpanded: {
      position: 'absolute',
      height: '100%',
      top: 0,
    },
    devices: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      gap: 15,
      paddingHorizontal: 10,
    },
  })
}
