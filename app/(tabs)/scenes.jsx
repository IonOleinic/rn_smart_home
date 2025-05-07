import { StyleSheet, Text, View, Pressable } from 'react-native'
import useTheme from '@/hooks/useTheme'
import { useState } from 'react'

const Scenes = () => {
  const { colorScheme, theme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [toolbarExpanded, setToolbarExpanded] = useState(false)
  const styles = createStyleSheet(theme)
  return (
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
      <View style={styles.scenes}>
        <Text style={{ color: theme.text, fontSize: 30, fontWeight: 600 }}>
          Scenes
        </Text>
      </View>
    </View>
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
    scenes: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.pageBck,
      gap: 15,
      paddingHorizontal: 10,
    },
  })
}
