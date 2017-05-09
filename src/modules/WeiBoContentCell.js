
import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  TextInput,
} from 'react-native';

import TimerUIUtiles from '../UIUtils/TimerUIUtils'
import { screenWidth, screenHeight } from '../constants'
var timerUIUtiles  = new TimerUIUtiles()

export default class WeiBoContentCell extends Component {
      _rendHtlmText(item){
        //字符串截取
        var content = item.source
        let start = content.indexOf('>')
        let end = content.indexOf('</a>')
        if (start>0 && end>0){
          content = content.substring(start + 1,end)
        }
        let time = timerUIUtiles.formatDateTime1(item.created_at)
        return (
          <Text style = {styles.headerSubTitle}>
            <Text>{time}来自</Text>
            {<Text style = {{color: 'blue'}}>{content}</Text>}
          </Text>
        )
      }

     _renderHeaderViewItemView(item){
      return (
           <View style = {{backgroundColor:'white',flexDirection: 'row'}}>
              <Image source = {{url: item.user.avatar_hd}} style={styles.headerIcon} />
              <View style   = {{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                  <Text style = {styles.headerTitle}>{item.user.screen_name}</Text>
                  {this._rendHtlmText(item)}
              </View>
              <View style = {{justifyContent:'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.headerAttention}>
                  <Text style = {{fontSize:16, color:"orange"}}>+关注</Text>
                </TouchableOpacity>
              </View>
            </View>
      )
    }
    _rendContentView(item){
      return (
        <View style={{backgroundColor:'white'}}>
           <Text style={{marginLeft: 10, marginRight: 10, marginBottom: 10,color: '#333333'}}>
            {item.text}
           </Text>
         </View>
      )
    }
    _renderImaegsView(item){
      const { gif_ids_array_url } = item
      if (gif_ids_array_url && gif_ids_array_url.length > 0) {
          return (
           <View style = {{backgroundColor: 'white',flexDirection: 'row'}}>
              {
                  gif_ids_array_url.map((sub_item) =>{
                    return ( 
                        <Image
                         key    = {sub_item.key}
                         style  = {{width: (screenWidth - 10 - 2)/3.0,height: (screenWidth - 10 - 2)/3.0,backgroundColor: 'orange',marginRight: 1,marginTop: 1}}
                         source = {{url: sub_item.key}}
                        >
                        </Image>
                      )
                  })
               }
           </View>
        )
      }else{ return null } 
    }
    _renderBottomItemView(source,text){
      return (
        <TouchableOpacity style={styles.bottomItemView}>
            <Image source = {source} style  = {styles.bottomItemView_icon} />
            <Text style   = {{fontSize:16, color:"#999999"}}>{text}</Text>
        </TouchableOpacity>
      )
    }
    render(){
      const { item } = this.props
      return(
            <View style = {{flex: 1, width: '100%'}}>
              {this._renderHeaderViewItemView(item)}
              {this._rendContentView(item)}
              {this._renderImaegsView(item)}
              <View style = {styles.bottom}>
                  {this._renderBottomItemView(require('../resources/image/discover/statusdetail_icon_retweet.png'),item.reposts_count)}
                  {this._renderBottomItemView(require('../resources/image/discover/timeline_icon_comment.png'),item.comments_count)}
                  {this._renderBottomItemView(require('../resources/image/discover/timeline_icon_unlike.png'),item.attitudes_count)}
              </View>
          </View>
      )
    }
}

WeiBoContentCell.propTypes = {
    item:   React.PropTypes.object,
}
WeiBoContentCell.defaultProps = {

}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(247,247,242)',
  },
  welcome: {
    fontSize:  20,
    textAlign: 'center',
    margin:    10,
  },
  listHeaderTextInput: {
    backgroundColor: 'white',
    flex:            1, 
    marginLeft:      10,
    marginRight:     10, 
    marginTop:       10, 
    marginBottom:    10,
    borderRadius:    2,
    fontSize:        14,
  },
  headerIcon:{
    marginLeft:   10, 
    width:        50, 
    height:       50, 
    marginBottom: 10, 
    marginTop:    10,
    borderRadius: 25,
  },
  headerTitle:{
   marginLeft: 10,
   color:      '#333333',
  },
  headerSubTitle:{
    marginLeft: 10, 
    marginTop:  5, 
    color:      '#999999',
  },
  headerAttention:{
    justifyContent:  'center', 
    alignItems:      'center',
    marginRight:     10, 
    marginLeft:      10, 
    height:          30 ,
    width:           80,
    borderRadius:    3,
    borderWidth:     1,
    borderColor:     'rgb(225,225,225)',
    backgroundColor: 'rgb(247,247,242)',
  },
  itemImageContetent:{
    // marginTop:       5,
    marginBottom:    10,
    marginLeft:      10,
    marginRight:     10,
    backgroundColor: 'white',
  },
  bottom:{
    backgroundColor: 'white', 
    width:           '100%',
    flexDirection:   'row',
    borderTopWidth:  1, 
    borderColor:     'rgb(225,225,225)',
  },
  bottomItemView: {
    flexDirection:    'row',
    justifyContent:   'center', 
    alignItems:       'center',
    height:           30 ,
    flex:             3,
    marginTop:        10,
    marginBottom:     10,
    borderColor:      'rgb(225,225,225)',
    borderRightWidth: 1,
  },
  bottomItemView_icon: {
      marginRight: 4,
      marginTop:   1, 
      width:       20, 
      height:      20, 
  },
});
