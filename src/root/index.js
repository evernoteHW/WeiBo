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

const TabBarSettings = [
  {
    title:        "首页",
    icon:         require('../resources/image/tab/tabbar_home.png'),
    selectedIcon: require('../resources/image/tab/tabbar_home_highlighted.png')
  },
  {
    title:        "消息",
    icon:         require('../resources/image/tab/tabbar_message_center.png'),
    selectedIcon: require('../resources/image/tab/tabbar_message_center_selected.png')
  },
  {
    title:        "",
    icon:         require('../resources/image/tab/compose_color_yellow_select.png'),
    selectedIcon: require('../resources/image/tab/compose_color_yellow_select.png')
  },
  {
    title:        "发现",
    icon:         require('../resources/image/tab/tabbar_discover.png'),
    selectedIcon: require('../resources/image/tab/tabbar_discover_highlighted.png')
  },
  {
    title:        "我",
    icon:         require('../resources/image/tab/tabbar_profile.png'),
    selectedIcon: require('../resources/image/tab/tabbar_profile_highlighted.png')
  }
]

const NavigationBarRouteMapper = {
    LeftButton: (route, navigator, index, navState)  => {},
    RightButton: (route, navigator, index, navState) => {},
    Title: (route, navigator, index, navState)       => {
       return <Text >{route.title}{333}</Text>
    },
};
export default class WeiBo extends Component {

    constructor(props) {
      super(props);
      this.state = { selectedTabItem: 0 };
    }
     _renderTab(Component, selectedTab) {
          return (
               <TabBarIOS.Item
                    icon             = {TabBarSettings[selectedTab].icon}
                    selectedIcon     = {TabBarSettings[selectedTab].selectedIcon}
                    title            = {TabBarSettings[selectedTab].title}
                    renderAsOriginal = {true}
                    onPress          = {() => {this.setState({selectedTabItem:selectedTab})}}
                    selected         ={this.state.selectedTabItem == selectedTab}
                    // style         = {{backgroundColor:'orange'}}
                    >
                   <Navigator
                      initialRoute = {{index: 0}}
                      renderScene  = {(route, navigator) =>
                        <Component {...this.props}
                         />
                      }
                      navigationBar = {
                          <Navigator.NavigationBar 
                            {...this.props}
                            routeMapper = { NavigationBarRouteMapper } 
                            style       = {{flex: 1, width:'100%',backgroundColor:'white'}}
                          />
                      }
                    />
               </TabBarIOS.Item>
          )
    }

    render() {
      return (
        <View style={styles.container}>
              <TabBarIOS 
                  style        = {{width: '100%'}}   //TabBar样式
                  tintColor    = '#333333'           //选中文字的颜色
                  barTintColor = 'white'             //标签栏背景
                >
                {this._renderTab(Home,      0)}
                {this._renderTab(Message,   1)}
                {this._renderTab(MicroBlog, 2)}
                {this._renderTab(Discover,  3)}
                {this._renderTab(Mine,      4)}
              </TabBarIOS>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:            1,
      justifyContent:  'center',
      alignItems:      'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
    },
    instructions: {
      textAlign:    'center',
      color:        '#333333',
      marginBottom: 5,
    },
    tabBarIcon: {
      width:      26, height: 26,
      resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
      width:      26, 
      height:     26,
      resizeMode: 
      'contain',
    }
});