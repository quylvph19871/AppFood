import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { colors } from '../globals/styles'

const OfferSlider = () => {
  return (
    <View>
      <View style={styles.view}>
        <Swiper autoplay={true}>
          <View style={styles.slide}>
            <Image style={styles.img} source={{ uri: 'https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-template_106176-726.jpg?size=626&ext=jpg&ga=GA1.2.279398596.1695718346&semt=ais' }} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.img} source={{ uri: 'https://img.freepik.com/free-vector/flat-design-organic-food-sale-banner-template_23-2149112289.jpg?size=626&ext=jpg&ga=GA1.2.279398596.1695718346&semt=ais' }} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.img} source={{ uri: 'https://img.freepik.com/free-vector/flat-design-korean-restaurant-facebook-template_23-2149678636.jpg?size=626&ext=jpg&ga=GA1.2.279398596.1695718346&semt=ais' }} />
          </View>
        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  view: {
    height: 150,
    width: '100%',
    backgroundColor: colors.grey5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  slide: {
    height: 150,
    width: '100%',
    backgroundColor: colors.grey5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    height: 150,
    width: '100%',
  }
  
})