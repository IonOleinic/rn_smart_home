import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@/context/ThemeContext'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='device/[id]' options={{ headerShown: false }} />
          <Stack.Screen name='device/add' options={{ headerShown: false }} />
          <Stack.Screen name='scene/[id]' options={{ headerShown: false }} />
          <Stack.Screen name='scene/add' options={{ headerShown: false }} />
          <Stack.Screen name='group/[id]' options={{ headerShown: false }} />
          <Stack.Screen name='group/add' options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
