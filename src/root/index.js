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
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation';

import Popular from '../modules/popular'
import PopularItem from '../modules/popularItem'
import Trending from '../modules/trending'
import MicroBlog from '../modules/microBlog'
import Favorite from '../modules/favorite'
import Mine from '../modules/mine'
import Setting from '../modules/setting'
import Register from '../modules/register'

const CustomTabBar = ({ navigation }) => {
  const { routes } = navigation.state;
  return (
    <View style={{ flexDirection: 'row', height: 30, backgroundColor: 'orange'}}>
      {routes.map(route => (
        <TouchableOpacity
          onPress = {() => navigation.navigate(route.routeName)}
          style   = {styles.tab}
          key     = {route.routeName}
        >
          <Text>{route.routeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const CustomTabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} />
      <ActiveScreen
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
      />
    </View>
  );
};

const CustomTabRouter = TabRouter({
    All: {
      screen:            PopularItem,
    },
    Android: {
      screen:            PopularItem,
    },
    iOS: {
      screen:            PopularItem,
    },
},{
  initialRouteName: 'All',
});

const CustomTabs = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView));

const RouteConfigs = 
{
    Popular: {
      screen:            CustomTabs,
      navigationOptions: {
        tabBar:    {
        label:     'Popular',
        icon:      ({focused,tintColor}) => (
            <Image 
            source = {focused ? require('../resources/image/tab/ic_polular.png'): require('../resources/image/tab/ic_polular.png')}
            style  = {{height:26 ,width: 26, tintColor:tintColor}}
            />),

        },
      },
    },
    Trending: {
      screen:            Trending,
      navigationOptions: {
        tabBar:            {
        icon:              ({focused,tintColor}) => (
           <Image 
          source = {focused ? require('../resources/image/tab/ic_trending.png'): require('../resources/image/tab/ic_trending.png')}
          style  = {{height:26 ,width: 26, tintColor:tintColor}}
          />),
          label: 'Trending',
        },
      },
    },
    Favorite: {
     screen:            Favorite,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
            <Image 
            source = {focused ? require('../resources/image/tab/ic_favorite.png'): require('../resources/image/tab/ic_favorite.png')}
            style  = {{height:26 ,width: 26, tintColor:tintColor}}
            />),
            label: 'Favorite',
        },
      }
    },
    Mine: {
     screen:            Mine,
     navigationOptions: {
        tabBar: {
          icon: ({focused,tintColor}) => (
              <Image source={focused ? require('../resources/image/tab/ic_my.png'): require('../resources/image/tab/ic_my.png')}
              style  = {{height:26 ,width: 26, tintColor:tintColor}}
              />),
              label: 'Mine',
        },
      }
    }
}
const TabNavigatorConfig = {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition:   'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled:     false, // 是否可以左右滑动切换tab
    tabBarOptions:    {
      activeTintColor:   'rgb(0,185,80)',// 文字和图片选中颜色
      inactiveTintColor: '#666666', // 文字和图片未选中颜色
      showIcon:          true, // android 默认不显示 icon, 需要设置为 true 才会显示
      showLabel:         true,
      lazyLoad:          false,
      swipeEnabled:     true,
      indicatorStyle:    {
        height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      tabStyle:{
        backgroundColor: 'rgb(0,185,80)'
      },
      style: {
         // backgroundColor: '#FFFFFF', // TabBar 背景色
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

const App = StackNavigator({
    TabBars: { screen: TabBars },
    Setting : { screen: Setting },
},{
    headerMode: 'screen' ,
    mode:  'card',
    // cardStyle:{   backgroundColor: 'red'},
    onTransitionStart:(next,before) =>{
      console.log('换场动画开始');
    },
    onTransitionEnd:(next,before) =>{
      console.log('换场动画结束');
    }
});

export default class WeiBo extends Component {

  render() {
    return (
      <App screenProps={{ta:''}}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 30,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  }
});