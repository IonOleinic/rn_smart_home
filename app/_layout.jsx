import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider'
import { PaperProvider } from 'react-native-paper'
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <StackScreens />
          </SafeAreaProvider>
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

function StackScreens() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='device/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='device/add' options={{ headerShown: false }} />
      <Stack.Screen name='scene/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='scene/add' options={{ headerShown: false }} />
      <Stack.Screen name='group/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='group/add' options={{ headerShown: false }} />
      <Stack.Screen name='auth/signin' options={{ headerShown: false }} />
    </Stack>
  )
}
