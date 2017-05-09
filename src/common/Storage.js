


import {
  AsyncStorage,
} from 'react-native';


export default class Storage  {

	 getItem(key){
        return new Promise(function (resolve, reject) {
              AsyncStorage.getItem(key, (error, result)=> {
                if (!error && result) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    /**
     * 缓存数据
     * @param  {[type]}   key      [description]
     * @param  {[type]}   items    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    setItem(key, value) {
          return new Promise(function (resolve, reject) {
              AsyncStorage.setItem(key,value, (error, result)=> {
                if (!error) {
                    try {
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }
    /**
     * 移除数据
     * @param  {[type]} key [description]
     * @return {[type]}     [description]
     */
    removeItem(key) {
          return new Promise(function (resolve, reject) {
              AsyncStorage.removeItem(key, (error, result)=> {
                if (!error) {
                    try {
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }
}