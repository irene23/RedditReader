var React = require('react-native');
var Row = require('./Row');

var {
    ListView,
    } = React;

class Listing extends React.Component {
    constructor(props) {
        super(props);
    }
    renderRow(rowData) {
        return (
            <Row data={rowData}></Row>
        )
    }
    render() {
        return (<ListView dataSource={this.props.dataSource} renderRow={this.renderRow}/>)
    }
}

module.exports = Listing;