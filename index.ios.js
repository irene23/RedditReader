'use strict';

var React = require('react-native');
var RedditLoginPage = require('./js/Views/RedditLoginPage');
var LoggedInPage = require('./js/Views/LoggedInPage');
var styles = require('./js/Styles/Styles');
var RedditUtil = require('./js/Utils/RedditUtil');

var {
    AppRegistry,
    NavigatorIOS
    } = React;

class VP extends React.Component {
    constructor(props) {
        super(props);
        RedditUtil.isTokenExpired().done((isTokenExpired)=>{
            this.setState({
                redditLoggedIn:!isTokenExpired
            })
        });
        this.state = {
            redditLoggedIn:false
        }
    }
    updateLoginState(redditLoggedIn){
        this.setState({redditLoggedIn})
    }
    render(){
        if(this.state.redditLoggedIn){
            return (<LoggedInPage/>)
        } else {
            return (<RedditLoginPage updateLoginState={this.updateLoginState.bind(this)}/>)
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                tintColor='#FF6600'
                initialRoute={{
		            title: 'Reddit News',
		            component: VP
	        }}/>
        );
    }
}

AppRegistry.registerComponent('RedditProject', () => App);
