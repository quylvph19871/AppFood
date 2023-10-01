import { StatusBar, View, StyleSheet, TextInput, Text, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, titles, styleButton, buttonTitle } from '../globals/styles'
import { Icon } from 'react-native-elements'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'

import firestore from '@react-native-firebase/firestore'
import Cardslider from '../components/Cardslider'


const HomeScreen = () => {
    const [foodData, setFoodData] = useState([]);
    const [vegData, setVegData] = useState([]);
    const [nonVegData, setNonVegData] = useState([]);
    const [search, setSeach] = useState('');

    const foodRef = firestore().collection('FoodData');

    useEffect(() => {
        foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    const filteredVegData = foodData.filter(item => item.foodType == 'veg');
    const filteredNonVegData = foodData.filter(item => item.foodType == 'non-veg');

    useEffect(() => {
        setVegData(filteredVegData)
        setNonVegData(filteredNonVegData)
    }, [foodData])
    // console.log(vegData)
    // console.log(nonVegData)
    // console.log(foodData)
    // console.log(search)



    return (
        <View style={{flex:1}}>
            {/* <HomeHeadNav /> */}
            
            <View style={styles.headnav}>
                <HomeHeadNav />
                <View style={styles.inputout}>
                    <Icon
                        style={styles.icon}
                        type='material'
                        name='search'
                    />
                    <TextInput style={styles.input} placeholder='Search'
                    onChangeText={(text)=>{setSeach(text)}}/>
                </View>

                 {search != '' && <View style={styles.searchresultsouter}>
                    <FlatList style={styles.searchresultsinner}
                        data={foodData}
                        renderItem={({ item }) => {
                            if (item.foodName.toLowerCase().includes(search.toLocaleLowerCase())) {
                                return (
                                    <View style={styles.searchresult}>
                                        <Text style={styles.searchresultText}>{item.foodName}</Text>
                                    </View>
                                )
                            }
                        }}
                    />
             </View>}
            </View>
           
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <OfferSlider />
                <Categories />
                <Cardslider title={"Ngày đặc biệt hôm nay"} data={foodData} />
                <Cardslider title={"Món không chay"} data={nonVegData} />
                <Cardslider title={"Món chay"} data={vegData} />

            </ScrollView>



        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    headnav: {
        backgroundColor: colors.primary_key,
        elevation: 5,
    
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
        paddingBottom: 10


    },
    input: {
        fontSize: 18,
        width: '100%',
        height: 40,
        paddingVertical: 2,
        backgroundColor: colors.white,
    },

    searchresultsouter: {
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        // height: '100%',
        backgroundColor: colors.white
    },
    searchresultsinner: {
        width: '100%'
    },
    searchresult: {
        width: '100%',
        borderBottomColor: colors.grey5,
        borderBottomWidth: 1,
       
    },
    searchresultText: {
        marginLeft: 15,
        fontSize: 18,
        color: colors.grey1,
        marginVertical: 15,
      
    }

})