'use strict';

var React = require('react-native');
var RedditUtil = require('./../Utils/RedditUtil');
var styles = require('./../Styles/Styles');

var {
    Text,
    View,
    LinkingIOS
    } = React;

class RedditLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.processLogin.bind(this);
    }
    processLogin(){
        RedditUtil.autorize().then((resp)=>{
            if(resp){
                this.props.updateLoginState(true);
            }
        }).catch(()=>{
            this.props.updateLoginState(false);
        });
    }
    render() {
        return (
            <View style={styles.containerLogin}>
                <View style={styles.head}>
                    <Text style={styles.title}
                          onPress={this.processLogin.bind(this)}>
                        Login
                    </Text>
                </View>
            </View>
        )
    }
}

module.exports = RedditLoginPage;