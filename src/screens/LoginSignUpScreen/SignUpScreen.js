import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, titles, styleButton, buttonTitle } from '../../globals/styles'
import { Icon } from 'react-native-elements'

const SignUpScreen = ({ navigation }) => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [cpasswordFocus, setcPasswordFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={titles}>Đăng ký</Text>

      <View style={styles.inputout}>
        <Icon
          type='material-community'
          name='account-outline'
          color={nameFocus === true ? colors.primary_key : colors.grey1}
          size={25} />
        <TextInput style={styles.input} placeholder='Tên'
          onFocus={() => {
            setNameFocus(true)
            setEmailFocus(false)
            setPasswordFocus(false)
            setShowPassword(false)
            setPhoneFocus(false)

          }} />
      </View>


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
            setPhoneFocus(false)
            setNameFocus(false)
            setcPasswordFocus(false)

          }} />
      </View>
      <View style={styles.inputout}>
        <Icon
          type='material-community'
          name='phone'
          color={phoneFocus === true ? colors.primary_key : colors.grey1}
          size={25} />
        <TextInput style={styles.input} placeholder='Số điện thoại'
          onFocus={() => {
            setPhoneFocus(true)
            setEmailFocus(false)
            setPasswordFocus(false)
            setcPasswordFocus(false)
            setNameFocus(false)
          }} />
      </View>

      <View style={styles.inputout}>
        <Icon
          name='lock'
          color={passwordFocus === true ? colors.primary_key : colors.grey1}
          size={25}
          type='material-community'
        />
        <TextInput style={{ ...styles.input, width: '83%' }} placeholder='Mật khẩu'
          onFocus={() => {
            setPasswordFocus(true)
            setEmailFocus(false)
            setcPasswordFocus(false)
            setPhoneFocus(false)
            setNameFocus(false)
          }
          }
          secureTextEntry={showPassword === false ? true : false}
        />
        <Icon
          name={showPassword == false ? 'visibility-off' : 'visibility'}
          color={colors.grey1}
          size={25}
          type='material'
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={styles.inputout}>
        <Icon

          name='lock-check'
          color={cpasswordFocus === true ? colors.primary_key : colors.grey1}
          size={25}
          type='material-community'
        />
        <TextInput style={{ ...styles.input, width: '83%' }} placeholder='Nhập lại mật khẩu'
          onFocus={() => {
            setcPasswordFocus(true)
            setPhoneFocus(false)
            setEmailFocus(false)
            setPasswordFocus(false)
            setNameFocus(false)
          }
          }
          secureTextEntry={showcPassword === false ? true : false}
        />
        <Icon
          name={showcPassword == false ? 'visibility-off' : 'visibility'}
          color={colors.grey1}
          size={25}
          type='material'
          onPress={() => setShowcPassword(!showcPassword)}
        />
      </View>

      <View style={styles.address}>
      
        <TextInput style={styles.inputaddress} placeholder='Bạn hãy nhập địa chỉ'
          onFocus={() => {
            setEmailFocus(true)
            setPasswordFocus(false)
            setPhoneFocus(false)
            setNameFocus(false)
            setcPasswordFocus(false)

          }} />
      </View>


      <TouchableOpacity style={styleButton}

      >
        <Text style={buttonTitle}>Đăng ký</Text>
      </TouchableOpacity>


      <View style={styles.view}>
        <Text style={styles.textOr}>OR</Text>
      </View>
{/* 
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
      </View> */}


      <TouchableOpacity style={styles.createButton}
        onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.createButtonTitle}>Đã có tài khoản</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    paddingTop: 20
    // justifyContent: "center",

  },
  inputout: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: 5,
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
    fontSize: 18,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,

  },
  address: {
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
  inputaddress: {
    fontSize: 18,
    width: '100%',
    marginLeft: 5,

  },

})