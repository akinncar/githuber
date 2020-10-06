import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import api from "axios";

export default function App() {
  const [text, setText] = React.useState("");
  const [resultUsers, setResultUsers] = React.useState([]);
  const [listUsers, setListUsers] = React.useState([]);

  React.useEffect(() => {
    console.log(text);
  }, [text]);

  async function searchUser() {
    console.log("here");

    const response = await api.get(
      `https://api.github.com/search/users?q=${text}`
    );

    if (response.data.incomplete_results) {
      return;
    }

    console.log(response.data.items);
    setResultUsers(response.data.items);
  }

  async function switchUsers(item) {
    if (listUsers.find((user) => user == item)) {
      let userIndex;
      await listUsers.map((user, index) => user == item && (userIndex = index));
      let listUsersCopy = await listUsers.slice();
      await listUsersCopy.splice(userIndex, 1);
      setListUsers(listUsersCopy);

      // let resultUserIndex;
      // await resultUsers.map(
      //   (user, index) => user == item && (resultUserIndex = index)
      // );
      // let resultUsersCopy = await resultUsers.slice();
      // await resultUsersCopy.splice(resultUserIndex, 1);
      // setResultUsers(resultUsersCopy);
    } else {
      setListUsers([...listUsers, item]);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.userListContainer}>
      <View style={styles.userList}>
        <Image
          style={styles.avatarUrl}
          source={{
            uri: item.avatar_url,
          }}
        />
        <Text>{item.login}</Text>
      </View>

      <TouchableOpacity
        onPress={async () => {
          await Linking.openURL(item.html_url);
        }}
      >
        <Text>View in browser</Text>
      </TouchableOpacity>

      <Button
        onPress={() => switchUsers(item)}
        title={listUsers.includes(item) ? "Remove" : "Add"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        style={styles.input}
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder="Search a github user"
      />
      <Button
        onPress={() => searchUser()}
        title="Search"
        style={styles.button}
      />

      {resultUsers && (
        <>
          <Text style={styles.listTitle}>List searched users</Text>

          <FlatList
            height={Dimensions.get("screen").height * 0.2}
            width={Dimensions.get("screen").width - 36}
            data={resultUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      {listUsers && (
        <>
          <Text style={styles.listTitle}>List added users</Text>

          <FlatList
            height={Dimensions.get("screen").height * 0.2}
            width={Dimensions.get("screen").width - 36}
            data={listUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 38,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: Dimensions.get("screen").width - 36,
    paddingHorizontal: 18,
    marginVertical: 12,
  },

  button: {
    marginVertical: 12,
  },

  listTitle: {
    paddingVertical: 6,
    fontWeight: "bold",
    fontSize: 18,
  },

  userListContainer: {
    flexDirection: "row",
    paddingVertical: 6,
    justifyContent: "space-between",
  },

  userList: {
    flexDirection: "row",
    paddingVertical: 6,
  },

  avatarUrl: {
    width: 35,
    height: 35,
  },
});
