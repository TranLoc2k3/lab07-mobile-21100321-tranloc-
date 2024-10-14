import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const TodoEditable = ({ route, navigation }) => {
  const [todo, setTodo] = useState("");
  const [task, setTask] = useState("");
  const { typeOfEdit, id } = route.params;

  useEffect(() => {
    if (typeOfEdit === "edit") {
      fetch('https://67037aeabd7c8c1ccd419458.mockapi.io/Task/' + id)
        .then(response => response.json())
        .then(data => {
          setTodo(data);
          setTask(data.task);
        });
    }
  }, [id, typeOfEdit]);

  const handlerEditableButton = () => {
    if (typeOfEdit === "edit") {
      fetch('https://67037aeabd7c8c1ccd419458.mockapi.io/Task/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
      })
      .then(response => response.json())
      .then(data => {
        navigation.navigate('TodoScreen');
      });
    }
    if (typeOfEdit === "add") {
      fetch('https://67037aeabd7c8c1ccd419458.mockapi.io/Task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: task })
      })
      .then(response => response.json())
      .then(data => {
        navigation.navigate('TodoScreen');
      });
    }
  } 

  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileAvatar}
          source={require("../assets/Images/avatar.png")}
        />
        <Text style={styles.profileName}>Your name</Text>
      </View>
      <View>
        <Text style={{fontSize: 24, textTransform: 'uppercase'}}>{typeOfEdit === "edit" ? "Edit your task" : "Add new task"}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Input"
          value={typeOfEdit === "edit" ? task : null}
          onChangeText={setTask}></TextInput>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlerEditableButton}
        >
          <Text>{typeOfEdit === "edit" ? "Update" : "Add new"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/Images/thumbnail.png")}
        ></Image>
      </View>
    </View>
  );
};

export default TodoEditable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 36,
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
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#3d3d3d",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: "#00BDD6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {},
});
