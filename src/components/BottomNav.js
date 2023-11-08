import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, titles, styleButton, buttonTitle } from '../globals/styles'
import { Icon } from 'react-native-elements'
const BottomNav = ({navigation}) => {
  return (
      <View style={styles.container}>
          <View>
              <TouchableOpacity style={styles.inputout} onPress={() => navigation.navigate('Home')}>
                  <Icon
                      style={styles.icon}
                      size={25}
                      color={colors.grey2}
                      type='material-community'
                      name='home'
                  />
                  <Text style={styles.text}>Trang chủ</Text>
              </TouchableOpacity>
          </View>
          <View>
              <TouchableOpacity style={styles.inputout} onPress={() => navigation.navigate('Home')}>
                  <Icon
                      style={styles.icon}
                      size={25}
                      color={colors.grey2}
                      type='material'
                      name='search'
                  />
                  <Text style={styles.text}>Tìm kiếm</Text>
              </TouchableOpacity>
          </View>
          <View>
              <TouchableOpacity style={styles.inputout} onPress={() => navigation.navigate('Cart')}>
                  <Icon
                      style={styles.icon}
                      size={25}
                      color={colors.grey2}
                      type='material-community'
                      name='cart-outline'
                  />
                  <Text style={styles.text}>Giỏ hàng</Text>
              </TouchableOpacity>
          </View>
          <View>
              <TouchableOpacity style={styles.inputout} onPress={() => navigation.navigate('Track')}>
                  <Icon
                      style={styles.icon}
                      size={25}
                      color={colors.grey2}
                      type='material-community'
                      name='note-text-outline'
                  />
                  <Text style={styles.text}>Đơn hàng</Text>
              </TouchableOpacity>
          </View>

         
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: colors.grey6,
    },
    text: {
        marginBottom: 5
    }
})