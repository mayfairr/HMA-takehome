import React from "react";
import { Picture } from "../../types/Picture";
import { View, Text, Image, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Indicator } from "../../Components/ActivityIndicator";
const { height } = Dimensions.get("screen");

interface Props {
  route: any;
  navigation: any;
}

export const DetailScreen = ({ route, navigation }: Props) => {
  const picture: Picture = route.params?.picture;

  const [loadingImage, setLoadingImage] = React.useState<boolean>(true);
  const [showEntireCaption, setShowEntireCaption] = React.useState<boolean>(false);

  /*
  This entire implementation is flawed, usually you would have an api with a lot of basic data, i.e. 
  {id: number,
  title: string,
  thumbnail: string,}

  and then you can look up a certain picture by id and get the rest of the data.

  but since (I don't think) there is a route for this and we load the data all at once we can't do that.
  This would dramtically increase performance and furthermore it would be a the best practice.
 */
  return (
    <View>
      <View>
        <Image source={{ uri: picture.hdurl }} style={styles.image} onLoadEnd={() => setLoadingImage(false)} />
        {loadingImage && <Indicator text="Loading Image" style={styles.indicator} />}
        <SafeAreaView style={styles.absoluteContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.versionContainer}>
            <Ionicons name="chevron-back-outline" size={height * 0.04} />
          </TouchableOpacity>
          <View style={styles.versionContainer}>
            <Text style={styles.title}>{picture.service_version}</Text>
          </View>
        </SafeAreaView>
      </View>
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>{picture.title}</Text>
          <Text>{picture.date}</Text>

          <Text numberOfLines={showEntireCaption ? -1 : 5} style={styles.caption}>
            {picture.explanation}
          </Text>
          <TouchableOpacity onPress={() => setShowEntireCaption((_old) => !_old)}>
            <Text style={styles.buttonText}>{showEntireCaption ? "Show less" : "Show more"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: height / 3,
  },
  title: {
    fontSize: height * 0.03,
    fontWeight: "500",
  },
  caption: {
    fontSize: height * 0.017,
    marginVertical: height * 0.01,
    fontWeight: "300",
  },
  contentContainer: {
    padding: height * 0.02,
    flex: 1,
  },
  buttonText: {
    fontSize: height * 0.02,
    color: "blue",
  },
  absoluteContainer: {
    position: "absolute",
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: height * 0.05,
  },
  versionContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,.3)",
    width: height * 0.05,
    height: height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: height * 0.01,
  },
  indicator: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.3)",
    padding: height * 0.01,

    width: "100%",
    height: "100%",
  },
});
