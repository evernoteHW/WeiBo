
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


// const onSettingButtonPress = (e) => {
//   console.log( "......" + e.traget);
//   Alert.alert('Button has been pressed!');
// };

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = {
      title:"消息",
      //可以这么来写
      header: ({ state, setParams, goBack }) => {
        let right;
        // if (state.params.isSelected) {
            // right = (<Button title="取消" onPress={() => setParams({ isSelected: false })}/>);
        // } else {
            right = (<Button title="选择" onPress={() => setParams({ isSelected: true })}/>);
        // }
        let left = (<Button title="返回" onPress={() => goBack()}/>);
        let visible = false;  // 是否显示导航栏
        let titleStyle = {color: 'red'};
        return { right, left, visible ,titleStyle};
    },
     //  header: (navigation, defaultHeader, state, setParams, goBack) => ({
     //      visible: true , // 覆盖预设中的此项
     //      // title: "我的",
      
     //      backTitle:'返回',
     //      right: (
     //         // <Button
     //          // title={"23232"}
     //          // onPress={() => onSettingButtonPress(navigation)}
     //        // />
     //          <TouchableOpacity 
     //            style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
     //              onPress={() => navigation.navigate('Setting')}>
     //            <Text style={{fontSize:16, color:"#333333"}}>设置</Text>
     //          </TouchableOpacity>
     //      ),
     //      titleStyle:{color: '#333333'},
     //      tintColor:{color: 'green'},
     // }),
    cardStack: {
       gesturesEnabled: false  // 是否可以右滑返回
    }
  };
  setParams(){
    console.log('test');
  }
  onSettingButtonPress(navigation){
      navigation.navigate('Setting');
  }
  render() {
    return (
      <View style={styles.container}>
      
      </View>
    );
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
