/**
 * DataRepository
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 * @flow
 */

import {
    AsyncStorage,
} from 'react-native';

import Storage from '../Storage'
var storage        = new Storage()

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
    fetchRepository(url,parms){
        var self = this;
        return new Promise(function (resolve, reject) {
            self.fetchLocalRepository(url,parms).then((wrapData) => {
                // if (wrapData) {
                //     resolve(wrapData["items"],true);
                // }else{
                    self.fetchNetRepository(url,parms).then((data)=> {
                        resolve(data);
                    }).catch((error)=> {
                        reject(error);
                    })
                // }
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
    fetchNetRepository(url,parms,method='GET'){

    return new Promise((resolve,reject) => {
        storage.getItem('WBAuthorizeResponse').then((WBAuthorizeResponse) =>{
            const { accessToken }  = WBAuthorizeResponse
            if (!accessToken) {
               reject('未登录。。。。。') 
            }
            var bodyArray = []
            bodyArray.push(`access_token=${accessToken}`)

            if (method === 'GET') {
              for (let property in parms){
                bodyArray.push(`${property}=${parms[property]}`)
              }
            }else if(method === 'POST'){

            }
            var parmsStr = `?${bodyArray.join('&')}`
            var fetch_url =  `${url}${parmsStr}`

              fetch(fetch_url,{
                method: method,
              }).then((response) => {
                if (response.ok) {
                  return response.json()
                }
              }).then((json)=>{
                resolve(json)
                console.log(`url = ${url} json = ${json}`);
              }).catch((error) =>{
                reject(error)
            })
        }).catch((error) => {
            reject('未登录。。。。。') 
        })
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
