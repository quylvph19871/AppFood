import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors, titles, styleButton, buttonTitle } from '../globals/styles'
import { Icon } from 'react-native-elements'

const HomeHeadNav = ({ navigation }) => {
    return (
        <View >
            <View style={styles.headicon}>
                <Icon
                    type='material-community'
                    name='menu'
                    color={colors.white}
                    size={35} />

                <Text style={styles.text}>Food</Text>

                <Icon
                    onPress={() => navigation.navigate('userprofile')}
                    type='material-community'
                    name='account-circle-outline'
                    color={colors.white}
                    size={35} />

            </View>

            {/* <View style={styles.inputout}>
                <Icon
                    style={styles.icon}
                    type='material'
                    name='search'
                />
                <TextInput style={styles.input} placeholder='Search'
                    onChangeText={(text) => {

                    }} />
            </View> */}



        </View>
    )
}

export default HomeHeadNav
const styles = StyleSheet.create({
    headicon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary_key,
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
    text: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: 30
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
    headnav: {
        backgroundColor: colors.primary_key,
        elevation: 5,
        height: 100,
    },

})