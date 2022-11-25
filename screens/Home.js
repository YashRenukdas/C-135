import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import axios from "axios"
import { Alert } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      imagePath: "",
      url: "https://03dc-61-2-53-97.in.ngrok.io",
    };
  }

  componentDidMount() {
    //call getPlanets function here so that the data is fetched as soon as the screen is mounted
    this.getPlanets()
  }

  getPlanets = () => {
    //write the codee to fetch the planet data from the API
    const{url} = this.state;
    // We will call the axios.get function and we will pass the state named URL through it
    axios.get(url).then(Response => {
      // We want to wait until we get the data from API so we use the then function after it
      this.setState({
        // Once we have fetched the data we will store it in the listData state
        listData: Response.data.data
      })
    })
    // We'll also add the .catch function after this incase there is an error.
     .catch(error => {
      Alert.alert(error.message)
     })
  };



  /*this function will determine the imagePath state depending on the planetType*/
  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  /*this function will be used in the flatlist. You need to complete this function by observing the data*/
  renderItem = ({ item, index }) => {
    this.setDetails(item);
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          { backgroundColor: this.selectColor(index), opacity: 0.7 },
        ]}
        onPress = {() => this.props.navigation.navigate("Details",{planet_name : item.name})}

      >
        <Image
          source={this.state.imagePath}
          style={styles.cardImage}
        ></Image>

        <View style={styles.nameCardPlanet}>
          <Text style={styles.title}> 

          {item.name}
          
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /*this function will be used in the flatlist*/
  keyExtractor = (item, index) => index.toString();

  /*this function will help to select a color for the cards on the flatlist*/
  selectColor = (index) => {
    var color = ["#fbffd5", "#ffefff", "#ede5ff", "#eafff4"];
    var num = index % 4;
    return color[num];
  };

  render() {
    const { listData } = this.state;

    if (listData.length != 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView
            style={{
              marginTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          />
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1, paddingTop: 20 }}
          >
            <View style={styles.upperContainer}>
              <Text style={styles.headerText}>Planets World</Text>
            </View>
            <View style={styles.lowerContainer}>
            {/* make a flatlist below that will display the whole planet list that we have fetched from the API*/}
            <FlatList 
            // We learn that data flatlist has 3 important.
            // The keyExtractor function and the renderitem function we have already defined.
            keyExtractor = {this.keyExtractor}
            data = {this.state.listData}
            renderItem = {this.renderItem}/>



            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1, paddingTop: 20 }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={styles.headerText}>Loading...</Text>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },
  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    fontFamily: "monospace",
    textAlign: "center",
  },
  listContainer: {
    backgroundColor: "#eeecda",
  },
  listItem: {
    padding: 15,
    margin: "2.5%",
    width: "45%",
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "white",
  },
  cardImage:{
    width: 100,
    height: 100,
    paddingTop: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  nameCardPlanet:{
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  }
});
