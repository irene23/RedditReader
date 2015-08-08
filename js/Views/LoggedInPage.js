'use strict';

var React = require('react-native');
var ListingPicker = require('./ListingPicker');
var Listing = require('./Listing');
var RedditUtil = require('./../Utils/RedditUtil');
var styles = require('./../Styles/Styles');

var {
    Text,
    View,
    ListView
    } = React;

class LoggedInPage extends React.Component {
    fetchData(listing="hot"){
        RedditUtil.getListing(listing).then((data)=>{
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data),
                loaded: true,
                listing: listing
            });
        });
    }
    componentDidMount(){
        this.fetchData();
    }
    updateListing(listing){
        this.fetchData(listing);
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            loaded: false,
            listing:"hot"
        };
    }
    render(){
        if(!this.state.loaded){
            return (
                <View style={styles.container2}>
                    <Text style={styles.loadingText}>
                        Fetching Posts...
                    </Text>
                </View>
            )
        }
        return (
            <View>
                <ListingPicker updateListing = {this.updateListing.bind(this)} listing = {this.state.listing}/>
                <Listing dataSource={this.state.dataSource} />
            </View>
        )
    }
}

module.exports = LoggedInPage;