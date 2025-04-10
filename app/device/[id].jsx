import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const DeviceDetails = () => {
  const { id } = useLocalSearchParams()
  return (
    <View>
      <Text>DeviceDetails {id}</Text>
    </View>
  )
}

export default DeviceDetails

const styles = StyleSheet.create({})
