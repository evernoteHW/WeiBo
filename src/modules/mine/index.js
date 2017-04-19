
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
const onSettingButtonPress = () => {
  console.log( "......");
  // Alert.alert('Button has been pressed!');
  // navigation.navigate("Setting");
};
function renderLeft(state) {
    const { editing } = state.params || false;
    return (
        <Button
            title={editing ? 'Done' : 'Edit'}
            onPress={state.params.handleEdit}
        />
    );
}
export default class Mine extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // console.log('props');
     this.state = {
        testHidden: true
    };
    const {params} = this.props.navigation.state;
    console.log('constructor');
  
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
                 onPress={navigation.state.params.onSettingButtonPress}
                 >
                <Text style={{fontSize:16, color:"#333333"}}>设置</Text>
           </TouchableOpacity>
        ),
     }),
  };
   
  setParams(){
    console.log('test');
  }
  saveDetails() {
    Alert.alert('Save Details');
  }
  componentWillMount() {
      this.props.navigation.setParams({
          editing: false,
          handleEdit: this.handleEdit.bind(this),
      });
  }
  handleEdit() {
      this.props.navigation.setParams({
          editing: !this.props.navigation.state.params.editing,
      });
      console.log(this);
 }
  componentDidMount() {
    console.log('...............componentDidMount');
    this.props.navigation.setParams({ handleSave: this.saveDetails });
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
