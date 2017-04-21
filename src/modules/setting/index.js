
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
  Alert
} from 'react-native';


export default class Setting extends Component {
   constructor(props) {
    super(props);
    this.state = {
        testHidden: true
    };
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
      title: ({ state }) => `消息 ${state.params.user}`,
      header: (navigation, defaultHeader) => ({
          // visible: false , // 覆盖预设中的此项
          titleStyle:{color: '#333333'},
          right:(
           <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={navigation.state.params.handleSave}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>设置</Text>
              </TouchableOpacity>
        ),
          style: {backgroundColor: 'white'},    //导航栏背景颜色
     }),
  };
  render() {
     const { params } = this.props.navigation.state;
     const { testHidden } = this.state;
     if (testHidden) {
       return (
          <View style={styles.container}>
               <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigate("Setting",{ user: 'Lucy' })}
                 // onPress={()=> this.onSettingButtonPress()}
                 // onPress={this.onSettingButtonPress.bind(this)}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>Chat with {params.user}</Text>
              </TouchableOpacity>

               <TouchableOpacity 
                style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                 onPress={() => navigate("Setting",{ user: 'Lucy' })}
                 // onPress={()=> this.onSettingButtonPress()}
                 // onPress={this.onSettingButtonPress.bind(this)}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>Chat with {params.user}</Text>
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
            <Text style={{fontSize:16, color:"#333333"}}>Chat with {params.user}</Text>
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
