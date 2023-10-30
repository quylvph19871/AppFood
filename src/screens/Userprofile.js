import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { colors, navbtnout, navbtn, navbtnin } from '../globals/styles'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const Userprofile = ({ navigation }) => {
    const [userloggeduid, setuserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
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
        getuserData();
    }, [userloggeduid])

    // console.log(userdata);
    return (
        <View style={styles.containerout}>
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
            
                <Text style={styles.hs}>Trang hồ sơ</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.view}>
                    <View style={styles.viewimg}>
                        <Image style={styles.img} source={{ uri: "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png" }} />

                    </View>

                </View>

                <View style={styles.containerin}>
                    <Text style={styles.head2}>Tên:
                        {userdata ? <Text style={styles.head2in}> {userdata.name}
                        </Text> : 'loading'} </Text>
                    </View>

                <View style={styles.containerin}>
                    <Text style={styles.head2}>Email:
                        {userdata ? <Text style={styles.head2in}> {userdata.email}
                        </Text> : 'loading'} </Text>
                </View>
                <View style={styles.containerin}>
                    <Text style={styles.head2}>Số điện thoại:
                        {userdata ? <Text style={styles.head2in}> {userdata.phone}
                        </Text> : 'loading'} </Text>
                </View>
                <View style={styles.containerin}>
                    <Text style={styles.head2}>Địa chỉ:
                        {userdata ? <Text style={styles.head2in}> {userdata.address}
                        </Text> : 'loading'} </Text>
                </View>
                 
                  
                  
                </View>
            </View>

    )
}

export default Userprofile

const styles = StyleSheet.create({
    headnav: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        height: 60,
        elevation: 3

    },
    navbtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hs: {
        fontSize: 24,
        color: colors.grey1,
        marginLeft: 10,
        fontWeight: '400'
    },
    containerin: {
        borderColor: colors.grey5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        elevation: 2
     
    }, head2: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.grey1,
    },
    head2in: {
        
    },
 view: {
    width: '100%',
    height: 200,
    justifycontent: 'center',
     alignItems: 'center',
    backgroundColor: colors.primary_key
},

viewimg: {
    width: '50%',
    height: '90%',
    marginTop: 10,
    justifycontent: 'center',
    alignItems: 'center'
  
},

img: {
    width: '90%',
    height: '100%', 
}
})