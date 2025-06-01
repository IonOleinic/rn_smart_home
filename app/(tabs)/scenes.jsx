import { StyleSheet, Text, View, Pressable } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { useEffect, useState } from 'react'
import Animated, { LinearTransition } from 'react-native-reanimated'
import NoDataFound from '@/components/NoDataFound/NoDataFound'
import Scene from '@/components/SceneComponents/Scene/Scene'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useDebounce from '@/hooks/useDebounce'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import TabBarSafeAreaWrapper from '@/components/TabBar/TabBarSafeAreaWrapper'
import LoadingScreen from '@/components/Layers/LoadingScreen'

const Scenes = () => {
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  const [loading, setLoading] = useState(true)
  const selectedOrderOptions = [
    {
      name: 'Date',
      icon: (
        <MaterialCommunityIcons name='calendar' size={16} color={theme.text} />
      ),
    },
    {
      name: 'Name',
      icon: (
        <MaterialCommunityIcons
          name='sort-alphabetical-variant'
          size={16}
          color={theme.text}
        />
      ),
    },
  ]
  const selectedFavoriteOptions = [
    {
      name: 'All',
      icon: (
        <MaterialCommunityIcons
          name='star-half-full'
          size={24}
          color={theme.text}
        />
      ),
    },
    {
      name: 'Yes',
      icon: <MaterialCommunityIcons name='star' size={24} color='gold' />,
    },
    {
      name: 'No',
      icon: (
        <MaterialCommunityIcons
          name='star-outline'
          size={24}
          color={theme.text}
        />
      ),
    },
  ]
  const axios = useAxiosPrivate()
  const [scenes, setScenes] = useState([])
  const [sceneInvolvedDevices, setSceneInvolvedDevices] = useState([])
  const [selectedDevices, setSelectedDevices] = useState([])
  const [filter, setFilter] = useState({
    name: '',
    favorite: undefined,
    devices: [],
  })
  const debouncedFilterName = useDebounce(filter.name, 300)
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [filterIndicator, setFilterIndicator] = useState({
    name: false,
    favorite: false,
    devices: false,
  })
  const [addSceneVisibility, setAddSceneVisibility] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(selectedOrderOptions[0])
  const [selectedFavorite, setSelectedFavorite] = useState(
    selectedFavoriteOptions[0]
  )
  const [toolbarExpanded, setToolbarExpanded] = useState(false)

  const getScenes = async (usedFilter = filter, usedOrder = selectedOrder) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `/scenes?filter=${JSON.stringify(usedFilter)}&order=${usedOrder?.name}`
      )
      setScenes(response.data)
      console.log('getScenes success')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
  const getSceneInvolvedDevices = async () => {
    try {
      const response = await axios.get(`/devices/scene-involved`)
      setSceneInvolvedDevices(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    // getScenes()
    getSceneInvolvedDevices()
  }, [])

  useEffect(() => {
    getScenes({ ...filter, name: debouncedFilterName })
  }, [debouncedFilterName])

  const handleDeleteScene = async (sceneId) => {
    try {
      await axios.delete(`/scene/${sceneId}`)
      getScenes()
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    setFilterIndicator({
      ...filterIndicator,
      name: filter.name !== '',
      favorite: filter.favorite !== undefined,
      devices: filter.devices !== undefined && filter.devices.length !== 0,
    })

    if (
      filter.name !== '' ||
      filter.favorite !== undefined ||
      (filter.devices !== undefined && filter.devices.length !== 0)
    )
      setIsFilterActive(true)
    else setIsFilterActive(false)
  }, [filter])

  const resetFIlter = () => {
    setFilter({ ...filter, name: '', favorite: undefined, devices: [] })
    getScenes(
      {
        ...filter,
        name: '',
        favorite: undefined,
        devices: [],
      },
      selectedOrderOptions[0]
    )
    setSelectedDevices([])
    setSelectedFavorite(selectedFavoriteOptions[0])
    setSelectedOrder(selectedOrderOptions[0])
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <TabBarSafeAreaWrapper>
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
        {scenes.length > 0 ? (
          <Animated.FlatList
            data={scenes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Scene
                initScene={item}
                key={item.id}
                handleDeleteScene={handleDeleteScene}
              />
            )}
            contentContainerStyle={styles.scenes}
            itemLayoutAnimation={LinearTransition}
            keyboardDismissMode='on-drag'
          />
        ) : (
          <NoDataFound />
        )}
      </View>
    </TabBarSafeAreaWrapper>
  )
}

export default Scenes

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
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      zIndex: 9,
      backgroundColor: theme.background,
      // ✅ Elevation (Android)
      elevation: 4,
      // ✅ Shadow (iOS)
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      paddingTop: 4,
    },
    toolbarExpanded: {
      paddingBottom: 50,
      height: '100%',
    },
    scenes: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      gap: 15,
      paddingHorizontal: 10,
    },
  })
}
