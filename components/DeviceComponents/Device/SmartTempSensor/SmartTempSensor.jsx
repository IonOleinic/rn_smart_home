import { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import useTheme from '@/hooks/useTheme'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

function SmartTempSensor({ device }) {
  const { theme } = useTheme()
  const [temperature, setTemperature] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const styles = createStyleSheet(theme)
  useEffect(() => {
    setTemperature(device.attributes.temperature)
    setHumidity(device.attributes.humidity)
  }, [device])

  return (
    <View style={styles.smartTempSensor}>
      <View style={styles.tempItems}>
        <View style={styles.tempItem}>
          <View style={styles.tempItemIcon}>
            <FontAwesome6
              name='temperature-half'
              size={50}
              color={theme.danger}
            />
          </View>
          <Text style={[styles.tempItemText]}>{temperature} </Text>
          <MaterialCommunityIcons
            name='temperature-celsius'
            size={38}
            color={theme.text}
            style={{ marginTop: 2 }}
          />
        </View>
        <View style={styles.tempItem}>
          <View style={styles.tempItemIcon}>
            <MaterialCommunityIcons
              name='water-percent'
              size={60}
              color='blue'
            />
          </View>
          <Text style={[styles.tempItemText, { marginRight: 12 }]}>
            {humidity}
          </Text>
          <MaterialCommunityIcons
            name='percent-outline'
            size={36}
            color={theme.text}
            style={{
              marginTop: 5,
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default SmartTempSensor

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    smartTempSensor: {
      position: 'relative',
      width: '100%',
      minHeight: 120,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tempItems: {
      alignItems: 'flex-start',
      gap: 20,
    },
    tempItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tempItemIcon: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tempItemText: {
      fontWeight: 500,
      fontSize: 36,
      color: theme.text,
    },
  })
}
