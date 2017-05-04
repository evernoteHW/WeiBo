
'use strict'
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
  RefreshControl,
  Animated,
  Modal,
} from 'react-native';

import ProjectModel from '../../model/ProjectModel'
import DataRepository from '../../common/network'
import { screenWidth, screenHeight } from '../../constants'
import PopularConfigure from '../../common/popularConfigure'

var dataRepository = new DataRepository()

export default class PopularItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
          listData:    [],
          visible:     false,
          refreshing:  false,
          bounceValue: new Animated.Value(1),
          decayValue:  new Animated.Value(400),
          fadeAnim:    new Animated.Value(1), 
          springValue: new Animated.Value(400),
        };

   }
   static navigationOptions = {
      header: (navigation, defaultHeader) => ({
          ...defaultHeader,
          title:      '设置',
          titleStyle: { color: 'white'},
          visible:    true , // 覆盖预设中的此项
          style:      { backgroundColor: 'rgb(0,185,80)'},
          right:(
            <View style = {{flexDirection: 'row'}}>
               <TouchableOpacity
                 abc   = {this}
                 style   = {{marginRight: 10, marginTop: 1}}  
                 // onPress = {() =>{ navigation.state.params.moreClick()}}
                 onPress = {() =>{ navigation.navigate('PopularConfigure')}}
                 >
                <Image 
                  style  = {{width:25, height: 25}} 
                  source = {require('../../resources/image/home/ic_search_white_48pt.png')}/>
             </TouchableOpacity>
               <TouchableOpacity 
                 style   = {{marginRight: 10}}
                 // onPress = {() =>{ navigation.state.params.searchClick()}}
                 onPress = {() =>{ navigation.navigate('PopularConfigure')}}
                 >
                <Image 
                  style  = {{width:25, height: 25}} 
                  source = {require('../../resources/image/home/ic_more_vert_white_48pt.png')}
                />
             </TouchableOpacity>
            </View>
        ),
     }),
  
    };

  fetchData(){
    dataRepository.fetchRepository('https://api.github.com/search/repositories?q=all&sort=stars').then((wrapData) =>{
      let projectModels = [];
      for (var i = 0; i < wrapData.length; i ++) {
          let item = wrapData[i];
          projectModels.push(new ProjectModel(item.id, item.name,item.full_name,item.owner.avatar_url,item.description,item.created_at));
      }
      this.setState({ listData: projectModels, refreshing: false })
    })
  } 
  moreClick(abc){
    console.log('23123');
    this.setState({ visible: true })
  }
  searchClick(abc){
    this.setState({ visible: true })
  }
  dismiss(){
    this.setState({ visible: false })
  }
  componentDidMount() {
    this.props.navigation.setParams({ 
      moreClick: this.moreClick.bind(this), 
      searchClick: this.searchClick.bind(this) 
    });
    this.fetchData()
  }

  renderItem({item, index}) {
      return(
        <View style = {{flex: 1, width: '100%'}} key={index}>
            {this._renderHeaderViewItemView(item)}
            {this._rendContentView(item)}
        </View>
     )
  }

  _renderImaegsView(){
    return (
       <View style = {{backgroundColor: 'white'}}>
             <FlatList
                  style      = {styles.itemImageContetent}
                  data       = {this.state.listData}
                  renderItem = {({item}) => 
                    <Image
                     style  = {{width: (screenWidth - 10 - 2)/3.0,height: (screenWidth - 10 - 2)/3.0,backgroundColor: 'orange',marginRight: 1,marginTop: 1}}
                     source = {require('../../resources/image/mine/page_cover_tv_background.jpg')}
                     >
                    </Image>}
              />

      </View>
    )
  }
  _rendContentView(item){
    return (
      <View style={{backgroundColor:'white'}}>
         <Text style = {{marginLeft: 10, marginRight: 10, marginBottom: 10,}}>
         {item.description}
         </Text>
       </View>
    )
  }
  _renderHeaderViewItemView(item){
    return (
         <View style={{backgroundColor:'white',flexDirection: 'row'}}>
            <Image source = {{url: item.avatar_url}} style={styles.headerIcon} />
            <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
                <Text style={styles.headerTitle}>{item.name}}</Text>
                <Text style={styles.headerSubTitle}>{item.created_at}}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
              <TouchableOpacity style={styles.headerAttention}>
                <Text style={{fontSize:16, color:"orange"}}>+关注</Text>
              </TouchableOpacity>
            </View>
          </View>
    )
  }
  _onRefresh(){
    this.fetchData()
  }
  _renderBottomItemView(source,text){
    return (
      <TouchableOpacity style={styles.bottomItemView}>
          <Image source = {source} style  = {styles.bottomItemView_icon} />
          <Text style   = {{fontSize:16, color:"#999999"}}>{text}</Text>
      </TouchableOpacity>
    )
  }
  _listFooterComponent() {
      return (
        <View style={{flex:1,height:70,justifyContent:'center',alignItems:'center'}}>
          <Text>上啦加载更多</Text>
        </View>
        )
  }
  _itemSeparatorComponent(){
    return (
        <View style={{flex:1,height:10}}>
        </View>
      )
  }
 
  renderModal(){
    return (
     
          <Modal
              animationType  = 'none'
              transparent    = {true}
              visible        = {this.state.visible}
              onRequestClose = {() => {alert("Modal has been closed.")}}
              >
                <TouchableOpacity 
                  // onPress = {thss.dismiss.bind(this)}}
                    onPress = {() =>{ console.log('hhahaha')}}
                >
                    <PopularConfigure />
              </TouchableOpacity>
            
          </Modal>
        
    )
  }
  render() {
    return (
      <View style={styles.container}>
          {this.renderModal()}
          
          <FlatList
              style                  = {{backgroundColor: 'rgb(242,242,242)', width: '100%',}}
              data                   = {this.state.listData}
              renderItem             = {this.renderItem.bind(this)}
              ItemSeparatorComponent = {this._itemSeparatorComponent.bind(this)}
              refreshControl         = {
                      <RefreshControl
                          refreshing = {this.state.refreshing}
                          onRefresh  = {() => this._onRefresh()}
                          tintColor  = 'rgb(0,185,80)'
                          title      = "Loading..."
                          titleColor = 'orange'
                          colors     = {['#ff0000', '#00ff00', '#0000ff']}
                      />}
          />
      
      </View>
    );
  }
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
