import { FlatList, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { colors, navbtnin } from '../globals/styles'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import BottomNav from '../components/BottomNav'
const UserCart = ({ navigation }) => {
    const [cartData, setCartData] = useState(null);
    const [totalCost, setTotalCost] = useState('0');

    const getCartData = async () => {
        const docRef = firestore().collection('UserCart').doc(auth().currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {

                const data = JSON.stringify(doc.data())
                //  console.log(data);
                setCartData(data)
            } else {
                console.log('no such document');
            }
        }).catch((error) => {
            console.log('Error getting document', error);
        })
    }

    useEffect(() => {
        getCartData();
    }, []);

    useEffect(() => {
        if (cartData != null) {
            const foodprice = JSON.parse(cartData).cart;
            //  console.log(food);
            let totalfoodprice = 0;
            foodprice.map((item) => {
              
                totalfoodprice = (parseInt(item.data.foodPrice) * parseInt(item.Foodquantity)) +
                    (parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity)) + totalfoodprice;
            })
            setTotalCost(JSON.stringify(totalfoodprice))
    
            
        }
    }, [cartData])
    // console.log(cartData);

    const deleteItem = (item) => {
        const docRef = firestore().collection('UserCart').doc(auth().
            currentUser.uid);
        
        docRef.update({
            cart: firestore.FieldValue.arrayRemove(item)
        })
        getCartData();
    }
    return (
        <View style={styles.container}>
            <View style={styles.headnav}>
                <View style={styles.navbtn}>
                    <Icon
                        onPress={() => navigation.navigate('Home')}
                        style={navbtnin}
                        color={colors.primary_key}
                        size={35}
                        type='material-community'
                        name='arrow-left'
                    />
                </View>
                <Text style={styles.hs}>Giỏ hàng</Text>
            </View>

            <View style={styles.container1}>
                {cartData == null || JSON.parse(cartData).cart.length == 0 ?
                    <Text style={styles.textcontent}>Giỏ hàng trống</Text>
                    :
                   
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={styles.cartlist}
                        data={JSON.parse(cartData).cart}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.cartcard}>
                                    <Image source={{ uri: item.data.foodImageUrl }}
                                        style={styles.cartimg} />
                                    <View style={styles.navbtncart}>
                                        <Icon
                                            onPress={()=> deleteItem(item)}
                                            color={colors.white}
                                            size={18}
                                            type='material-community'
                                            name='close'
                                        />
                                    </View>
                                    <View style={styles.content}>
                                        <View>
                                            <View>
                                                 <Text style={{fontSize: 18, color: colors.grey1, borderBottomWidth: 0.5, borderBottomColor: colors.grey5}}>{item.data.foodName}</Text>
                                                <Text style={styles.text}>Số lượng: {item.Foodquantity}</Text>
                                            </View>
                                           
                                            <Text style={styles.text}>{item.data.foodPrice}₫/suất </Text>
                                            
                                        </View>

                                        {item.Addonquantity > 0 && 
                                            <View>
                                                <Text style={styles.text}>
                                                  Thêm: {item.Addonquantity} lần {item.data.foodAddon}
                                                </Text>
                                                <Text style={styles.text}>{item.data.foodAddonPrice}₫/lần</Text>
                                            </View>}
                                        
                                        
                                    </View>
                                </View>
                                //  <Text>{item.data.foodName}</Text>
                            )
                        }}
                    />
                }
            </View>


            <View style={styles.btncont}>
                <View>
                    <Text style={{color: colors.grey1, fontSize: 16, marginLeft: 10}}>Tổng tiền: {totalCost}₫</Text>
                </View>
                <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('Order', {cartData})}>
                    <Text style={styles.btntxt}>Mua hàng</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default UserCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%'
    },
    headnav: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        height: 55,
        elevation: 3,
        borderBottomColor: colors.primary_key,
        borderBottomWidth: 0.2
    },
    navbtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hs: {
        fontSize: 20,
        color: colors.grey1,
        marginLeft: 5,
        fontWeight: '400'
    },
    textcontent: {
        fontSize: 18,
        marginVertical: 10,
        color: colors.grey1,
        textAlign: 'center',
        width: '100%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '45%'

    }, container1: {
        flex: 1,
        width: '100%',
    },
    cartlist: {
        width: '100%'
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginVertical: 4,
        borderRadius: 2,
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: colors.grey6
    },
    cartimg: {
        width: 125,
        height: 100,
        borderRadius: 2
    },
    navbtncart: {
        width: 20,
        height: 20,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E99999',
        borderRadius: 2,
        position: 'absolute',
        top: 0,
        right: 0
    },
    content: {
        marginLeft: 10
    },
    text: {
        fontSize: 14,
        color: colors.grey1,
        fontStyle: 'italic'
    },
    btncont: {
        width: '100%',
        height: 55,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',  
        borderWidth: 0.5,
        borderColor: colors.primary_key
        
       
    },
    btn2: {
        height: 55,
        width: '40%',
        justifyContent: 'center',
        backgroundColor: colors.button,
        
    },
    btntxt: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.white,
        fontWeight: '300'
    }
})