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
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>注册</Text>
              </TouchableOpacity>
          ),
        right: (
          <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
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
  viewWillAppear(){
    console.log('viewWillAppear');
  }
  viewDidAppear(){
    console.log('viewDidAppear');
  }
  viewWillDisAppear(){
    console.log('viewWillDisAppear');
  }
  viewDidDisAppear(){
    console.log('viewDidDisAppear');
  }

componentDidFocus(){
  console.log('componentDidFocus');
}
componentDidMount() {
   this.props.navigation.setParams({ onSettingButtonPress: this.onSettingButtonPress });
   this.props.navigation.setParams({ 'a': '33' });
   // this.props.navigation.setParams({ viewWillDisAppear: this.viewWillDisAppear});
}
componentWillMount(){
  console.log("componentWillMount");
}
onSettingButtonPress(navigation){
      /*第一种方式 Push*/
      navigation.navigate('Register', {user: 'Lucy'})
      /*第二种方式 Push*/
      // navigation.dispatch(navigateAction)
  }
  render() {
    return (

        <View style={styles.container}
        >
        
        </View>
    );
  }
}
