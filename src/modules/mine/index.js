
'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  Platform,
  TouchableOpacity,
  ScrollView,
  Button,
  Image
} from 'react-native';

import { screenWidth, screenHeight } from '../../constants'
import { NavigationActions } from 'react-navigation'

export default class Mine extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
      title: '我',
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          visible: true , // 覆盖预设中的此项
          titleStyle:{color: '#333333'},
          right:(
           <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>设置</Text>
           </TouchableOpacity>
        ),
        style: {backgroundColor: 'white'},    //导航栏背景颜色
     }),
  };
  componentWillMount() {

  }
  componentDidMount() {
    this.props.navigation.setParams({ onSettingButtonPress: this.onSettingButtonPress });
  }
  onSettingButtonPress(navigation){
      navigation.navigate('Setting', {user: 'Lucy'})
  }
  /**
   * 登陆
   * @return {[type]} [description]
   */
  onLoginButtonPress(){
    console.log("登陆");
  }
  /**
   * 注册
   * @return {[type]} [description]
   */
  onRegisterButtonPress(){
    console.log("注册");
  }
  render() {
    const { params } = this.props.navigation.state;
      return (
        <View style={styles.container}>
           <ScrollView 
           contentContainerStyle={styles.contentContainer}
           automaticallyAdjustContentInsets={false}
           contentInset={{top: 0, bottom: 49}}
           >
              <View style={{backgroundColor:'#123456', height: 200}}> 
               <Image  />
                  
              </View>
              <View style = {{flexDirection:'row',alignItems:'center',backgroundColor:'#FFFFFF', height: 40}} >
	             	<Text style = {{marginLeft: 20,color:'#000000', fontSize:14}}>关注</Text>
	              <Text style = {{marginLeft: 2,color:'#333333', fontSize:10}}>快看大家都在关注他</Text>
              </View>
              <View style={{justifyContent:'center',alignItems:'center', height: screenHeight - 40 - 200 - 49}} >
                <Text style={{color:'#999999', fontSize:14}}>
                  登陆后，你的微博，相册个人资料
                </Text>
                 <Text style={{color:'#999999', fontSize:14}}>
                  会显示在这里，展示给别人
                </Text>
                <View style={{marginTop: 20, flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={styles.registerBtn} 
                        onPress={() => this.onRegisterButtonPress()}
                         >
                        <Text style={{fontSize:16, color:"orange"}}>注册</Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                        style={styles.loginBtn} 
                        onPress={() => this.onLoginButtonPress()}
                         >
                        <Text style={{fontSize:16, color:"#999999"}}>登陆</Text>
                   </TouchableOpacity>
                </View>
                   
              </View>
           
          </ScrollView>
        </View>
        
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: 'rgb(247,247,242)',
  },
  contentContainer: {
    paddingBottom:   49,
    // backgroundColor: 'red',
  },
  loginBtn: {
    justifyContent: 'center', 
    alignItems:     'center',
    marginLeft:     7, 
    height:         30 ,
    width:          100, 
    marginLeft:     10, 
    borderWidth:    1,
    borderColor:    '#999999'
  },
  registerBtn: {
    justifyContent: 'center', 
    alignItems:     'center',
    marginRight:    10, 
    height:         30 ,
    width:          100, 
    borderWidth:    1, 
    borderColor:    '#999999'
  },
  instructions: {
    textAlign:    'center',
    color:        '#333333',
    marginBottom: 5,
  },
});
