//https://alligator.io/react/geolocation-react-native/
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';



import { MapView, Constants } from 'expo';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
    };
  }

  findCoordinates = () => {
    //https://facebook.github.io/react-native/docs/geolocation
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        const lat = JSON.stringify(position.coords.latitude);
        const lon = JSON.stringify(position.coords.longitude)

        this.setState({ location });
        this.setState({ lat });
        this.setState({ lon });
      },
      error => {
        console.log(error);
        Alert.alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.paragraph}>Find My Coords?</Text>
          <Text style={styles.paragraph}>Location: {this.state.location}</Text>
          <Text style={styles.paragraph}>{this.state.lat}</Text>
          <Text style={styles.paragraph}>{this.state.lon}</Text>
          <MapView>        
              style={{flex: 1}}        
              region={{       
              latitude: this.state.lat,          
              longitude: this.state.lon,          
              latitudeDelta: 0.0922,          
              longitudeDelta: 0.0421        }}    
              showsUserLocation={true}      
		      </MapView>

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
  // instructions: {
  //   textAlign: "center",
  //   color: "#333333",
  //   marginBottom: 5
  // }
});
