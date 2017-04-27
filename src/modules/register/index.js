
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
  Alert,
  TextInput,
  Image,
} from 'react-native';

import { logIn } from '../../actions/user';
import { connect } from 'react-redux';

class Register extends Component {
   constructor(props) {
    super(props);
    this.state = {
        username: 'sup1',
        password: '123456',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }   
  saveDetails() {
    // this.setState{testHidden: false}
    Alert.alert('Save Details');
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.props.navigation.setParams({ handleSave: this.saveDetails });
   
  }
  static navigationOptions = {
      title: ({ state }) => `设置 ${state.params.user}`,
      mode:  'modal',
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          // headerModel: 'screen',
          visible: true,
          left:(
           <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => { navigation.goBack()}}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>关闭</Text>
           </TouchableOpacity>
          ),
          right:(
           <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => { navigation.goBack()}}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>注册</Text>
           </TouchableOpacity>
        ),
        style: {backgroundColor: 'white'},    //导航栏背景颜色
     }),
  }
  
  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.user.name === 'juju') {
      const { navigation } = this.props;
      setInterval(() =>{
          navigation.goBack()
          console.log(`登录成功！${nextProps.user.name}`);
      }, 500);
      
      return false
    }
    return true
  }
  handleLogin(){
     console.log('登录中');

     let opt = {
            'name': this.state.username,
            'password': this.state.password,
     };
     this.props.dispatch(logIn(opt));
  }
  render() {
    const { navigation } = this.props;
       return (
          <View style={styles.container}>
               <Image 
                  style  = {{backgroundColor: 'green', width: 80, height: 80, borderRadius: 40}}
                  source = {{uri: 'http://img05.tooopen.com/images/20150202/sy_80219211654.jpg'}}/>
               <TextInput 
                  style       = {{
                    marginLeft:         10,
                    marginRight:        10, 
                    height:             40,
                    borderBottomWidth:  1, 
                    borderColor:        'red',
                    // backgroundColor: 'orange',
                    fontSize:           14, 
                    color:              '#999999',
                  }}
                  placeholder = '手机号或邮箱'
                />
               <TextInput 
                  style={{
                    marginLeft:        10,
                    marginRight:       10, 
                    height:            40,
                    borderBottomWidth: 1, 
                    // backgroundColor:   'gray',
                    fontSize:          14, 
                    color:             '#999999',
                  }}
                    placeholder = '密码'
                />
               <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 10, marginRight:10,height:40 ,width:'100%',backgroundColor: 'orange'}} 
                 onPress={this.handleLogin}>
                <Text style={{fontSize:16, color:"white"}}>登陆</Text>
              </TouchableOpacity>
          </View>
       )    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

function select(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
    }
}

export default connect(select)(Register);
