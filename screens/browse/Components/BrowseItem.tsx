import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Picture } from "../../../types/Picture";

const { height } = Dimensions.get("screen");

interface Props {
  picture: Picture;
  onPress: () => void;
}
export const BrowseItem = ({ picture, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image source={{ uri: picture.url }} style={styles.thumbnail} />
        <LinearGradient colors={["transparent", "rgba(0,0,0,1)"]} style={styles.titleContainer}>
          <Text style={styles.title}>{picture.title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: height * 0.01,
    marginHorizontal: height * 0.01,
    borderRadius: 10,
  },
  thumbnail: {
    width: "100%",
    height: height / 3,
    borderRadius: 10,
  },
  titleContainer: {
    position: "absolute",
    width: "100%",
    padding: height * 0.01,
    paddingTop: height * 0.1,
    bottom: 0,
    borderRadius: 10,
  },
  title: {
    fontSize: height * 0.015,
    color: "white",
    width: "100%",
  },
});
