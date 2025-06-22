import { StyleSheet, Text, View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useTheme from '@/hooks/useTheme'
import { useFocusEffect, useRouter } from 'expo-router'
import Animated, { LinearTransition } from 'react-native-reanimated'
import Device from '@/components/DeviceComponents/Device/Device'
import TabBarSafeAreaWrapper from '@/components/TabBar/TabBarSafeAreaWrapper'
import LoadingScreen from '@/components/Layers/LoadingScreen'
import DeletedDevices from '@/components/DeviceComponents/DeletedDevices/DeletedDevices'
import NoDataFound from '@/components/NoDataFound/NoDataFound'
import { Button, TextInput, TouchableRipple } from 'react-native-paper'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Devices = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
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
  const [devices, setDevices] = useState([])
  const axios = useAxiosPrivate()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    name: '',
    favorite: undefined,
    groups: [],
  })
  const [tempName, setTempName] = useState('')
  const [groups, setGroups] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(selectedOrderOptions[0])
  const [selectedFavorite, setSelectedFavorite] = useState(
    selectedFavoriteOptions[0]
  )
  const [toolbarExpanded, setToolbarExpanded] = useState(false)
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [filterIndicator, setFilterIndicator] = useState({
    name: false,
    favorite: false,
    groups: false,
  })
  const [orderFocus, setOrderFocus] = useState(false)
  const [favoriteFocus, setFavoriteFocus] = useState(false)
  const [groupsFocus, setGroupsFocus] = useState(false)

  const getDevices = async (usedFilter = filter, usedOrder = selectedOrder) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `/devices?filter=${JSON.stringify(usedFilter)}&order=${usedOrder?.name}`
      )
      setDevices(response.data)
      console.log('getDevices success')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getGroups = async () => {
    try {
      const response = await axios.get('/groups')
      setGroups([{ id: null, name: 'No group' }, ...response.data])
    } catch (error) {
      console.log(error.message)
    }
  }
  // useFocusEffect(
  //   useCallback(() => {
  //     getDevices()
  //   }, [])
  // )
  useEffect(() => {
    getDevices()
    getGroups()
  }, [])

  const handleDeleteDevice = async (deviceId) => {
    try {
      await axios.delete(`/device/${deviceId}`)
      getDevices()
    } catch (error) {
      console.log(error.message)
    }
  }
  const resetFilter = () => {
    setFilter({ ...filter, name: '', groups: [], favorite: undefined })
    setTempName('')
    getDevices(
      {
        ...filter,
        name: '',
        favorite: undefined,
        groups: [],
      },
      selectedOrderOptions[0]
    )
    setSelectedFavorite(selectedFavoriteOptions[0])
    setSelectedOrder(selectedOrderOptions[0])
    setSelectedGroups([])
  }
  useEffect(() => {
    setFilterIndicator({
      ...filterIndicator,
      name: filter.name !== '',
      favorite: filter.favorite !== undefined,
      groups: filter.groups !== undefined && filter.groups.length !== 0,
    })

    if (
      filter.name !== '' ||
      filter.favorite !== undefined ||
      (filter.groups !== undefined && filter.groups.length !== 0)
    )
      setIsFilterActive(true)
    else setIsFilterActive(false)
  }, [filter])

  useEffect(() => {
    setSelectedOrder(selectedOrderOptions[0])
    setSelectedFavorite(selectedFavoriteOptions[0]) // a trick to re render icon when theme is changing
  }, [theme])

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
          style={[styles.toolbar, toolbarExpanded && styles.toolbarExpanded]}
        >
          <View style={styles.toolbarSection}>
            <View style={styles.toolbarItem}>
              <TouchableRipple
                rippleColor={theme.ripple}
                borderless={true}
                style={styles.toolbarFilterBtn}
                onPress={() => setToolbarExpanded((prev) => !prev)}
              >
                <Feather name='filter' size={30} color={theme.text} />
              </TouchableRipple>
              <View
                style={[
                  styles.activeFilterIndicator,
                  !isFilterActive && { display: 'none' },
                ]}
              />
            </View>
            <View style={styles.toolbarItem}>
              <Text style={styles.toolbarLabel}>Add</Text>
              <TouchableRipple
                rippleColor={theme.ripple}
                borderless={true}
                style={styles.toolbarAddBtn}
                onPress={() => {
                  router.push('/device/add')
                }}
              >
                <MaterialCommunityIcons name='plus' size={24} color='white' />
              </TouchableRipple>
            </View>
            <View style={styles.toolbarItem}>
              <Octicons name='sort-desc' size={25} color={theme.text} />
              <Dropdown
                style={[
                  styles.dropdown,
                  { width: 130 },
                  orderFocus && { borderColor: theme.active },
                ]}
                selectedTextStyle={{ color: theme.text, marginLeft: 5 }}
                placeholder='Select...'
                placeholderStyle={{ color: theme.placeholderText }}
                data={selectedOrderOptions}
                labelField='name'
                valueField='name'
                onFocus={() => setOrderFocus(true)}
                onBlur={() => setOrderFocus(false)}
                value={selectedOrder}
                onChange={(item) => {
                  setSelectedOrder(item)
                  getDevices(filter, item)
                }}
                renderLeftIcon={() => {
                  return selectedOrder.icon
                }}
                renderItem={(item) => {
                  return (
                    <View style={styles.dropdownItem}>
                      {item.icon}
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                    </View>
                  )
                }}
              />
            </View>
          </View>
          <View style={[styles.toolbarSection, styles.filtersSection]}>
            <View style={styles.toolbarItem}>
              <Button
                mode='outlined'
                icon='refresh'
                labelStyle={{ color: theme.active }}
                style={{ borderColor: theme.active }}
                onPress={() => {
                  resetFilter()
                  setToolbarExpanded(false)
                }}
              >
                Reset
              </Button>
            </View>
            <View style={styles.toolbarItem}>
              <View
                style={[
                  styles.toolbarItemFilterIndicator,
                  !filterIndicator.name && { display: 'none' },
                ]}
              />
              <Text style={styles.toolbarLabel}>Name</Text>
              <TextInput
                mode='outlined'
                placeholder='type device name'
                value={tempName}
                onChangeText={setTempName}
                placeholderTextColor={theme.placeholderText}
                style={styles.textInput}
                activeOutlineColor={theme.active}
              />
            </View>
            <View
              style={[
                styles.toolbarItem,
                {
                  alignItems: 'flex-start',
                },
              ]}
            >
              <View
                style={[
                  styles.toolbarItemFilterIndicator,
                  !filterIndicator.groups && { display: 'none' },
                ]}
              />
              <FontAwesome
                name='cubes'
                size={20}
                color={theme.text}
                style={{ marginTop: 10 }}
              />
              <View style={styles.multiselectContainer}>
                <MultiSelect
                  style={[
                    styles.dropdown,
                    { width: 200 },
                    groupsFocus && { borderColor: theme.active },
                  ]}
                  placeholderStyle={{ color: theme.placeholderText }}
                  selectedTextStyle={{ color: theme.active }}
                  data={groups}
                  labelField='name'
                  valueField='id'
                  placeholder={
                    selectedGroups.length > 0
                      ? `${selectedGroups.length} selected`
                      : 'Select groups'
                  }
                  searchPlaceholder='Search...'
                  value={selectedGroups}
                  onFocus={() => setGroupsFocus(true)}
                  onBlur={() => setGroupsFocus(false)}
                  onChange={(item) => {
                    setSelectedGroups(item)
                    setFilter({ ...filter, groups: item })
                    getDevices({ ...filter, groups: item })
                  }}
                  selectedStyle={{
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: theme.active,
                  }}
                  renderItem={(item) => {
                    const isSelected = selectedGroups.some((groupId) => {
                      return groupId === item.id
                    })
                    return (
                      <View
                        style={[
                          styles.dropdownItem,
                          isSelected && {
                            backgroundColor: theme.active,
                          },
                        ]}
                      >
                        <MaterialIcons
                          name={
                            isSelected ? 'check-box' : 'check-box-outline-blank'
                          }
                          size={18}
                          color={isSelected ? 'white' : theme.text}
                        />
                        <Text
                          style={[
                            styles.dropdownItemText,
                            isSelected && {
                              color: 'white',
                            },
                          ]}
                        >
                          {item.name}
                        </Text>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
            <View style={styles.toolbarItem}>
              <View
                style={[
                  styles.toolbarItemFilterIndicator,
                  !filterIndicator.favorite && { display: 'none' },
                ]}
              />
              <MaterialCommunityIcons
                name='star-outline'
                size={28}
                color={theme.text}
              />
              <Dropdown
                style={[
                  styles.dropdown,
                  { width: 130 },
                  favoriteFocus && { borderColor: theme.active },
                ]}
                selectedTextStyle={{ color: theme.text, marginLeft: 5 }}
                placeholder='Favorite Filter'
                placeholderStyle={{ color: theme.placeholderText }}
                data={selectedFavoriteOptions}
                labelField='name'
                valueField='name'
                onFocus={() => setFavoriteFocus(true)}
                onBlur={() => setFavoriteFocus(false)}
                value={selectedFavorite}
                onChange={(item) => {
                  setSelectedFavorite(item)
                  setFilter({
                    ...filter,
                    favorite:
                      item.name === 'Yes'
                        ? true
                        : item.name === 'No'
                        ? false
                        : undefined,
                  })
                  getDevices({
                    ...filter,
                    favorite:
                      item.name === 'Yes'
                        ? true
                        : item.name === 'No'
                        ? false
                        : undefined,
                  })
                }}
                renderLeftIcon={() => {
                  return selectedFavorite.icon
                }}
                renderItem={(item) => {
                  return (
                    <View style={styles.dropdownItem}>
                      {item.icon}
                      <Text style={styles.dropdownItemText}>{item.name}</Text>
                    </View>
                  )
                }}
              />
            </View>
          </View>
          <View style={[styles.toolbarSection, styles.resultSection]}>
            <View style={[styles.toolbarItem, styles.toolbarItemResult]}>
              <Text style={styles.toolbarItemResultText}>
                Finded : {devices.length}{' '}
                {devices.length === 1 ? 'result' : 'results'}
              </Text>
            </View>
          </View>
          <View style={[styles.toolbarSection, styles.applyFiltersSection]}>
            <View style={[styles.toolbarItem, styles.toolbarItemRefresh]}>
              <Button
                mode='outlined'
                icon='sync'
                labelStyle={{ color: theme.active }}
                style={{ borderColor: theme.active }}
                onPress={() => {
                  getDevices()
                  setToolbarExpanded(false)
                }}
              >
                Refresh
              </Button>
            </View>
            <View style={styles.toolbarItem}>
              <Button
                mode='contained'
                labelStyle={{ color: 'white' }}
                buttonColor={theme.active}
                icon='check'
                onPress={() => {
                  if (tempName !== '') {
                    setFilter({ ...filter, name: tempName })
                    getDevices({ ...filter, name: tempName })
                  }
                  setToolbarExpanded(false)
                }}
              >
                Apply & Close
              </Button>
            </View>
          </View>
          <TouchableRipple
            rippleColor={theme.ripple}
            borderless={true}
            onPress={() => {
              setToolbarExpanded(false)
            }}
            style={styles.colapseToolbarBtn}
          >
            <Feather name='x' size={25} color={theme.text} />
          </TouchableRipple>
        </View>
        {devices.length > 0 ? (
          <Animated.FlatList
            data={devices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Device
                initDevice={item}
                handleDeleteDevice={handleDeleteDevice}
                refreshDevices={getDevices}
              />
            )}
            contentContainerStyle={styles.devices}
            itemLayoutAnimation={LinearTransition}
            keyboardDismissMode='on-drag'
          />
        ) : (
          <NoDataFound />
        )}
      </View>
      <DeletedDevices devices={devices} refreshDevices={getDevices} />
    </TabBarSafeAreaWrapper>
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
    toolbarSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    },
    filtersSection: {
      paddingHorizontal: 30,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: 500,
      gap: 50,
    },
    resultSection: {
      paddingHorizontal: 30,
      justifyContent: 'flex-start',
    },
    toolbarItemResultText: {
      color: theme.text,
      fontSize: 18,
    },
    applyFiltersSection: {
      justifySelf: 'flex-end',
    },
    toolbarItem: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
      gap: 5,
    },
    toolbarFilterBtn: {
      padding: 5,
      borderRadius: 6,
    },
    toolbarAddBtn: {
      backgroundColor: theme.active,
      width: 40,
      height: 40,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeFilterIndicator: {
      display: 'block',
      position: 'absolute',
      top: 6,
      left: 3,
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: theme.danger,
    },
    toolbarItemFilterIndicator: {
      display: 'block',
      position: 'absolute',
      top: 8,
      left: -5,
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.danger,
    },
    colapseToolbarBtn: {
      position: 'absolute',
      right: 30,
      top: 80,
      padding: 5,
      borderRadius: '50%',
    },
    toolbarLabel: {
      fontSize: 18,
      color: theme.text,
      fontWeight: '600',
    },
    dropdown: {
      borderColor: theme.inputBorder,
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 10,
      height: 45,
      backgroundColor: theme.background,
      color: theme.text,
    },
    multiselectContainer: {
      flexWrap: 'wrap',
      maxWidth: 300,
    },
    multiselect: {
      width: 150,
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
      width: 250,
      borderRadius: 6,
      height: 50,
      color: theme.text,
      fontSize: 16,
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
