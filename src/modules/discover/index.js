
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
export default class Discover extends Component {

   static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          visible: true , // 覆盖预设中的此项
          title: (
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
              style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
              onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"#333333"}}>热门</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"#333333"}}>明星</Text>
              </TouchableOpacity>
            </View>),
          visible: {true},
          left: (
              <TouchableOpacity 
              style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
              onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>注册</Text>
              </TouchableOpacity>
            ),
          right: (
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                onPress={onRegisterButtonPress}>
                  <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          tintColor: "gray",
          titleStyle:{color: 'green'},
          tintColor:{color: 'green'},
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
    backgroundColor: '#666666',
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
