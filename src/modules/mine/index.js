
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

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action:    NavigationActions.navigate({ routeName: 'Setting'})
})


export default class Mine extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
      title: '我',
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          visible: true , // 覆盖预设中的此项
          style: { backgroundColor: 'white'},
          // backTitle: "返回",
          right:(
           <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigation.state.params.onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>设置</Text>
           </TouchableOpacity>
        ),
     }),
  };
  componentWillMount() {

  }
  componentDidMount() {
    this.props.navigation.setParams({ onSettingButtonPress: this.onSettingButtonPress });
  }
  onSettingButtonPress(navigation){
      /*第一种方式 Push*/
      navigation.navigate('Setting', {user: 'Lucy'})
      /*第二种方式 Push*/
      // navigation.dispatch(navigateAction)
  }
  /**
   * 登陆
   * @return {[type]} [description]
   */
  onLoginButtonPress(navigate){
    navigate('Register', {user: 'Lucy'})
    console.log("登陆");
  }
  /**
   * 注册
   * @return {[type]} [descripnavigation.navigate('Register', {user: 'Lucy'})tion]
   */
  onRegisterButtonPress(navigate){
    navigate('Register', {user: 'Lucy'})
    // navigation.navigate('Register', {user: 'Lucy'})
    console.log("注册");
  }
  render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>

           <ScrollView 
           contentContainerStyle={styles.contentContainer}
           automaticallyAdjustContentInsets={false}
           // contentInset={{top: 0, bottom: 49}}
           >
              <View style={styles.header}> 
                <Image 
                  style  = {styles.headerBg}
                  source = {require('../../resources/image/mine/page_cover_tv_background.jpg')}/>
                <Image 
                  style = {styles.headerIcon}
                  source = {{uri: 'http://img05.tooopen.com/images/20150202/sy_80219211654.jpg'}} 
                />
              </View>
              <View style = {{flexDirection:'row',alignItems:'center',backgroundColor:'#FFFFFF', height: 40}} >
	             	<Text style = {{marginLeft: 20,color:'#000000', fontSize:14}}>关注</Text>
	              <Text style = {{marginLeft: 2,color:'#333333', fontSize:12}}>快看大家都在关注他</Text>
              </View>
              <View style={{justifyContent:'center',alignItems:'center', height: screenHeight - 40 - 200 - 49 - 64}} >
                <Text style={{color:'#999999', fontSize:14}}>
                  登陆后，你的微博，相册个人资料
                </Text>
                 <Text style={{color:'#999999', fontSize:14}}>
                  会显示在这里，展示给别人
                </Text>
                <View style={{marginTop: 20, flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={styles.registerBtn} 
                        onPress={() => this.onRegisterButtonPress(navigate)}
                         >
                        <Text style={{fontSize:16, color:"orange"}}>注册</Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                        style={styles.loginBtn} 
                        onPress={() => this.onLoginButtonPress(navigate)}
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
    // flexDirection:  'row',
    backgroundColor: 'rgb(247,247,242)',
  },
  contentContainer: {
    // position:           'absoulute',
    // // width:              '100%',
    // left : 0,
    // right: 0,
    // bottom: 0,
    // top: 100,
    // resizeMode:         'cover'
    // paddingBottom:   49,
    // height: screenHeight - 49 - 64,
    // backgroundColor: 'red',
  },
  headerBg:{
    // flex:       1,
    // resizeMode: 'cover',
    // alignSelf:  'auto',
    // width:      '100%',
    // height:     300,
    // flex:       1,
    width:           "100%",
    height:          '100%',
    backgroundColor: '#123456', 
  },
  header:{
    justifyContent:  'center', 
    alignItems:      'center',
    height:          200
  },
  headerIcon:{
    left:         (screenWidth - 80)/2.0,
    position:     'absolute', 
    width:        80,
    height:       80,
    borderRadius: 40,
    backgroundColor: '#123456',
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
