import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider'
import { PaperProvider } from 'react-native-paper'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
import SafeAreaWrapper from '@/components/SafeArea/SafeAreaWrapper'
import useAuth from '@/hooks/useAuth'
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaWrapper>
              <StackScreens />
            </SafeAreaWrapper>
          </SafeAreaProvider>
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

function StackScreens() {
  const { isLoggedIn } = useAuth()
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name='auth/signin' options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name='device/[id]' options={{ headerShown: false }} />
        <Stack.Screen
          name='device/add'
          options={{
            title: 'Add Device',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Device' />
            },
          }}
        />
        <Stack.Screen name='scene/[id]' options={{ headerShown: false }} />
        <Stack.Screen
          name='scene/add'
          options={{
            title: 'Add Scene',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Scene' />
            },
          }}
        />
        <Stack.Screen name='group/[id]' options={{ headerShown: false }} />
        <Stack.Screen
          name='group/add'
          options={{
            title: 'Add Group',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Group' />
            },
          }}
        />
      </Stack.Protected>
    </Stack>
  )
}
