'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  Animated,
  Dimensions,
  NavigatorIOS,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from './styles.js';
import { StackNavigator } from 'react-navigation';

const onRegisterButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
const onLoginButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

export default class Home extends React.Component {
    static navigationOptions = {
      header: (navigation, defaultHeader) => ({
        title: "首页",
        visible: true , // 覆盖预设中的此项
        left: (
          <TouchableOpacity onPress={onRegisterButtonPress}>
            <View style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}}>
              <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>注册</Text>
            </View>
          </TouchableOpacity>
          ),
        right: (
          <TouchableOpacity onPress={onLoginButtonPress}>
            <View style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}}>
              <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登陆</Text>
            </View>
          </TouchableOpacity>
          ),
        tintColor: "gray",
        titleStyle:{color: '#333333'},
        tintColor:{color: 'green'},
        style: {backgroundColor: 'white'},    //导航栏背景颜色
     }),
    cardStack: {
       gesturesEnabled: false  // 是否可以右滑返回
    }
  };
 
  render() {
    return (

        <View style={styles.container}>
        
        </View>
    );
  }
}
