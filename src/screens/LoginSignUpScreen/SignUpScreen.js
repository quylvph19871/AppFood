import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, titles, styleButton, buttonTitle } from '../../globals/styles'
import { Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'



const SignUpScreen = ({ navigation }) => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [cpasswordFocus, setcPasswordFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [customError, setCustomError] = useState('');
  const [successmsg, setSuccessmsg] = useState(null);
 


  const handleSignup = () => {
    const formData = {
      email: email,
      password: password,
      // cpassword : cpassword,
      name: name,
      phone: phone,
      address: address
    }

    const phoneRegex = /^\d{10}$/;

    if (name.trim().length == 0) {
      setCustomError("Vui lòng nhập tên")
      return;
    } else if (password != cpassword) {
      setCustomError("Mật khẩu xác nhận sai")
      return;
    } else if (!phoneRegex.test(phone)) {
      setCustomError("Hãy nhập đúng số 10 kí tự")
      return;
    }

    try {
      auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('user created');
          setSuccessmsg('Bạn đã tạo tài khoản thành công');
          const userRef = firestore().collection('UserData');
          Alert.alert(
            "Thông báo",
            "Bạn có muốn thoát không?",
            [
              {
                text: "Hủy",
                onPress: () => {
                
                },
              },
              {
                text: "Đồng ý",
                onPress: () => {
                  navigation.navigate('SignInScreen')
                },
              },
            ],
          );
          

          userRef.add(formData).then(() => {
            console.log("Dữ liệu đã thêm vào firebase");
            setSuccessmsg('Tạo tài khoản thành công');
          }).catch((error) => {
            console.log("Dữ liệu vào firebase thất bại", error)
          })
        })
        .catch((error) => {
          console.log(error.message);
          if (error.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
            setCustomError("Email đã tồn tại")

          } else if (error.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
            setCustomError("Email không hợp lệ")

          } else if (error.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
            setCustomError("mật khẩu trên 6 kí tự")

          } else {
            setCustomError(error.message)

          }

        })
    } catch (error) {
      console.log('Đăng ký hệ thống thất bại ', error.message);

    }
  }


  return (
    // <View style={styles.container}>
    //   {successmsg == null ?
    <View style={styles.container}>
      <Text style={titles}>Đăng ký</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
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
            setCustomError('')

          }}
          onChangeText={(text) => setName(text)} />
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
            setCustomError('')
          }}
          onChangeText={(text) => setEmail(text)} />
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
            setCustomError('')
          }}
          onChangeText={(text) => setPhone(text)} />
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
            setCustomError('')
          }
          }
          secureTextEntry={showPassword === false ? true : false}
          onChangeText={(text) => setPassword(text)}
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
            setCustomError('')
          }
          }
          secureTextEntry={showcPassword === false ? true : false}
          onChangeText={(text) => setcPassword(text)}
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
          onPress={() => {
            setNameFocus(false)
            setEmailFocus(false)
            setPasswordFocus(false)
            setShowPassword(false)
            setPhoneFocus(false)
            setCustomError('')
          }}
          onChangeText={(text) => setAddress(text)}
        />
      </View>


      <TouchableOpacity style={styleButton}
        onPress={() => handleSignup()}
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
    // : <View style={styles.container1}>
    //   <View style={styles.viewsuccssmsg}>
    //     <Text style={styles.successmsg}>{successmsg}</Text>

    //     <View style={styles.viewStyleButton}>
    //       <TouchableOpacity style={styles.styleButtonmsg}
    //         onPress={() => navigation.navigate('SignInScreen')}
    //       >
    //         <Text style={styles.buttonTitlemsg}>OK</Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity style={styles.styleButtonmsg}
    //         onPress={() => setSuccessmsg(null)}
    //       >
    //         <Text style={styles.buttonTitlemsg}>Cancel</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>



    // </View>}
    // </View>

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
    marginTop: 10,

  },
  createButtonTitle: {
    color: colors.button,
    fontSize: 18,
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
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
  errormsg: {
    fontSize: 14,

  },
  container1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -30,
  },
  viewsuccssmsg: {
    width: '90%',
    height: '24%',

    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey7,
    borderRadius: 5,
    elevation: 1
  },
  successmsg: {
    fontSize: 20,
    marginHorizontal: 15,
    paddingVertical: 10,
    color: colors.grey1,
    marginTop: 10,
    marginBottom: 10,
  },
  viewStyleButton: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'flex-end',
    marginHorizontal: -10,
    marginTop: 30,

  },
  styleButtonmsg: {
    backgroundColor: "white",
    width: "25%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 5
  },
  buttonTitlemsg: {
    fontSize: 18,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -3,

  }

})