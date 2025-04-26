import useTheme from '@/hooks/useTheme'
import { StyleSheet, Text, View } from 'react-native'

const TabBarIcon = ({ title, icon, focused }) => {
  const { colorScheme, setColorScheme, theme } = useTheme()
  const styles = createStyleSheet(theme, colorScheme)
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
