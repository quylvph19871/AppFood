import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { colors, navbtnout, navbtn, navbtnin, styleButton } from '../globals/styles'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import { TextInput } from 'react-native'

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
    useEffect(() => {
        
        getuserData();
    }, [userloggeduid])

    const [edit, setEdit] = useState(false);
    const [newname, setNewName] = useState('')
    const [newaddress, setNewAddress] = useState('')
    const updateUser = async () => {
        const docRef = firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname
                    })
                })
               
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress
                    })
                })

            }
            Alert.alert(
                "Thông báo",
                "Bạn đã thay đổi hồ sơ thành công",
            );

            getuserData()
            setEdit(false)
            setPasswordEdit(false)
        } else {
            Alert.alert(
                "Thông báo",
                "Bạn đã thay đổi hồ sơ thất bại",
            );
        }
       
       
    }

    const [passwordedit, setPasswordEdit] = useState(false)
    const [oldpasswordedit, setOldPasswordEdit] = useState('')
    const [newPasswordedit, setNewPasswordEdit] = useState('')

    const updatePassword = async () => {
        const reauthenyicate = (oldpasswordedit) => {
            var user = auth().currentUser;
            var cred = auth.EmailAuthProvider.credential(
                user.email, oldpasswordedit);
            return user.reauthenticateWithCredential(cred)
        }

        let docRef = firestore().collection('UserData').where('uid', '==', userloggeduid)
        let doc = await docRef.get()
        reauthenyicate(oldpasswordedit).then(() => {
            var user = auth().currentUser;
            user.updatePassword(newPasswordedit).then(() => {
                if (!doc.empty) {
                    doc.forEach((doc) => {
                        doc.ref.update({
                            password: newPasswordedit
                        })
                    })
                }
                Alert.alert(
                    "Thông báo",
                    "Thành công",
                );
            }).catch((error) => {
                Alert.alert(
                    "Thông báo",
                    "Lỗi",
                );
            })
            
        }).catch((error) => {
            Alert.alert(
                "Thông báo",
                "Bạn đã đổi mật khẩu thất bại",
            );
        })
           
        setPasswordEdit(false)
    }

    const logoutuser = async () => {
        auth().signOut().then(() => {
            Alert.alert(
                "Thông báo",
                "Bạn có muốn thoát không?",
                [
                    {
                        text: "Đồng ý",
                        onPress: () => {
                            navigation.navigate('SignInScreen')
                        },
                    },
                ],
            );
        }).catch((error) => {
            Alert.alert(
                "Thông báo",
                "Bạn có muốn thoát không?",
            );
        })
        
    }
    // console.log(userdata);
    return (
        <View style={styles.containerout}>
       
            {edit == false && passwordedit ==false &&
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

                        <Text style={styles.hs}>Trang hồ sơ</Text>
                    </View>
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

                    <TouchableOpacity onPress={() => {
                        setEdit(!edit)
                    }} style={styles.btn}>
                        <View style={styles.viewbtn}>
                            <Text style={styles.btntxt}>Sửa hồ sơ</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => {
                        setPasswordEdit(!passwordedit)
                    }} style={styles.btn}>
                        <View style={styles.viewbtn}>
                            <Text style={styles.btntxt}>Đổi mật khẩu</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        logoutuser()
                    }} style={styles.btn}>
                        <View style={styles.viewbtn}>
                            <Text style={styles.btntxt}>Thoát</Text>
                        </View>
                    </TouchableOpacity>

                </View>}
            
            {edit == true &&   
                    <View style={styles.container}>
                        <View style={styles.headnav}>

                            <View style={styles.navbtn}>
                                <Icon
                                onPress={() => navigation.navigate('userprofile')}
                                    style={navbtnin}
                                    color={colors.primary_key}
                                    size={35}
                                    type='material-community'
                                    name='arrow-left'
                                />
                            </View>

                            <Text style={styles.hs}>Sửa hồ sơ</Text>
                    </View>
                    <TextInput style={styles.input} placeholder='Tên'
                        onChangeText={(e) => setNewName(e)} />
                    <TextInput style={styles.input} placeholder='Địa chỉ'
                        onChangeText={(e) => setNewAddress(e)} />
                    
                    <TouchableOpacity onPress={() => {
                        updateUser()
                    }} style={styles.btn}>
                        <View style={styles.viewbtn}>
                            <Text style={styles.btntxt}>Lưu</Text>
                        </View>
                    </TouchableOpacity>
                </View>}
            
            {passwordedit == true &&
                <View style={styles.container}>
                    <View style={styles.headnav}>

                        <View style={styles.navbtn}>
                            <Icon
                                onPress={() => navigation.navigate('userprofile')}
                                style={navbtnin}
                                color={colors.primary_key}
                                size={35}
                                type='material-community'
                                name='arrow-left'
                            />
                        </View>

                        <Text style={styles.hs}>Đổi mật khẩu</Text>
                    </View>
                    <TextInput style={styles.input} placeholder='Mật khẩu cũ'
                        onChangeText={(e) => setOldPasswordEdit(e)} />
                    <TextInput style={styles.input} placeholder='Mật khẩu mới'
                        onChangeText={(e) => setNewPasswordEdit(e)} />

                    <TouchableOpacity onPress={() => {
                        updatePassword()
                    }} style={styles.btn}>
                        <View style={styles.viewbtn}>
                            <Text style={styles.btntxt}>Lưu</Text>
                        </View>
                    </TouchableOpacity>
                </View>}

          
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
        fontSize: 20,
        color: colors.grey1,
        marginLeft: 5,
        fontWeight: '400'
    },
    containerin: {
        borderColor: colors.grey5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        elevation: 1
     
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
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewbtn: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#FF2400",
        height: 45,
        paddingHorizontal: 20,
        width: "95%",
        marginTop: 10
    },

    btntxt: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary_key, 
        marginBottom: 2
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10
    }, 
})