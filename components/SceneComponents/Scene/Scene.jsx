import { useState, useEffect } from 'react'
import { Image, Pressable, View, StyleSheet, Text, Switch } from 'react-native'
import { Menu, Surface, TouchableRipple } from 'react-native-paper'
import wheatherIcon from '../SceneTypeImages/wheather_scene_icon.png'
import locationIcon from '../SceneTypeImages/location_scene_icon.png'
import deviceSceneIcon from '../SceneTypeImages/device_scene_icon.png'
import scheduleIcon from '../SceneTypeImages/schedule_icon.png'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useUtils from '@/hooks/useUtils'
import InactiveLayer from '@/components/Layers/InactiveLayer'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import useTheme from '@/hooks/useTheme'
import useConfirmDialog from '@/hooks/useConfirmDialog'
import DeviceScene from './DeviceScene/DeviceScene'
import WeatherScene from './WeatherScene/WeatherScene'
import Schedule from './Schedule/Schedule'

function Scene({ initScene, handleDeleteScene }) {
  const { colorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme)
  const axios = useAxiosPrivate()
  const { confirmDialog } = useConfirmDialog()
  const [menuVisible, setMenuVisible] = useState(false)
  const [favIcon, setFavIcon] = useState(<></>)
  const [favBool, setFavBool] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [scene, setScene] = useState(initScene)
  const [sceneIcon, setSceneIcon] = useState('')
  const { getDateFromStr } = useUtils()

  useEffect(() => {
    if (scene.favorite) {
      setFavIcon(<MaterialCommunityIcons name='star' size={26} color='gold' />)
      setFavBool(true)
    } else {
      setFavIcon(
        <MaterialCommunityIcons
          name='star-outline'
          size={26}
          color={theme.text}
        />
      )
      setFavBool(false)
    }
    if (scene.active) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
    switch (scene.scene_type) {
      case 'weather':
        setSceneIcon(wheatherIcon)
        break
      case 'location':
        setSceneIcon(locationIcon)
        break
      case 'deviceScene':
        setSceneIcon(deviceSceneIcon)
        break
      case 'schedule':
        setSceneIcon(scheduleIcon)
        break
      default:
        break
    }
  }, [scene])

  async function updateScene() {
    try {
      const response = await axios.put(`/scene/${scene.id}`, scene)
      if (response.data) {
        setScene(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  let finalScene = <></>
  if (scene.scene_type === 'schedule') {
    finalScene = <Schedule scene={scene} />
  } else if (scene.scene_type === 'deviceScene') {
    finalScene = <DeviceScene scene={scene} />
  } else if (scene.scene_type === 'weather') {
    finalScene = <WeatherScene scene={scene} />
  }
  return (
    <Surface key={scene.id} style={[styles.scene]} elevation={2}>
      <View style={styles.sceneTop}>
        <Pressable
          style={expanded ? { transform: [{ rotate: '180deg' }] } : {}}
          onPress={() => setExpanded((prev) => !prev)}
        >
          <MaterialIcons name='expand-more' size={30} color={theme.text} />
        </Pressable>
        <Pressable
          onPress={() => setExpanded((prev) => !prev)}
          style={styles.sceneIcon}
        >
          <Image source={sceneIcon} style={{ width: 70, height: 70 }} />
        </Pressable>
        <View style={styles.sceneInfo}>
          <Pressable onPress={() => setExpanded((prev) => !prev)}>
            <Text style={styles.sceneInfoText}>{scene.name}</Text>
          </Pressable>
          <Switch
            style={{ transform: [{ scaleX: 1.35 }, { scaleY: 1.35 }] }}
            trackColor={{ false: theme.inactive, true: theme.active }}
            thumbColor={colorScheme === 'dark' ? 'white' : 'rgb(230, 230, 230)'}
            ios_backgroundColor={theme.active}
            onValueChange={() => {
              setIsActive((prev) => !prev)
              scene.active = !isActive
              updateScene()
            }}
            value={isActive}
          />
        </View>
        <TouchableRipple
          borderless={true}
          rippleColor={theme.ripple}
          onPress={() => {
            scene.favorite = !favBool
            updateScene()
          }}
          style={styles.favIcon}
        >
          {favIcon}
        </TouchableRipple>
        <TouchableRipple
          borderless={true}
          style={[
            styles.varticalMenu,
            {
              backgroundColor: menuVisible
                ? theme.iconPressedBck
                : 'transparent',
            },
          ]}
          rippleColor={theme.ripple}
          onPress={() => setMenuVisible(true)}
        >
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <MaterialIcons name='more-vert' size={28} color={theme.text} />
            }
            style={{ marginTop: 35 }}
          >
            <Menu.Item
              leadingIcon='information-outline'
              onPress={() => setMenuVisible(false)}
              title='Info'
            />
            <Menu.Item
              leadingIcon='pencil-outline'
              onPress={() => setMenuVisible(false)}
              title='Edit'
            />
            <Menu.Item
              leadingIcon='trash-can-outline'
              onPress={() => {
                confirmDialog({
                  message: `Do you want to destroy scene ${scene.name}?`,
                  header: 'Destroy confirmation',
                  icon: 'trash-can-outline',
                  onAccept: () => {
                    handleDeleteScene(scene.id)
                  },
                  acceptIsDanger: true,
                })
                setMenuVisible(false)
              }}
              title='Delete'
            />
            <Menu.Item
              leadingIcon='cancel'
              onPress={() => setMenuVisible(false)}
              title='Cancel'
            />
          </Menu>
        </TouchableRipple>
        <View style={styles.sceneDate}>
          <Text style={styles.sceneDateText}>
            {getDateFromStr(scene.createdAt?.toString())}
          </Text>
        </View>
      </View>
      <View style={[styles.finalScene && !expanded && styles.finalSceneHidden]}>
        {finalScene}
        <InactiveLayer visibility={!scene.active} />
      </View>
    </Surface>
  )
}
const createStyleSheet = (theme) => {
  return StyleSheet.create({
    scene: {
      width: 340,
      backgroundColor: theme.background,
      borderRadius: 8,
      padding: 8,
    },
    sceneTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      position: 'relative',
      height: 110,
    },
    sceneIcon: {
      width: 70,
      height: 70,
      overflow: 'hidden',
    },
    sceneInfo: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 150,
    },
    sceneInfoText: {
      width: '100%',
      wordWrap: 'break-word',
      textAlign: 'center',
      fontSize: 20,
      color: theme.text,
      marginTop: 3,
    },
    favIcon: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
    },
    varticalMenu: {
      borderRadius: '50%',
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    sceneDate: {
      position: 'absolute',
      bottom: 0,
      left: 8,
    },
    sceneDateText: {
      color: theme.text,
      fontSize: 12,
      fontStyle: 'italic',
    },
    finalScene: {
      position: 'relative',
      maxHeight: 180,
      overflow: 'hidden',
    },
    finalSceneHidden: {
      maxHeight: 0,
      overflow: 'hidden',
    },
  })
}
export default Scene
