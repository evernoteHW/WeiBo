
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
  Button
} from 'react-native';

import { NavigationActions } from 'react-navigation'
const onSettingButtonPress = (navigation) => {
  console.log( "......");
  // Alert.alert('Button has been pressed!');
  // navigation.navigate("Setting");
};

export default class Mine extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // console.log('props');
     this.state = {
        testHidden: true
    };
    // this.onSettingButtonPress.bind(this)
    const { params } = this.props.navigation.state;
    // const {state, setParams} = navigation;
    // const isInfo = this.state.params.mode === 'info';
    // const {user} = this.state.params;
  }
  static navigationOptions = {
      header: (navigation, defaultHeader, state, setParams, goBack) => ({
          visible: true , // 覆盖预设中的此项
          title:"消息",
          backTitle:'返回',
          right: (
             // <Button
              // title={"23232"}
              // onPress={() => onSettingButtonPress(navigation)}
            // />
              <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 // onPress={() => navigation.navigate("Setting",{ user: 'Lucy' })}
                 onPress={()=> setParams({testHidden:false})}
                 // onPress={onSettingButtonPress(navigation)}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>设置</Text>
              </TouchableOpacity>
          ),
          titleStyle:{color: '#333333'},
          tintColor:{color: 'green'},
     }),
    cardStack: {
       gesturesEnabled: false  // 是否可以右滑返回
    }
  };
  setParams(){
    console.log('test');
  }
  onSettingButtonPress(){
    console.log('test/////////////////');
      // navigation.navigate('Setting');
  }
  render() {
    const { params } = this.props.navigation.state;

     if (this.state.testHidden) {
       return (
          <View style={styles.container}>
               <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigate("Setting",{ user: 'Lucy' })}
                 // onPress={()=> this.onSettingButtonPress()}
                 // onPress={this.onSettingButtonPress.bind(this)}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>Chat with </Text>
              </TouchableOpacity>

               <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigate("Setting",{ user: 'Lucy' })}
                 // onPress={()=> this.onSettingButtonPress()}
                 // onPress={this.onSettingButtonPress.bind(this)}
                 >
                <Text style={{fontSize:16, color:"red"}}>Chat with </Text>
              </TouchableOpacity>
          </View>
        );
     }else{
      return (
      <View style={styles.container}>
           <TouchableOpacity 
            style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
             onPress={() => navigate("Setting",{ user: 'Lucy' })}
             // onPress={()=> this.onSettingButtonPress()}
             // onPress={this.onSettingButtonPress.bind(this)}
             >
            <Text style={{fontSize:16, color:"red"}}>Chat with 3232</Text>
          </TouchableOpacity>
      </View>
    );

     }
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
