import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, titles, styleButton, buttonTitle } from '../../globals/styles'
import { Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const LoginScreen = ({ navigation }) => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [customError, setCustomError] = useState('');

  

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setCustomError('Vui lòng nhập đúng email bạn đã đăng ký')
      return;
    }
    if (!validatePassword(password)) {
      setCustomError('Vui lòng nhập đúng mật khẩu bạn đã đăng ký')
      return;
    }
    if (!validateEmail(email) && !validatePassword(password)) {
      setCustomError('Email hoặc mật khẩu không đúng')
      return;
    }
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in successflly');
        console.log(user);
        navigation.navigate('Home')
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage === '[auth/invalid-login] An internal error has occurred. [ INVALID_LOGIN_CREDENTIALS ]') {
          setCustomError('Bạn hãy điền đúng email')
        } else {
          setCustomError('Email và mật khẩu không đúng')
        }
      })
  };
  const validateEmail = (email) => {
    const regex = /^\w+@\w+\.\w+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]{6,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      <Text style={titles}>Đăng nhập</Text>
      {customError !== '' && <Text style={styles.errormsg}>{ customError}</Text>}

      <View style={styles.inputout}>
        <Icon
          type='material-community'
          name='email-outline'
          color={emailfocus === true ? colors.primary_key : colors.grey1}
          size={25} />
        <TextInput style={styles.input} placeholder='Email'
          onFocus={() => {
            setEmailFocus(true)
            setPasswordFocus(false)
            setShowPassword(false)
            setCustomError('')
          }}
          onChangeText={(text) => { setEmail(text) }} />
      </View>
      <View style={styles.inputout}>
        <Icon

          name='lock'
          color={passwordFocus === true ? colors.primary_key : colors.grey1}
          size={25}
          type='material'
        />
        <TextInput style={{ ...styles.input, width: '83%' }} placeholder='Mật Khẩu'
          onFocus={() => {
            setEmailFocus(false)
            setPasswordFocus(true)
            setCustomError('')
          }
          }
          secureTextEntry={showPassword === false ? true : false}
          onChangeText={(text) => { setPassword(text) }}
        />
        <Icon
          name={showPassword === false ? 'visibility-off' : 'visibility'}
          color={colors.grey1}
          size={25}
          type='material'
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>


      <TouchableOpacity style={styleButton}
        onPress={() => handleLogin()}
      >
        <Text style={buttonTitle}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.view}>
        <Text style={{ ...styles.text1, textDecorationLine: 'underline' }}>Quên mật khẩu</Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.textOr}>OR</Text>
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <View style={styles.socialView}>
            <Icon
              type='material-community'
              name='google'
              size={25}
              color={'#FFC400'}
            />
            <Text style={{ marginLeft: 10 }}>Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.socialView}>
            <Icon
              type='material-community'
              name='facebook'
              size={25}
              color={"#0866FF"}
            />
            <Text style={{ marginLeft: 10 }}>Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>


      {/* <TouchableOpacity style={styles.createButton}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.createButtonTitle}>Tạo tài khoản mới</Text>
      </TouchableOpacity> */}
      <View style={styles.account}>
        <Text style={styles.textacc}>Hãy đăng ký tài khoản ở đây? </Text>
        <Text style={styles.createButtonTitle} onPress={() => navigation.navigate('SignUpScreen')}>Đăng ký</Text>
      </View>


    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",

  },
  inputout: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'center',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontSize: 18,
    width: '90%',
    marginLeft: 5,

  },
  view: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10
  },
  text1: {
    color: colors.grey3,
    fontSize: 16
  },
  textOr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey2,

  },
  socialContainer: {
    flexDirection: 'row',

  },
  socialView: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    width: 150,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createButton: {
    backgroundColor: "white",
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.button,
    height: 50,
    width: '90%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,


  },
  createButtonTitle: {
    color: colors.button,
    fontSize: 17,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,

  },
  account: {
    flexDirection: 'row',
    marginTop: 20
  },
  textacc: {

    fontSize: 18,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,
  },
  errormsg: {
    fontSize: 15,

  },


})