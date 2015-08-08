var React = require('react-native');
var styles = require('./../Styles/Styles');

var {
    Text,
    View,
    TouchableHighlight,
    Image,
    LinkingIOS
    } = React;

class ImageRow extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <TouchableHighlight           activeOpacity={0.6}
                                      underlayColor={'white'}
                                      onPress={() => this.props.data.url && LinkingIOS.openURL(this.props.data.url)}>
          <View style={styles.containerRow}>
              <View style={styles.containerRow}>
                  <Image source={{
                    uri : this.props.data.thumbnail=="nsfw" ?
                            this.props.data.url :
                            this.props.data.thumbnail
                  }} style={styles.image} />
              </View>
            <View style={styles.postDetailsContainer}>
              <Text style={styles.postTitle}>
                {this.props.data.title}
              </Text>
              <View style={styles.separator}/>
            </View>
          </View>
        </TouchableHighlight>
    )
  }
}

class TextRow extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <TouchableHighlight>
          <View style={styles.containerRow}>
            <View style={styles.postDetailsContainer}>
              <Text style={styles.postTitle}>
                {this.props.data.selftext || this.props.data.title || this.props.data.body}
              </Text>
              <View style={styles.separator}/>
            </View>
          </View>
        </TouchableHighlight>
    )
  }
}


class Row extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var row = (this.props.data.data.thumbnail && !~["default","self"].indexOf(this.props.data.data.thumbnail)) ?
        <ImageRow data={this.props.data.data}/> : <TextRow data={this.props.data.data}/>;
    return (
        <View>
          {row}
        </View>
    )
  }
}

module.exports = Row;