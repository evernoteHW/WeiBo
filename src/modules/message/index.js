
'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Image,
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
  viewWillAppear(){
    console.log('msg_viewWillAppear');
  }
  viewWillDisAppear(){
    console.log('msg_viewWillDisAppear');
  }

  componentDidMount() {
     this.props.navigation.setParams({
      'viewWillAppear':     this.viewWillAppear,
      'viewWillDisAppear':  this.viewWillDisAppear,
    });
  }
  onRegisterButtonPress(e){
      console.log("1111");
  };
  onLoginButtonPress(e){
      console.log("2222");
  };
  render() {
    return (
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../../resources/image/home/visitordiscover_image_message.png')}/>
            <Text style={{fontSize:14, color:'#999999',marginTop: 0}}>登陆后，别人评论你的微博，给你</Text>
            <Text style={{fontSize:14, color:'#999999',marginTop: 0}}>发消息，都会在这里收到通知</Text>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',backgroundColor:'white',marginRight: 20,marginTop: 20, height: 40, width: 100, borderWidth: 1, borderColor:'rgb(213,213,213)', borderRadius: 2}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:15, color:'rgb(253,169,70)'}}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',backgroundColor:'white',marginTop: 20, height: 40, width: 100, borderWidth: 1, borderColor:'rgb(213,213,213)', borderRadius: 2}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:15, color:'rgb(253,169,70)'}}>登录</Text>
            </TouchableOpacity>
            </View>
          </View>

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
