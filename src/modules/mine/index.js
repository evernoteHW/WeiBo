
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
var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
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
                  // source = {{uri: base64Icon}} 
                  // onLoadStart={(e) => {
                  //   console.log("onLoadStart");
                  // }}
                  // onLoad={(e) => {
                  //   console.log("onLoad");
                  // }}
                  // onProgress={(e) => {
                  //   let progress = Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)
                  //   console.log("onProgress ===>" + progress + "%");
                  // }}
                  // onLoadEnd={(e) => {
                  //   console.log("onLoadEnd");
                  // }}
                  // onError={(e) => {
                  //   console.log("onError  " + e.nativeEvent.error);
                  // }}
                />
              </View>
              <View style = {{flexDirection:'row',alignItems:'center',backgroundColor:'#FFFFFF', height: 40}} >
	             	<Text style = {{marginLeft: 20,color:'#000000', fontSize:14}}>关注</Text>
	              <Text style = {{marginLeft: 2,color:'#333333', fontSize:12}}>快看大家都在关注他</Text>
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
