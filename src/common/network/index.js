/**
 * DataRepository
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';

export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'}

export default class DataRepository {
    constructor(props) {
        // super(props)
        this.props = props;
    }
    /**
     * 请求数据
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    fetchRepository(url){
        var self = this;
        return new Promise(function (resolve, reject) {

            self.fetchLocalRepository(url).then((wrapData) => {
                if (wrapData) {
                    resolve(wrapData["items"],true);
                }else{
                    self.fetchNetRepository(url).then((data)=> {
                        resolve(data);
                    }).catch((error)=> {
                        reject(error);
                    })
                }
            }).catch((error) =>{

            })

            
        })
    }
    /**
     * 加在本地数据数据
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    fetchLocalRepository(url){
        return new Promise(function (resolve, reject) {
              AsyncStorage.getItem(url, (error, result)=> {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }
    /**
     * 请求网络
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    fetchNetRepository(url){
        var self = this;
        return new Promise(function (resolve, reject) {
          fetch(url)
                .then((response)=>response.json())
                .catch((error)=> {
                    reject(error);
                }).then((responseData)=> {
                    if (!responseData||!responseData.items) {
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(responseData.items);
                    self.saveRepository(url,responseData.items)
            }).done();
        })
    }
    /**
     * 缓存数据
     * @param  {[type]}   url      [description]
     * @param  {[type]}   items    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    saveRepository(url, items, callback) {
        if (!items || !url)return;
        let wrapData={items:items,date:new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }
    /**
     * 移除数据
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    removeRepository(url) {
        AsyncStorage.removeItem(url, (error, result)=> {
            if(error)console.log(error);
        });
    }
}
