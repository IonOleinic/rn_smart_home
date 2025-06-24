import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import useTheme from '@/hooks/useTheme'
import wheatherIcon from '@/components/SceneComponents/SceneTypeImages/wheather_scene_icon.png'
import locationIcon from '@/components/SceneComponents/SceneTypeImages/location_scene_icon.png'
import deviceSceneIcon from '@/components/SceneComponents/SceneTypeImages/device_scene_icon.png'
import scheduleIcon from '@/components/SceneComponents/SceneTypeImages/schedule_icon.png'
import { useRouter } from 'expo-router'

function AddScene() {
  const router = useRouter()
  const { theme } = useTheme()
  const styles = createStyleSheet(theme)
  return (
    <View style={styles.pageContainer}>
      <View style={styles.addScene}>
        <View style={styles.addSceneMenu}>
          <Pressable
            style={({ pressed }) => [
              styles.addSceneMenuItem,
              {
                borderColor: pressed ? theme.active : theme.text,
                backgroundColor: pressed
                  ? theme.buttonPressedBckTran
                  : theme.background,
              },
            ]}
            onPress={() => {
              router.push('/scenes/add/weather')
            }}
          >
            <Image
              source={wheatherIcon}
              alt='wheather icon scene'
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.text}>When Wheather changes</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.addSceneMenuItem,
              {
                borderColor: pressed ? theme.active : theme.text,
                backgroundColor: pressed
                  ? theme.buttonPressedBckTran
                  : theme.background,
              },
            ]}
          >
            <Image
              source={locationIcon}
              alt='location icon scene'
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.text}>When Location changes</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.addSceneMenuItem,
              {
                borderColor: pressed ? theme.active : theme.text,
                backgroundColor: pressed
                  ? theme.buttonPressedBckTran
                  : theme.background,
              },
            ]}
            onPress={() => {
              router.push('/scenes/add/deviceScene')
            }}
          >
            <Image
              source={deviceSceneIcon}
              alt='device scene'
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.text}>Device Scene</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.addSceneMenuItem,
              {
                borderColor: pressed ? theme.active : theme.text,
                backgroundColor: pressed
                  ? theme.buttonPressedBckTran
                  : theme.background,
              },
            ]}
            onPress={() => {
              router.push('/scenes/add/schedule')
            }}
          >
            <Image
              source={scheduleIcon}
              alt='schedule scene'
              style={{ width: 60, height: 60 }}
            />
            <Text style={styles.text}>Schedule</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AddScene

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    pageContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      paddingTop: 50,
    },
    text: {
      color: theme.text,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'left',
    },
    addScene: {
      alignItems: 'center',
      width: 400,
      borderRadius: 6,
      overflow: 'hidden',
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    addSceneTitle: {
      marginBottom: 25,
      alignItems: 'center',
    },
    addSceneTitleText: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
    },
    addSceneMenu: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30,
    },
    addSceneMenuItem: {
      width: '100%',
      height: 80,
      backgroundColor: theme.background,
      borderRadius: 6,
      flexDirection: 'row',
      gap: 15,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 8,
      borderWidth: 1.5,
      borderColor: theme.text,
      borderRadius: 6,
    },
    addSceneCancelBtn: {
      backgroundColor: theme.background,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      paddingVertical: 3,
      paddingHorizontal: 5,
      borderWidth: 2,
      borderColor: theme.text,
      marginTop: 15,
      gap: 5,
    },
  })
}
