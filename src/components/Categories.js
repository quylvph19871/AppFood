import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, titles, styleButton, buttonTitle } from '../globals/styles'
import { Icon } from 'react-native-elements'


const Categories = () => {
  return (
    <View>
      <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.viewcontent}>
          <TouchableOpacity style={styles.inputout} >
            <Icon
              style={styles.icon}
              type='material-community'
              name='tea'
            />
            <Text style={styles.text}>Trà sữa</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='beer'
            />
            <Text style={styles.text}>Bia</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewcontent}>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='rice'
            />
            <Text style={styles.text}>Cơm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='candy'
            />
            <Text style={styles.text}>Ăn vặt</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewcontent}>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='flower-tulip'
            />
            <Text style={styles.text}>Hoa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='bread-slice'
            />
            <Text style={styles.text}>Bánh mỳ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewcontent}>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='fruit-cherries'
            />
            <Text style={styles.text}>Quả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='fish'
            />
            <Text style={styles.text}>Hải Sản</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewcontent}>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='cake-variant'
            />
            <Text style={styles.text}>Bánh ngọt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputout}>
            <Icon
              style={styles.icon}
              type='material-community'
              name='noodles'
            />
            <Text style={styles.text}>Món nước</Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({

  icon: {
    color: colors.grey3,
    width: 100,
    height: 40,
    size: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewcontent: {
    // height: 150,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  
  },
  inputout: {
    borderColor: colors.grey6,
    borderWidth: 1,
    overflow: 'ellipsis',
  },
  text: {
  
    justifyContent: 'center',
    alignSelf: 'center',
    height:40 
  }


    
})