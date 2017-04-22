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
    console.log('home_viewWillAppear');
  }
  viewWillDisAppear(){
    console.log('home_viewWillDisAppear');
  }

  componentDidMount() {
    console.log('home_componentDidMount');
     this.props.navigation.setParams({
      onSettingButtonPress: this.onSettingButtonPress ,
      viewWillAppear:     this.viewWillAppear,
      viewWillDisAppear:  this.viewWillDisAppear,
    });
  }
  componentWillMount(){
    console.log("home_componentWillMount");
  }
  onSettingButtonPress(navigation){
        /*第一种方式 Push*/
        navigation.navigate('Register', {user: 'Lucy'})
        /*第二种方式 Push*/
        // navigation.dispatch(navigateAction)
   }
  render() {
    return (

        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../../resources/image/home/visitordiscover_feed_image_house.png')}/>
            <Text style={{fontSize:14, color:'#999999',marginTop: 40}}>关注一些人，回这里看看有什么惊喜</Text>
            <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',backgroundColor:'white',marginTop: 40, height: 40, width: 100, borderWidth: 1, borderColor:'rgb(213,213,213)', borderRadius: 2}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:15, color:'rgb(253,169,70)'}}>去关注</Text>
            </TouchableOpacity>
          </View>

        </View>
    );
  }
}
