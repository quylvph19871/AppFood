import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors, titles, styleButton, buttonTitle } from '../globals/styles'
import { Icon } from 'react-native-elements'

const HomeHeadNav = () => {
    return (
        <View>
            <View style={styles.headicon}>
                <Icon
                    type='material-community'
                    name='menu'
                    color={colors.white}
                    size={35} />
                
                <Text style={styles.text}>Food</Text>

                <Icon
                    type='material-community'
                    name='account-circle-outline'
                    color={colors.white}
                    size={35} />

            </View>

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
    text:{
        alignSelf: 'center',
        color: colors.white,
        fontSize: 30
        
        
    }

})