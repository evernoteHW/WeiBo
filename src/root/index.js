'use strict'

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  Navigator,
  Image,
  Button,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import Home from '../modules/home'
import Message from '../modules/message'
import MicroBlog from '../modules/microBlog'
import Discover from '../modules/discover'
import Mine from '../modules/mine'
import Setting from '../modules/setting'
import Register from '../modules/register'

const RouteConfigs = 
{
    Home: {
      screen: Home,
      navigationOptions: {
        tintColor: "red" ,
        tabBar: {
          label: '首页',
          icon: ({focused,tintColor}) => (
            <Image source={focused ? require('../resources/image/tab/tabbar_home_highlighted.png'): require('../resources/image/tab/tabbar_home.png')}/>),
          titleStyle: {
             color: 'green'
          }
        },
      },
    },
    Message: {
      screen: Message,
       navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image source={focused ? require('../resources/image/tab/tabbar_message_center_selected.png'): require('../resources/image/tab/tabbar_message_center.png')}/>),
          label: '消息',
        },
      },
    },
    "MicroBlog": {
     screen: MicroBlog,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image 
            source={focused ? require('../resources/image/tab/compose_color_yellow_select.png'): require('../resources/image/tab/compose_color_yellow_select.png')}
            style={{marginTop: 10}}/>),
          label:' ',
        },
      }
    },
    Discover: {
     screen: Discover,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image source={focused ? require('../resources/image/tab/tabbar_discover_highlighted.png'): require('../resources/image/tab/tabbar_discover.png')}/>),
          label: '发现',
        },
      }
    },
    Mine: {
     screen: Mine,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image source={focused ? require('../resources/image/tab/tabbar_profile_highlighted.png'): require('../resources/image/tab/tabbar_profile.png')}/>),
          label: '我',
        },
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
      // lazyLoad:          false,
      indicatorStyle:    {
        height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      style: {
         backgroundColor: '#FFFFFF', // TabBar 背景色
      },
      labelStyle: {
         // fontSize: 15, // 文字大小
      },
    },
   //  navigationOptions: {
   //       header:  {
   //        visible: true,
   //        style:   {
   //          backgroundColor: 'white',
   //        },    //导航栏背景颜色
   //     },
   // },
};


const TabBars = TabNavigator(RouteConfigs,TabNavigatorConfig)

const App = StackNavigator({
    TabBars: { screen: TabBars },
    Setting : { screen: Setting },
},{
    headerMode: 'screen' ,
    mode:  'card',
    // cardStyle:{   backgroundColor: 'red'},
    onTransitionStart:(a,b,c,d,e) =>{
      console.log(`onTransitionStart.....1${e},${b},${c},${d},${e}`);
    },
    onTransitionEnd:(a,b,c,d,e) =>{
      console.log(`onTransitionEnd.......2${e},${b},${c},${d},${e}`);
    }
});
//添加模态视图 确实是个不错的选择啊
const ModelApp= StackNavigator({
    App: {
        screen: App,
        navigationOptions: {
         header: {
          visible: false,
          style:   {backgroundColor: 'white'},    //导航栏背景颜色
       },
   },
    },
    Register: { screen: Register },
    },{
        headerMode: 'screen' ,
        mode:  'modal',
})

export default class WeiBo extends Component {
  render() {
    return (
      <ModelApp />
    );
  }
}