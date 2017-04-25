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

import { Provider } from 'react-redux';
import { StackNavigator , TabNavigator} from 'react-navigation';

import Home from '../modules/home'
import Message from '../modules/message'
import MicroBlog from '../modules/microBlog'
import Discover from '../modules/discover'
import Mine from '../modules/mine'
import Setting from '../modules/setting'
import Register from '../modules/register'

import configureStore from '../store/index';

const RouteConfigs = 
{
    
    Home: {
      screen:            Home,
      navigationOptions: {
        tabBar:    {
        label:     '首页',
        icon:      ({focused,tintColor}) => (
            <Image 
            source={focused ? require('../resources/image/tab/tabbar_home_highlighted.png'): require('../resources/image/tab/tabbar_home.png')}/>),

        },
      },
    },
    Message: {
      screen:            Message,
      navigationOptions: {
        tabBar:            {
        icon:              ({focused,tintColor}) => (
        <Image 
          source = {focused ? require('../resources/image/tab/tabbar_message_center_selected.png'): require('../resources/image/tab/tabbar_message_center.png')}/>),
        label: '消息',
        },
      },
    },
    "MicroBlog": {
     screen:            MicroBlog,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image 
             source = {focused ? require('../resources/image/tab/compose_color_yellow_select.png'): require('../resources/image/tab/compose_color_yellow_select.png')}
             style  = {{marginTop: 10}}/>),
             label:' ',
        },
      }
    },
    Discover: {
     screen:            Discover,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image source={focused ? require('../resources/image/tab/tabbar_discover_highlighted.png'): require('../resources/image/tab/tabbar_discover.png')}/>),
            label: '发现',
        },
      }
    },
    Mine: {
     screen:            Mine,
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
      // lazyLoad:       false,
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
  
};

const TabBars = TabNavigator(RouteConfigs,TabNavigatorConfig)

const App = StackNavigator({
    TabBars: { screen: TabBars },
    Setting : { screen: Setting },
},{
    headerMode: 'screen' ,
    mode:  'card',
    // cardStyle:{   backgroundColor: 'red'},
    onTransitionStart:(next,before) =>{

      //viewWillDisappear
      let beforeIndex     = before.navigation.state.index
      // let beforeRouteName = before.navigation.state.routeName
      let beforeRoutes    = before.navigation.state.routes
      let beforeView      = beforeRoutes[beforeIndex]

      // let nextIndex       = next.navigation.state.index
      // // let nextRouteName   = next.navigation.state.routeName
      // let nextRoutes      = next.navigation.state.routes
      // let nextView        = nextRoutes[nextIndex]

      // if ((typeof(nextView) != 'undefined') && (typeof(nextView.params) != 'undefined')){ 
      //   //找到当前的Route 
      //     if (typeof(nextView.params.viewWillAppear) == 'function') {
      //       if (beforeIndex == 2) nextView.params.viewWillAppear()   
      //     }
      // }

      if ((typeof beforeView != 'undefined') && (typeof(beforeView.params) != 'undefined')){ 
          if (typeof beforeView.params.viewWillDisAppear  === 'function') {
             if (beforeIndex == 2)  beforeView.params.viewWillDisAppear()
          }
      }

     
   
      // //viewWillAppear
      // const {index, routes} = next.navigation.state
      // let beforeView = routes[index]
      // if ((typeof(beforeView) != 'undefined') && (typeof(beforeView.params) != 'undefined')){ 
      //     let  viewWillAppear = beforeView.params.viewWillAppear()
      //     if (typeof(viewWillAppear) == 'function') {
      //       viewWillAppear()
      //     }
      // }
   
      console.log('换场动画开始');
    //   let array = next.navigation.state.routes;
    //   let first = array[0];
    //    first.params.viewWillAppear()

    },
    onTransitionEnd:(next,before) =>{
      console.log('换场动画结束');
    }
});
//添加模态视图 确实是个不错的选择啊
const ModalApp= StackNavigator({
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
  constructor(props) {
    super(props);
  
    this.state = {
      isLoading: true,
      store: configureStore(()=>{this.setState({isLoading: false})})
    };
  }
  componentWillMount(){
    console.log("。。。。。。");
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <ModalApp screenProps={{ta:''}}/>
      </Provider>
    );
  }
}