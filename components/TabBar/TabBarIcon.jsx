import { StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

const TabBarIcon = ({ title, icon, focused }) => {
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const styles = createStyleSheet(theme, colorScheme)
  if (title === 'Add') {
    return (
      <View
        style={[
          styles.tabBarIcon,
          styles.tabBarIconAdd,
          focused ? styles.tabBarIconFocused : {},
        ]}
      >
        {icon}
      </View>
    )
  }
  if (focused) {
    return (
      <View style={[styles.tabBarIcon, styles.tabBarIconFocused]}>
        {icon}
        <Text style={[styles.tabBarIconText, styles.tabBarIconFocusedText]}>
          {title}
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.tabBarIcon}>
      {icon}
      <Text style={styles.tabBarIconText}>{title}</Text>
    </View>
  )
}

export default TabBarIcon

const createStyleSheet = (theme, colorScheme) => {
  return StyleSheet.create({
    tabBarIcon: {
      backgroundColor: 'transparent',
      width: 75,
      height: 54,
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },
    tabBarIconFocused: {
      backgroundColor: theme.active,
    },
    tabBarIconAdd: {
      backgroundColor: theme.tabBarBackground,
      borderRadius: '50%',
      width: 70,
      height: 70,
      borderWidth: 7,
      borderColor: theme.background,
    },
    tabBarIconFocusedText: {
      color: 'white',
    },
    tabBarIconText: {
      color: theme.text,
      fontSize: 12,
      fontWeight: 'bold',
    },
  })
}
