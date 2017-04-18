
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
      header: (navigation, defaultHeader) => ({
          visible: true , // 覆盖预设中的此项
          title: "我",
          right: (
             <Button
              title={"23232"}
              onPress={() => onSettingButtonPress(navigation)}
            />
              //<TouchableOpacity 
                //style={{justifyContent:'center', alignItems: 'center',marginLeft: 7, height:30 ,width: 58}} 
                  //onPress={() => {
                    //navigation.navigate('Setting');
                 //}}>
                //<Text style={{fontSize:16, color:"#333333"}}>设置</Text>
              //</TouchableOpacity>
          ),
          titleStyle:{color: '#333333'},
          tintColor:{color: 'green'},
     }),
    cardStack: {
       gesturesEnabled: false  // 是否可以右滑返回
    }
  };
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
