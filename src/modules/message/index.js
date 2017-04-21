
'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

const onRegisterButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const onLoginButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
export default class Message extends Component {

   static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          title: "消息",
          style: { backgroundColor: 'white'}
     }),
    cardStack: {
       gesturesEnabled: false  // 是否可以右滑返回
    }
  };
  onRegisterButtonPress(e){
      console.log("1111");
  };
  onLoginButtonPress(e){
      console.log("2222");
  };
  render() {
    return (
      <View style={styles.container}>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247,247,242)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
