//https://alligator.io/react/geolocation-react-native/
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
  Header
} from 'react-native';



import {  MapView, Constants } from 'expo';

export default class App extends Component {
  constructor(props) {
    super();

    //Defining a variable in current state as null
     this.state = {
       location: null,
     };
  }

  findCoordinates = () => {
    //https://facebook.github.io/react-native/docs/geolocation
    //getCurrentposition has 3 paramaters -> (success, error, options)
    //that is the order we have defined the function in
    //we can also use variables(success, error, options) to define the values (as a tuple) and then pass those variables in the function call
    //Eg : navigator.geolocation.getCurrentPosition(success, error, options);

    navigator.geolocation.getCurrentPosition(
      position => {
        //this will store the position details in location
        const location = JSON.stringify(position);
        //to get the value of latitude
        const lat = JSON.stringify(position.coords.latitude);
        //to get the value of longitude
        const lon = JSON.stringify(position.coords.longitude);

        //changing the value of location from null to position in current state(Same for other variables too)
        this.setState({ location });
        this.setState({ lat });
        this.setState({ lon });
      },
      //exception handling
      error => {
        console.log(error);
        Alert.alert(error.message);
      },
      //position options
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      
      <View style={styles.container}>
        //touchable Opacity basiccally turns the entire view into a button 
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.paragraph}>Find My Coords?</Text>
          <Text style={styles.paragraph}>Location: {this.state.location}</Text> //using location from current state
          <Text style={styles.paragraph}>{this.state.lat}</Text> // using latitude from current state
          <Text style={styles.paragraph}>{this.state.lon}</Text> //using longitude from current state
          
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    //padding: 8,
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: '#F5FCFF',
  },
  paragraph: {
    fontSize: 20,
    //textAlign: "center",
    margin: 10,
    //margin: 24,
    //fontWeight: 'bold',
  },
});
