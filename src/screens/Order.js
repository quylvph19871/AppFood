import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import { colors, navbtnin } from '../globals/styles'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const Order = ({ navigation, route }) => {
    const { cartData } = route.params;
    const [oderData, setOderData] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    const [totalfood, setTotalFood] = useState('0');
    const [userloggeduid, setuserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    //console.log(cartData);

    useEffect(() => {
        setOderData(JSON.parse(cartData))
    }, [cartData])

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

    useEffect(() => {
        if (cartData != null) {
            const food = JSON.parse(cartData).cart;
            //  console.log(food);
            let totalfood = 0;
            food.map((item) => {

                totalfood = parseInt(item.Foodquantity) +
                    parseInt(item.Addonquantity) + totalfood;
            })
            setTotalFood(JSON.stringify(totalfood))
        }
    }, [cartData])


    useEffect(() => {

        const checkLogin = () => {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    setuserloggeduid(user.uid);
                } else {
                    setuserloggeduid(null);

                }
            })
        }
        checkLogin()
    }, [])

    useEffect(() => {
        const getuserData = async () => {
            const docRef = firestore().collection('UserData').where('uid', '==', userloggeduid)
            const doc = await docRef.get();


            if (!doc.empty) {
                doc.forEach((doc) => {
                    setUserdata(doc.data());
                })
            } else {
                console.log('No such document');
            }
        }
        // console.log(userdata);
        getuserData();
    }, [userloggeduid])

    const placenow = () => {
        const docRef = firestore().collection('UserOrders').doc(new Date().getTime().toString());

        docRef.set({
            orderid: docRef.id,
            orderdata: oderData.cart,
            orderstatus: 'pending',
            ordercost: totalCost,
            orderdate: firestore.FieldValue.serverTimestamp(),
            orderaddress: userdata.address,
            orderphone: userdata.phone,
            ordername: userdata.name,
            orderuseruid: userloggeduid,
            orderpayment: 'online',
            paymentstatus: 'paid',
        }).then(() => {
            Alert.alert(
                "Thông báo",
                "Bạn có muốn thoát không?",
                [
                    {
                        text: "Đồng ý",
                        onPress: () => {

                        },
                    },
                ],
            );
        })

    }

    return (
        <View style={{ flex: 1 }}>
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
                <Text style={styles.hs}>Xác nhận đơn hàng</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.viewiconlocation}>
                        <Icon
                            style={{paddingTop: 4}}
                            color={colors.primary_key}
                            size={18}
                            type='material-community'
                            name='map-marker-radius-outline'
                        />
                    </View>
                    <Text style={{
                        fontSize: 15, color: colors.grey1, marginLeft: 10, fontWeight: '400', marginTop: 10, height: 30
                    }}>Địa chỉ giao hàng</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.containerin}>
                        <Text style={styles.head2}>Tên:
                            {userdata ? <Text> {userdata.name}
                            </Text> : 'loading'} </Text>
                    </View>
                    <View style={{ width: 1, height: 16, marginTop: 5, backgroundColor: colors.grey5, marginHorizontal: 10 }}></View>


                    <Text style={styles.head}>
                        {userdata ? <Text> {userdata.phone}
                        </Text> : 'loading'} </Text>
                </View>

                <View style={styles.containerin}>
                    <Text style={styles.head2}>Địa chỉ:
                        {userdata ? <Text> {userdata.address}
                        </Text> : 'loading'} </Text>
                </View>

            </View>
            <ScrollView>
                <View style={styles.flatListView}>
                    <Text style={styles.head3}>Đồ đặt:</Text>
                </View>
                <FlatList
                    horizontal={true}
                    style={styles.flatListView}
                    data={oderData.cart}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={styles.containerView}>
                                    <View style={{ width: '100%' }}>
                                        <View style={styles.s2inview}>
                                            <Text style={styles.head1} secureTextEntry>{item.data.restaurantName} - </Text>
                                            <Text style={styles.head1}>{item.data.foodName} - </Text>
                                            <Text style={styles.head1}>{item.data.restaurantAddressCity} </Text>
                                        </View>

                                        <View style={styles.rowproduct}>
                                            <Image source={{ uri: item.data.foodImageUrl }}
                                                style={styles.cartimg} />
                                            <View>
                                                <View style={styles.row}>
                                                    <Text style={styles.head4}>{item.Foodquantity} x </Text>
                                                    <Text>{item.data.foodName}</Text>
                                                </View>
                                                {/* <Text style={styles.head4}>{item.data.foodPrice}₫</Text> */}
                                                <Text style={styles.head4}>{parseInt(item.Foodquantity) *
                                                    parseInt(item.data.foodPrice)}₫</Text>
                                                {item.Addonquantity > 0 &&
                                                    <View>
                                                        <View style={styles.row}>
                                                            <Text style={styles.head4}>Ăn kèm: {item.Addonquantity} x </Text>
                                                            <Text>{item.data.foodAddon}</Text>
                                                            {/* <Text style={styles.head4}>{item.data.foodAddonPrice}₫</Text> */}
                                                        </View>
                                                        <Text style={styles.head4}>{parseInt(item.Addonquantity) *
                                                            parseInt(item.data.foodAddonPrice)}₫</Text>
                                                    </View>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    }
                />
                <View style={styles.containertotal}>
                    <View style={styles.rowtotal}>
                        <Text style={styles.head5}>
                            Tổng số lượng món:
                        </Text>

                        <Text style={styles.head5}>{totalfood}</Text>

                    </View>
                    <View style={styles.rowtotal}>
                        <Text style={styles.head5}>
                            Phí giao hàng:
                        </Text>

                        <Text style={styles.head5}>14000</Text>

                    </View>

                    <View style={styles.rowtotal}>
                        <Text style={styles.head5}>Tổng giá: </Text>

                        <Text style={styles.head5}>{totalCost}₫</Text>

                    </View>
                </View>
                <View style={[styles.containertotal, { flexDirection: 'row', alignItems: "center", justifyContent:'space-between'}]}>
                    <Text style={styles.head5}>Thêm voucher</Text>

                    <View style={styles.rowvoucher}>
                        <Text style={styles.head5}>Chọn voucher</Text>
                        <View style={styles.viewicon}>
                            <Icon
                                color={colors.grey3}
                                size={20}
                                type='material-community'
                                name='chevron-right'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>



            <View style={styles.view}>
                <TouchableOpacity style={styles.btn} onPress={() => placenow()}>
                    <Text style={styles.txtbtn} >Thanh toán - </Text>
                    <Text style={styles.txtbtn}>{totalCost}₫</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
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
    btn: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary_key,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    txtbtn: {
        fontSize: 20,
        color: colors.white,
        elevation: 10
    },
    hs: {
        fontSize: 20,
        color: colors.grey1,
        marginLeft: 5,
        fontWeight: '500'
    },
    container: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomWidth: 0.2,
        backgroundColor: colors.white,
        borderBottomColor: colors.grey5,
        paddingBottom: 10,
    },
    containerView: {
        marginHorizontal: 2,
        width: 260
    },
    flatListView: {
        backgroundColor: colors.white,
        borderBottomColor: colors.grey5,
        paddingLeft: 10
    },
    head2: {
        fontSize: 15,
        color: colors.grey1,
        marginVertical: 3,
        marginLeft: 45,
        fontWeight: '400',
        height: 25,

    },
    head: {
        fontSize: 15,
        color: colors.grey1,
        paddingVertical: 3,
        fontWeight: '400'
    },
    head3: {
        fontSize: 17,
        color: colors.primary_key,
        fontWeight: '400',
        height: 25,
        width: 60,
        borderBottomColor: colors.primary_key,
        marginLeft: 15,
        marginTop: 5,
        borderBottomWidth: 0.5,
        textAlign: 'center'
    },
    head4: {
        fontSize: 14,
        marginLeft: 5,
        color: colors.grey2
    },
    head5: {
        fontSize: 14,
        color: colors.grey1,
        fontWeight: '400',
        height: 25,
        textAlign: 'center',
        marginTop: 5
    },
    row: {
        flexDirection: 'row',
    },
    rowproduct: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 0.2,
        backgroundColor: ' #FFF0F0',
        alignItems: 'center',
        height: 75,
        paddingHorizontal: 10,
        borderColor: colors.grey7,
        marginBottom: 10
    },
    viewiconlocation: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 5
    },
    viewicon: {
        width: 15,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    s2inview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        height: 40,
        marginLeft: 10,

    },
    head1: {
        fontSize: 17,
        color: 'black',
        fontWeight: '400',
        height: 25,
        borderBottomWidth: 0.2,
        borderBottomColor: colors.grey5,
    },
    cartimg: {
        width: 100,
        height: 70,
        borderRadius: 2
    },
    c1: {
        height: 150,
        color: colors.grey1,
        borderWidth: 1
    },
    containertotal: {
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderColor: colors.grey5,
        paddingVertical: 10,
        borderTopWidth: 0.2,
        marginTop: 5,
        
    },
    rowtotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: colors.white,
        borderColor: colors.grey5,
        paddingVertical: 10,
        borderTopWidth: 0.2,
    },
    rowvoucher: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: colors.white,
    }
})