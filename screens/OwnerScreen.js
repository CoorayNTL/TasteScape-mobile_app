import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OwnerScreen = ({route}) => {
    

  return (
    <View style={styles.container}>
      <Text>User Type: </Text>
      <Text>OwnerScreen</Text>
    </View>
  )
}

export default OwnerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
