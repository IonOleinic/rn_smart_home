import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider'
import { PaperProvider } from 'react-native-paper'
import CustomHeader from '@/components/CustomHeader/CustomHeader'
import SafeAreaWrapper from '@/components/SafeArea/SafeAreaWrapper'
import useAuth from '@/hooks/useAuth'
import { ConfirmDialogProvider } from '@/context/ConfirmDialogProvider'
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaWrapper>
              <ConfirmDialogProvider>
                <StackScreens />
              </ConfirmDialogProvider>
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
        <Stack.Screen name='devices/[id]' options={{ headerShown: false }} />
        <Stack.Screen
          name='devices/add'
          options={{
            title: 'Add Device',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Device' />
            },
          }}
        />
        <Stack.Screen name='scenes/[id]' options={{ headerShown: false }} />
        <Stack.Screen
          name='scenes/add'
          options={{
            title: 'Add Scene',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Scene' />
            },
          }}
        />
        <Stack.Screen name='groups/[id]' options={{ headerShown: false }} />
        <Stack.Screen
          name='groups/add'
          options={{
            title: 'Add Group',
            headerShown: true,
            header: ({ navigation }) => {
              return <CustomHeader navigation={navigation} title='Add Group' />
            },
          }}
        />
        <Stack.Screen
          name='scenes/add/weather'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='scenes/add/deviceScene'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='scenes/add/schedule'
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  )
}
