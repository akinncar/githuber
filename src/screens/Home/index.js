import React from "react";
import {
  TextInput,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

import styles from "./styles";

export default function Home() {
  const [text, setText] = React.useState("");
  const [resultUsers, setResultUsers] = React.useState([]);
  const [listUsers, setListUsers] = React.useState([]);
  const [loading, activeLoading] = React.useState(false);

  async function searchUser() {
    activeLoading(true);
    setText("");
    Keyboard.dismiss();

    const response = await api.get(`/search/users?q=${text}`);

    if (response.data.incomplete_results) {
      return;
    }

    setResultUsers(response.data.items);

    activeLoading(false);
  }

  async function switchUsers(item) {
    if (listUsers.find((user) => user == item)) {
      let userIndex;
      await listUsers.map((user, index) => user == item && (userIndex = index));
      let listUsersCopy = await listUsers.slice();
      await listUsersCopy.splice(userIndex, 1);
      setListUsers(listUsersCopy);
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

      <View style={styles.userList}>
        <TouchableOpacity onPress={() => switchUsers(item)}>
          <Ionicons
            name={listUsers.includes(item) ? "md-remove" : "md-add"}
            size={32}
            color={listUsers.includes(item) ? "red" : "green"}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await Linking.openURL(item.html_url);
          }}
        >
          <Ionicons
            name="logo-github"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Search a github user"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={() => searchUser()}
          style={styles.buttonContainer}
        >
          <Text style={styles.button}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={"#000"} />
      ) : (
        resultUsers.length > 0 && (
          <>
            <Text style={styles.listTitle}>Results</Text>

            <FlatList
              height={Dimensions.get("screen").height * 0.2}
              style={styles.listUsers}
              data={resultUsers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )
      )}

      {listUsers.length > 0 && (
        <>
          <Text style={styles.listTitle}>Your list</Text>

          <FlatList
            height={Dimensions.get("screen").height * 0.2}
            style={styles.listUsers}
            data={listUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
}
