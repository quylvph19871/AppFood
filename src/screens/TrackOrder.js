import { ScrollView, StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomNav from '../components/BottomNav'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { doc } from '@firebase/firestore'
import { Icon } from 'react-native-elements'
import { colors, navbtnin } from '../globals/styles'
import { TouchableOpacity } from 'react-native'


const TrackOrder = ({ navigation }) => {
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const ordersRef = firestore().collection('UserOrders').where('orderuseruid', '==', auth().currentUser.uid)

        ordersRef.onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    console.log(orders);
    const cancelOrder = (orderitem) => {
        const ordersRef = firestore().collection('UserOrders').doc(auth().orderitem.orderid)
        ordersRef.update({
            orderstatus: firestore.FieldValue.arrayRemove(orderitem)
        })
        getOrders()
    }
    return (
        <View style={{ flex: 1 }}>
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
                <Text style={styles.hs}>Đơn hàng</Text>
            </View>
            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>
            
                {orders.sort(
                    (a, b) =>
                        b.orderdate.seconds - a.orderdate.seconds
                ).map((order, index) => {
                    return (
                        <View key={index}>
                            {order.orderstatus == 'ontheway' && <Text>Đang trên đường</Text>}
                            {order.orderstatus == 'pending' && <Text>Đang chờ xử lý</Text>}
                            {order.orderstatus == 'delivered' && <Text>Đã giao</Text>}
                            {order.orderstatus == 'cancelled  ' && <Text>Hủy</Text>}

                            <FlatList
                                style={styles.flatListView}
                                data={order.orderdata}
                                renderItem={
                                    ({ item }) => {
                                        return (
                                            <View style={styles.containerView}>
                                                <View style={{ width: '100%' }}>

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
                            <View style={styles.rowtotal}>
                                <Text style={styles.head5}>Tổng giá: </Text>

                                <Text style={styles.head5}>{order.ordercost}₫</Text>

                            </View>
                            {order.orderstatus === 'delivered' ? <Text>Đã giao thành công</Text> : null}
                            {order.orderstatus === 'cancelled ' ? <Text>Xin lỗi vì đã hủy</Text> : null}
                            {
                                order.orderstatus !=
                                    'cancelled' &&
                                    order.orderstatus !=
                                    'delivered' ?
                                    <TouchableOpacity onPress={()=>cancelOrder(order)}>
                                        <Text>Hủy đơn</Text>
                                    </TouchableOpacity>
                                    : ""
                            }
                        </View>

                    )
                })
                }
     
        </View>
    )
}

export default TrackOrder

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
  
    hs: {
        fontSize: 20,
        color: colors.grey1,
        marginLeft: 5,
        fontWeight: '500'
    },
    containerView: {
        width: '95%'
    },
    flatListView: {
        backgroundColor: colors.white,
        borderBottomColor: colors.grey5,
        paddingLeft: 10
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
        marginTop: 10
    },
    cartimg: {
        width: 100,
        height: 70,
        borderRadius: 2
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

    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        zIndex: 4
    }
})