import {useState} from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function LoginScreen({navigation}) {
    const [name, setName] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image
          style={styles.thumbnail}
          source={require("../assets/Images/thumbnail.png")}
        />
      </View>
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <View style={styles.inputContainer}>
        <View style={{ marginRight: 12 }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/icons/mail.png")}
          ></Image>
        </View>
        <TextInput
          style={{ fontSize: 16, color: "#3d3d3d" }}
          placeholder="Enter your name"
          onChangeText={(text) => {
            setName(text)
          }}
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {
        navigation.navigate('TodoScreen', {name: name})
      }}>
        <Text>Get started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  thumbnailContainer: {
    marginBottom: 20,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: "bold",
    transform: "uppercase",
    fontSize: 24,
    color: "#8353E2",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 2,
  },
  buttonContainer: {
    backgroundColor: "#00BDD6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
  },
});
