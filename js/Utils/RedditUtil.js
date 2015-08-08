'use strict';

var React = require('react-native');

var {
    LinkingIOS,
    AsyncStorage
    } = React;

var RedditUtil = (function (){
    let apiLink = "https://oauth.reddit.com/";
    let redirectUrl = "https://www.reddit.com/api/v1/authorize.compact?client_id=RtlayCWggKEXmg&response_type=code&state=3eb9327-f40e-4ef1-8020-1c36af1b4b70&redirect_uri=myapplication://google.com&duration=temporary&scope=identity,read";
    let token = null;

    function isAutorized(){
        return !!token;
    }

    function isTokenExpired(){
        return Promise.all([AsyncStorage.getItem('@AsyncStorage:token'), AsyncStorage.getItem('@AsyncStorage:time')]).then(([storedToken, time]) => {
            if((new Date() - new Date(time)) < 3600000 && storedToken){
                token = storedToken;
                return false
            }
            return true;
        })
    }

    function autorize(){
        LinkingIOS.openURL(redirectUrl);
        return new Promise(function(resolve, reject){
            LinkingIOS.addEventListener('url', (resp)=>{
                let respObj = parseUrl(resp.url);
                if(respObj.code){
                    getToken(respObj.code).then((data)=>{
                        if(data.ok){
                            token=JSON.parse(data._bodyText)['access_token'];
                            AsyncStorage.setItem('@AsyncStorage:token', token);
                            AsyncStorage.setItem('@AsyncStorage:time', new Date().toISOString());
                            resolve(token);
                        }
                    }).catch((e)=>{
                        reject("Login failed");
                    })
                } else {
                    reject("Login failed");
                }
            })
        })
    }

    function getToken(code){
        var key = btoa("RtlayCWggKEXmg" + ':' + "");
        return fetch("https://www.reddit.com/api/v1/access_token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': `Basic ${key}`
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=myapplication://google.com`
        })
    }

    function getListing(listing){
        return fetch(`${apiLink}${listing}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': `bearer ${token}`
            }
        }).then((resp)=>{
            let response = JSON.parse(resp._bodyText);
            response = response.data ?
                            response.data.children :
                            response.reduce((res, obj)=>{
                                return res = res.concat(obj.data.children),res;
                            },[]);
            return Promise.resolve(response);
        });
    }

    function parseUrl(url){
        let qs = url.split('+').join(' ');

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }
    return {
        autorize,
        isAutorized,
        getListing,
        isTokenExpired
    }
})();

module.exports = RedditUtil;
