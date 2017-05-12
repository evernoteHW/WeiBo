'use strict'

import React, { Component } from 'react';

import {
  Text,
  Image,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import Popular from '../modules/popular'
import PopularItem from '../modules/popularItem'
import Trending from '../modules/trending'
import MicroBlog from '../modules/microBlog'
import Favorite from '../modules/favorite'
import Mine from '../modules/mine'
import Setting from '../modules/setting'
import Register from '../modules/register'
import PopularConfigure from '../common/popularConfigure'
import ImageBrowser from '../modules/imageBrowser'

const RouteConfigs = 
{
    Popular: {
      screen:            Popular,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon:      ({focused,tintColor}) => (
            <Image 
            source = {focused ? require('../resources/image/tab/tabbar_home_highlighted.png'): require('../resources/image/tab/tabbar_home.png')}
            style  = {{height:30 ,width: 30, tintColor:tintColor}}
            />),

      },
    },
    Trending: {
      screen:            Trending,
      navigationOptions: {
        tabBarLabel:        '消息',
        tabBarIcon:              ({focused,tintColor}) => (
           <Image 
          source = {focused ? require('../resources/image/tab/tabbar_message_center_selected.png'): require('../resources/image/tab/tabbar_message_center.png')}
          style  = {{height:30 ,width: 30, tintColor:tintColor}}
          />),
      },
    },
   SendWeiBo: {
     screen:            Favorite,
     navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({focused,tintColor}) => (
            <Image 
            source = {require('../resources/image/tab/tabbar_sendweibo.png')}
            style  = {{height:40 ,width: 40,marginTop: 14,resizeMode: 'contain'}}
            />),
      }
    },
    Favorite: {
     screen:            Favorite,
     navigationOptions: {
        tabBarLabel: '发现',
        tabBarIcon: ({focused,tintColor}) => (
            <Image 
            source = {focused ? require('../resources/image/tab/tabbar_discover_highlighted.png'): require('../resources/image/tab/tabbar_discover.png')}
            style  = {{height:30 ,width: 30, tintColor:tintColor}}
            />),
      }
    },
    Mine: {
     screen:            Mine,
     navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon:  ({focused,tintColor}) => (
              <Image source={focused ? require('../resources/image/tab/tabbar_profile_highlighted.png'): require('../resources/image/tab/tabbar_profile.png')}
              style  = {{height:30 ,width: 30, tintColor:tintColor}}
              />),
      }
    }
}
const TabNavigatorConfig = {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition:   'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled:     false, // 是否可以左右滑动切换tab
    tabBarOptions:    {
      activeTintColor:   '#333333',// 文字和图片选中颜色
      inactiveTintColor: '#666666', // 文字和图片未选中颜色
      showIcon:          true, // android 默认不显示 icon, 需要设置为 true 才会显示
      showLabel:         true,
      lazyLoad:          false,
      swipeEnabled:     true,
      indicatorStyle:    {
        height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      tabStyle:{
        backgroundColor: 'orange'
      },
      style: {
         backgroundColor: '#FFFFFF', // TabBar 背景色
      },
      tabStyle:{
        tintColor: 'red'
      },
      labelStyle: {
         // fontSize: 15, // 文字大小
      },
      // pressOpacity: 1,
    },
  
};

const TabBars = TabNavigator(RouteConfigs,TabNavigatorConfig)
// const MultiNavigator = (routeConfigs) => {
//   const modalNavigatorRoutes = {};
//   Object.keys(routeConfigs).forEach(routeName => {
//     const InnerNavigator = StackNavigator(routeConfigs);
//     modalNavigatorRoutes[routeName + 'Modal'] = { screen: InnerNavigator };
//   });
//   return StackNavigator(modalNavigatorRoutes, {mode: 'modal'});
// };
const App = StackNavigator({
    TabBars: { screen: TabBars },
    Setting: { screen: Setting },
    PopularConfigure: { screen: PopularConfigure },
},{
    headerMode:           'screen' ,
    mode:                 'card',
    // cardStyle:      {   backgroundColor: 'rgb(0,0,0,0)'},
    // onTransitionStart: (next,before) =>{
    //   console.log('换场动画开始');
    // },
    // onTransitionEnd:(next,before) =>{
    //   console.log('换场动画结束');
    // }
});
// const ModalApp = StackNavigator({
//     App:          { screen: App },
//     ImageBrowser: { screen: ImageBrowser },
// },{
//     headerMode:    'none' ,
//     mode:          'modal',
// });


export default class WeiBo extends Component {

  render() {
    return (
      <App screenProps={{ta:''}}/>
    );
  }
}