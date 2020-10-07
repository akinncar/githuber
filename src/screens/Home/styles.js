import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 38,
  },

  searchContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    paddingHorizontal: 12,
    flexDirection: "row",
  },

  inputContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    height: 40,
    width: Dimensions.get("screen").width,
    // borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 12,
    marginRight: 8,
  },

  input: {
    height: 40,
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  buttonContainer: {
    borderRadius: 8,
    backgroundColor: "#000",
    color: "#FFF",
    height: 40,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  button: {
    color: "#FFF",
  },

  listTitle: {
    paddingVertical: 6,
    fontWeight: "bold",
    fontSize: 18,
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  listUsers: {
    width: Dimensions.get("screen").width,
    paddingHorizontal: 18,
  },

  userListContainer: {
    flexDirection: "row",
    paddingVertical: 6,
    justifyContent: "space-between",
  },

  userList: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 4,
  },

  avatarUrl: {
    borderRadius: 70,
    width: 45,
    height: 45,
    marginRight: 8,
  },

  icon: {
    paddingLeft: 12,
  },
});

export default styles;
