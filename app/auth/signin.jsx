import { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import useAxios from '@/hooks/useAxios'
import useAuth from '@/hooks/useAuth'
import { AdvancedCheckbox } from 'react-native-advanced-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useTheme from '@/hooks/useTheme'
import { StatusBar } from 'expo-status-bar'
import Message from '@/components/Messages/Message'
import { Button, TextInput } from 'react-native-paper'

const SignInScreen = () => {
  const { colorScheme, theme } = useTheme()

  const styles = createStyleSheet(theme)
  const axios = useAxios()
  const { setAuth, persist, setPersist } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [errorVisibility, setErrorVisibility] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setErrorVisibility(false)
    setValidEmail(true)
    setValidPassword(true)
  }, [email, password])

  const handleLogin = async () => {
    setLoading(true)
    setErrorVisibility(false)
    setValidEmail(true)
    setValidPassword(true)
    try {
      const response = await axios.post('/login', { email, password })
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.accessToken,
          user: response.data.user,
        }
      })
      await AsyncStorage.setItem(
        'userId',
        JSON.stringify(response.data?.user?.id)
      )
      // Navigate to the home page or main app screen
      router.replace('/')
    } catch (error) {
      setErrorVisibility(true)
      setValidEmail(false)
      setValidPassword(false)
      if (!error.response) {
        setErrorMsg('No server response!')
      }
      if (error.response?.status == 400) {
        setErrorMsg('Invalid username or password!')
      } else if (error.response?.status == 500) {
        setErrorMsg('Server Error!')
      }
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formTitle}>
          <Text style={styles.formTitleText}>Sign In</Text>
        </View>
        <TextInput
          mode='outlined'
          label='Email'
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={theme.placeholderText}
          disabled={loading}
          selectTextOnFocus={!loading}
          style={styles.textInput}
          activeOutlineColor={theme.active}
          error={!validEmail}
        />
        <TextInput
          mode='outlined'
          label='Password'
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.placeholderText}
          secureTextEntry
          disabled={loading}
          selectTextOnFocus={!loading}
          style={styles.textInput}
          activeOutlineColor={theme.active}
          error={!validPassword}
        />
        <View style={styles.checkboxContainer}>
          <AdvancedCheckbox
            value={persist}
            onValueChange={() => setPersist((prev) => !prev)}
            label='Remember me'
            labelStyle={{ color: theme.text }}
            checkedColor={theme.active}
            uncheckedColor={theme.text}
            size={20}
            style={styles.checkbox}
            disabled={loading}
          />
        </View>
        <View
          style={[
            styles.messageContainer,
            errorVisibility
              ? styles.messageContainer
              : styles.messageContainerHidden,
          ]}
        >
          <Message severity={'error'} text={errorMsg} />
        </View>
        <Button
          mode='contained'
          buttonColor={theme.active}
          style={styles.button}
          disabled={loading}
          onPress={handleLogin}
          dark={colorScheme === 'dark'}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loging in...' : 'Login'}
          </Text>
        </Button>
        <View style={styles.externalLinks}>
          <Link style={styles.link} href={'auth/forgot'}>
            Forgot password ?
          </Link>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Don't have an account?</Text>
            <Link style={styles.link} href={'auth/signup'}>
              Sign up here
            </Link>
          </View>
        </View>
      </View>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default SignInScreen

const createStyleSheet = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    form: {
      width: '100%',
      padding: 20,
      paddingHorizontal: 40,
      alignItems: 'flex-start',
      gap: 10,
    },
    formTitle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    formTitleText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: theme.text,
    },
    textInputContainer: {
      width: '100%',
      padding: 4, // creates space around inner box
      borderRadius: 10,
      borderWidth: 0,
    },
    textInput: {
      height: 50,
      width: '100%',
      borderColor: theme.text,
      color: theme.text,
    },
    checkboxContainer: {
      marginLeft: 5,
    },
    messageContainer: {
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageContainerHidden: {
      display: 'none',
    },
    button: {
      alignSelf: 'center',
      width: 150,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    externalLinks: {
      marginTop: 20,
      gap: 5,
      width: '100%',
    },
    link: {
      color: theme.link,
      fontSize: 15,
    },
    signInText: {
      color: theme.text,
      fontSize: 15,
    },
    signInContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 5,
    },
  })
}
