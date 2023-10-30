import { StyleSheet, Text, View, Image, FlatList , TouchableOpacity} from 'react-native'
import React from 'react'
import { colors, nonveg, veg } from '../globals/styles'

const Cardslider = ({ title, data , navigation}) => {
    // console.log(data)
    // console.log(title)
    const openProductPage = (item) => {
        // console.log(item)
        navigation.navigate('Productpage', item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.cartTitle}>{title}</Text>
            <FlatList
                style={styles.cardsout}
                
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.index} onPress={() => {
                        openProductPage(item)
                        }}>
                         <View style={styles.card}>
                             <View style={styles.viewimg}>
                            <Image source={{
                                uri: item.foodImageUrl
                            }} style={styles.cardimgin} />
                        </View>
                        <View style={styles.s2}>
                            <Text style={styles.nametxt}>{item.foodName}</Text>
                            <View style={styles.viewprice}>
                                <Text style={styles.pricetxt}>
                                        Giá: {item.foodPrice}₫
                                </Text>
                            {item.foodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                            </View>
                        </View>
                        <View style={styles.s3}>
                            <Text style={styles.buybtn}>Buy</Text>
                        </View>
                        </View>  
                        </TouchableOpacity>
                        

                )}
            />
        </View>
    )
}

export default Cardslider

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10
    },
    cartTitle:{
        color: colors.grey3,
        width: '90%',
        fontSize: 20,
        fontWeight: '700',
        borderRadius: 10,
        marginHorizontal: 10
    },
    cardsout: {
        width: '100%',
        // backgroundColor: 'red'
    },
   
    card: {
        width: 150,
        height: 300,
        // backgroundColor: 'aqua'
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.grey4,
        
    },
    cardimgin: {
        width: '100%',
        height: 150,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    s2: {
        flexDirection: 'column',
       marginHorizontal: 10
    },
    nametxt: {
        fontSize: 20,
        color: colors.grey1,
        marginHorizontal: 5,
        fontWeight: '700',
        
    },
    pricetxt: {
        fontSize: 18,
        color: colors.grey2,
        marginRight: 10
    },
    viewprice: {
        flexDirection: 'row',
    },
    s3: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%'
    },
    buybtn: {
        backgroundColor: colors.button,
        color: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '50%',
        textAlign: 'center',
    }
})