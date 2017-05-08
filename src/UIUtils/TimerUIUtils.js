

export default class TimerUIUtils {

    /**
     * time format eq: 2017-05-06 00:00:00
     * @param  {[type]} inputTime [description]
     * @return {[type]}           [description]
     */
    formatDateTime(inputTime) {    
        var date = new Date(inputTime);  
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    };  

     /**
     * time format eq: 2017-05-06 00:00:00
     * @param  {[type]} inputTime [description]
     * @return {[type]}           [description]
     */
    formatDateTime1(inputTime) {    
        var date = new Date(inputTime); 
        var today = Date.parse(new Date());

        var timestamp_compare = date/1000;  
        var timestamp_today = today/1000;  
        //超过3天 显示日期 2017-05-06
        //3天内现实 3天前 2天前 1天前
        //1天内  23小时前。。。。等
        //5分钟内 刚刚
        if (timestamp_today - timestamp_compare > 3 * 24 * 60 * 60 ) {
            var y = date.getFullYear();    
            var m = date.getMonth() + 1;    
            m = m < 10 ? ('0' + m) : m;    
            var d = date.getDate();    
            d = d < 10 ? ('0' + d) : d;    
            var h = date.getHours();  
            h = h < 10 ? ('0' + h) : h;  
            return  `${y}-${m}-${d}`
        }
        else if(timestamp_today - timestamp_compare < 3 * 24 * 60 * 60 && timestamp_today - timestamp_compare > 2 * 24 * 60 * 60){
            return '三天前'
        }
        else if(timestamp_today - timestamp_compare < 2 * 24 * 60 * 60 && timestamp_today - timestamp_compare > 1 * 24 * 60 * 60){
            return '两天前'
        }
        else if(timestamp_today - timestamp_compare < 1 * 24 * 60 * 60 && timestamp_today - timestamp_compare > 5 * 60){
            return '一天前'
        }else{
            return '刚刚'
        }
    };  
}
