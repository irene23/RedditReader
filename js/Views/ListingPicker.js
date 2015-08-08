var React = require('react-native');

var {
    View,
    PickerIOS
    } = React;

var PickerItemIOS = PickerIOS.Item;

var listings = {
    hot: {
        name: "hot",
        value: "/hot"
    },
    "new": {
        name: "new",
        value: "/new"
    },
    random: {
        name: "random",
        value: "/random"
    },
    top: {
        name: "top",
        value: "/top"
    }
};

class ListingPicker extends React.Component {
    changeListing(listing) {
        this.props.updateListing(listing);
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <PickerIOS
                    selectedValue={this.props.listing}
                    onValueChange={(listing) => this.changeListing(listing)}>
                    {Object.keys(listings).map((listing) => (
                            <PickerItemIOS
                                key={listing}
                                value={listing}
                                label={listings[listing].name}
                                />
                        )
                    )}
                </PickerIOS>
            </View>
        )
    }
}

module.exports = ListingPicker;