import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

export default function TodoScreen({ navigation }) {
  const [todos, setToDos] = useState([]);

  useEffect(() => {
    fetch("https://67037aeabd7c8c1ccd419458.mockapi.io/Task", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setToDos(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [todos]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.todoContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileAvatar}
            source={require("../assets/Images/avatar.png")}
          />
          <Text style={styles.profileName}>Your name</Text>
        </View>

        <FlatList
          style={{ width: "100%", height: 500 }}
          data={todos}
          renderItem={({ item }) => {
            return (
              <View style={styles.todoItemContainer}>
                <Text style={styles.todoText}>{item.task}</Text>
                <View style={styles.todoEditable}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TodoEditable", { typeOfEdit: 'edit', id: item.id })
                    }
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../assets/icons/editable.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("TodoEditable", { typeOfEdit: 'add' })}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff" }}
            >
              {" "}
              +{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 36,
  },
  todoContainer: {
    width: "100%",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  todoItemContainer: {
    position: "relative",
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    backgroundColor: "#a3a3a3",
  },
  todoText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  todoEditable: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#00BDD6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
