import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { colors, navbtnout, navbtn, navbtnin } from '../globals/styles'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { doc } from '@firebase/firestore'

const Productpage = ({ navigation, route }) => {

    const data = route.params;
    // console.log('sanr pham',data)
    if (route.params === undefined) {
        navigation.navigate('Home')
    }

    const [quantity, setQuantity] = useState('1');
    const [addonquantity, setAddonquantity] = useState('0');
    const [tongtien, setTongTien] = useState('')
    const [showProduct, setShowProduct] = useState(false);

    
    const addToCart = () => {
        // console.log("theem gio hang");
        const docRef = firestore().collection('UserCart').doc(auth().currentUser.uid);

        const data1 = { data, Addonquantity: addonquantity, Foodquantity: quantity }
        //console.log("data1", data1);

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    cart: firestore.FieldValue.arrayUnion(data1)
                })
            } else {
                docRef.set({
                    cart: [data1],
                })

            }
        })

    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }

    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }

    const increaseAddQuantity = () => {
        setAddonquantity((parseInt(addonquantity) + 1).toString())
    }

    const decreaseAddQuantity = () => {
        if (parseInt(addonquantity) > 0) {
            setAddonquantity((parseInt(addonquantity) - 1).toString())
        }
    }
    // console.log(data.foodAddonPrice);

    console.log({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] });

    const cartData = JSON.stringify({ cart: [{ Addonquantity: addonquantity, Foodquantity: quantity, data }] })
    return (
        <View style={styles.container}>
            <View style={styles.headnav}>
                <View style={styles.navbtn}>
                    <Icon
                        onPress={() => navigation.navigate('Cart')}
                        style={navbtnin}
                        color={colors.primary_key}
                        size={35}
                        type='material-community'
                        name='arrow-left'
                    />
                </View>
                <Text style={styles.hs}>Chi tiết sản phẩm</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container1}>
                    <View style={styles.s1}>
                        <Image source={{
                            uri: data.foodImageUrl
                        }} style={styles.cardingin} />
                    </View>
                    <View style={styles.s2}>
                        <View style={styles.s2inview}>
                            <View style={styles.s2inview}>
                                <Text style={styles.head1}>{data.foodName} -</Text>
                                <Text style={styles.head1}> {data.restaurantAddressCity}</Text>
                            </View>
                            <View style={styles.navbtncart}>
                                <Icon
                                    onPress={() => addToCart()}
                                    color={colors.white}
                                    size={25}
                                    type='material-community'
                                    name='plus'
                                />
                            </View>
                        </View>
                        <View style={styles.s2in}>
                            <Text style={styles.head2}>{data.foodType} <Text style={{fontWeight: '100'}}>|</Text></Text>
                            <Text style={styles.head2}> {data.foodPrice}₫</Text>
                        </View>
                        <View >
                            <Text style={styles.head2}>Tên quán: {data.restaurantName}</Text>
                            <Text style={styles.textmota}>Mô tả: {data.foodDescription}</Text>
                        </View>


                    </View>


                    <View>
                        <View style={styles.hr}></View>
                        <View style={styles.viewsl}>
                            <Text style={{ fontSize: 16, color: colors.grey2 }}>Số lượng:</Text>
                            <View style={styles.viewincdec}>
                                <Text style={styles.incdecbtntru} onPress={() => decreaseQuantity()}>-</Text>
                                <TextInput value={quantity} style={styles.incdecinput} editable={false} />
                                <Text style={styles.incdecbtncong} onPress={() => increaseQuantity()}>+</Text>
                            </View>
                        </View>
                    </View>

                    {data.foodAddonPrice != "" &&
                        <View>
                            <View>
                                <View style={styles.hrview}>
                                    <View style={styles.hr1}></View>
                                    <View style={styles.hr1}></View>

                                </View>
                                <View style={styles.viewsl}>
                                    <Text style={{ fontSize: 16, color: colors.grey2 }}>Thêm: {data.foodAddon} {data.foodAddonPrice}₫</Text>
                                    <View style={styles.viewincdec}>
                                        <Text style={styles.incdecbtntru} onPress={() => decreaseAddQuantity()}>-</Text>
                                        <TextInput value={addonquantity} style={styles.incdecinput} editable={false} />
                                        <Text style={styles.incdecbtncong} onPress={() => increaseAddQuantity()}>+</Text>
                                    </View>
                                </View>
                                <View style={styles.hr}></View>
                            </View>
                        </View>}

                    <View style={styles.containerttView}>
                        <View style={styles.containertt}>
                            <Text style={{ fontSize: 20, color: colors.grey2 }}>Tổng tiền: </Text>
                            {data.foodAddonPrice != "" ? <Text style={styles.texttt}>
                                 {((parseInt(data.foodPrice) * parseInt(quantity))
                                    + parseInt(addonquantity) * parseInt(data.foodAddonPrice)).toString() +"₫"}

                            </Text> : <Text style={styles.texttt}>
                                    {(parseInt(data.foodPrice) * parseInt(quantity)).toString() +"₫"}
                            </Text>}
                        </View>
                    </View>
                </View>
            </ScrollView>


            <View style={styles.view}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        navigation.navigate('Order', { cartData })
                    }} 
                  >
                    <Text style={styles.head3}>Mua hàng</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Productpage

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
        elevation: 3
    },
    navbtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navbtncart: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary_key,
        borderRadius: 2
    },
    hs: {
        fontSize: 20,
        color: colors.grey1,
        marginLeft: 5,
        fontWeight: '400'
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff'
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardingin: {
        width: '100%',
        height: '100%'
    },
    s2: {
        width: '100%',
        padding: 10
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5
    },
    s2inview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    head1: {
        fontSize: 24,
        color: colors.grey1,
        fontWeight: '700'
    },
    head2: {
        fontWeight: '500',
        color: colors.grey2,
        fontSize: 18
    },
    textmota: {
        fontWeight: '400',
        color: colors.grey2,
        fontSize: 16
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50
    },
    btn: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary_key,
        justifyContent: 'center',
        alignItems: 'center',
    },
    head3: {
        fontSize: 20,
        color: colors.white,
        elevation: 10
    },
    hr: {
        height: 1,
        backgroundColor: colors.grey5,
        marginHorizontal: 10
    },
    hr1: {
        width: "10%",
        height: 0.5,
        backgroundColor: colors.grey5,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    hrview: {
        width: "100%",
        height: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    viewsl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10

    },
    viewincdec: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    incdecbtntru: {
        fontSize: 18,
        color: colors.grey1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: colors.grey5,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        
    },
    incdecbtncong: {
        fontSize: 18,
        color: colors.grey1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: colors.grey5,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3
    },
    incdecinput: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '300',
        color: colors.grey2,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.grey5,
        paddingHorizontal: 5,
        paddingVertical: 0
    },
    containerttView: {
        width: '95%',
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,

    },
    containertt: {
        flexDirection: 'row',
        height: 30,
        width: '100%',
        alignItems: 'center',
    },
    texttt: {
        height: "100%",
        height: 25,
        fontSize: 16,
        paddingTop: 2,
        backgroundColor: colors.white,
        borderWidth: 1,
        paddingHorizontal: 5,
        borderColor: colors.white,
        elevation: 2,
        color: colors.grey1
    }
})