import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../modules/home';
import Finance from '../modules/finance';
import Mine from '../modules/mine';

export const FeedStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  }
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBar: {
        label: '首页',
        // icon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      },
    },
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBar: {
        label: '我的',
        // icon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
      },
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  }
);
