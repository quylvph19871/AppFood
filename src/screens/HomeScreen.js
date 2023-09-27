import { StatusBar, View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors, titles, styleButton, buttonTitle } from '../globals/styles'
import { Icon } from 'react-native-elements'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'

const HomeScreen = () => {
    return (
        <View>
            <StatusBar />
            <View style={styles.headnav}>
                <HomeHeadNav />
                <View style={styles.inputout}>

                    <Icon
                        style={styles.icon}
                        
                        type='material'
                        name='search'
                    />
                    <TextInput style={styles.input} placeholder='Search' />
                </View>
            </View>

       <OfferSlider />
            <Categories />
     
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    headnav: {
        backgroundColor: colors.primary_key,
        elevation: 5,
        height: 100,
    },
    icon: {
        color: colors.grey3,
        backgroundColor: colors.white,
        width: 40,
        height: 40,
        size: 25,
        marginLeft: 20,
        justifyContent: 'center'
    },

    inputout: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: colors.primary_key,
        paddingHorizontal: 15,
        marginLeft: 9,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    input: {
        fontSize: 18,
        width: '100%',
        height: 40,
        paddingVertical: 2,
        backgroundColor: colors.white,
    },
  
})