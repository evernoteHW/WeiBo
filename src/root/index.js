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
Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Home from '../modules/home'
import Message from '../modules/message'
import Finance from '../modules/finance'
import Mine from '../modules/mine'
import Discover from '../modules/discover'
import Setting from '../modules/setting'

const TabBarSettings = [
  {
    title:"首页",
    icon:require('../resources/image/tab/tabbar_home.png'),
    selectedIcon:require('../resources/image/tab/tabbar_home_highlighted.png')
  },
  {
    title:"消息",
    icon:require('../resources/image/tab/tabbar_message_center.png'),
    selectedIcon:require('../resources/image/tab/tabbar_message_center_selected.png')
  },
  {
    title:"",
    icon:require('../resources/image/tab/compose_color_yellow_select.png'),
    selectedIcon:require('../resources/image/tab/compose_color_yellow_select.png')
  },
  {
    title:"发现",
    icon:require('../resources/image/tab/tabbar_discover.png'),
    selectedIcon:require('../resources/image/tab/tabbar_discover_highlighted.png')
  },
  {
    title:"我",
    icon:require('../resources/image/tab/tabbar_profile.png'),
    selectedIcon:require('../resources/image/tab/tabbar_profile_highlighted.png')
  }
]
const HomeNavigator = StackNavigator({Home:{screen: Home}});
const MessageNavigator = StackNavigator({Message:{screen: Message}});
const FinanceNavigator = StackNavigator({Finance:{screen: Finance}});
const DiscoverNavigator = StackNavigator({Discover:{screen: Discover}});
const MineNavigator = StackNavigator({
    Mine:{
      screen: Mine
    },
    Setting:{
      screen: Setting
    }
  }
);

export default class WeiBo extends Component {

constructor(props) {
  super(props);
  this.state = { selectedTabItem: 0 };
}
 _renderTab(Component, selectedTab) {
      return (
           <TabBarIOS.Item
                icon={TabBarSettings[selectedTab].icon}
                selectedIcon={TabBarSettings[selectedTab].selectedIcon}
                title={TabBarSettings[selectedTab].title}
                renderAsOriginal={true}
                onPress={() => {this.setState({selectedTabItem:selectedTab})}}
                selected={this.state.selectedTabItem == selectedTab}
                // style={{backgroundColor:'orange'}}
                >
              <Component />
           </TabBarIOS.Item>
      )
}

render() {
  return (
    <View style={styles.container}>
          <TabBarIOS style={{width: '100%'}}
            tintColor='#333333'
            >
            {this._renderTab(HomeNavigator, 0)}
            {this._renderTab(MessageNavigator, 1)}
            {this._renderTab(FinanceNavigator, 2)}
            {this._renderTab(DiscoverNavigator, 3)}
            {this._renderTab(MineNavigator, 4)}
          </TabBarIOS>
    </View>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
welcome: {
  fontSize: 20,
 
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
},
tabBarIcon: {
    width: 26, height: 26,
    resizeMode: 'contain',
},
tabBarSelectedIcon: {
    width: 26, height: 26,
    resizeMode: 'contain',
}
});