import {StyleSheet,  View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, parameters, styleButton, buttonTitle } from '../../globals/styles';
import Swiper from 'react-native-swiper';


const WelcomeScreen = ({ navigation }) => {
   

  return (
      <View style={styles.container}>

          <View style={styles.viewsilder}>
              <Swiper autoplay={true}>
                  <View style={styles.side1}>
                      <Image
                          style={styles.img}
                          source={{ uri: "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock371955106huge-1675245432977.jpg" }}

                      />
                  </View>
                  <View style={styles.side2}>
                      <Image
                          style={styles.img}
                          source={{ uri: "https://cdn.tgdd.vn/2020/12/CookProduct/Thuc-an-nhanh-la-gi-tac-hai-cua-thuc-an-nhanh-va-cac-loai-tot-cho-suc-khoe-1-1200x676.jpg" }}

                      />
                  </View>
                  <View style={styles.side1}>
                      <Image
                          style={styles.img}
                          source={{ uri: "https://static-images.vnncdn.net/files/publish/2022/10/12/xoi-ca-kho-1756.jpeg" }}

                      />
                  </View>
              </Swiper>
          </View>

          <View style={styles.view_button}>

              <TouchableOpacity style={styleButton}
                  onPress={() => navigation.navigate('SignInScreen')}>
                  <Text style={buttonTitle}>Đăng nhập</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.createButton}
                  onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text style={styles.createButtonTitle}>Tạo tài khoản mới</Text>
              </TouchableOpacity>

             

          </View>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewwelcome: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20
    },
    text1: {
        fontSize: 26,
        color: colors.button,
        fontWeight: '600',
        fontStyle: 'normal'
    },
    viewsilder: {
        flex: 6,
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 20,
    },
    img: {
        borderRadius: 20,
        height: "100%",
        width: "80%",
    },

    side1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    side2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    side3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    view_button: {
        flex: 4,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
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
        marginTop: 10


    },
    createButtonTitle: {
        color: colors.button,
        fontSize: 20,
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -3,

    },
})

export default WelcomeScreen