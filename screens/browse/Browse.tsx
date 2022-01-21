import React from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet, Dimensions, RefreshControl } from "react-native";

import { useApi } from "../../hooks/useApi";
import { Picture } from "../../types/Picture";

import { Indicator } from "../../Components/ActivityIndicator";

import { BrowseItem } from "./Components/BrowseItem";

const { height } = Dimensions.get("screen");

interface Props {
  navigation: any;
}

export const Browse = ({ navigation }: Props) => {
  const { call, endpoints } = useApi();

  // Ran out of time but mutating this state using ui would allow user to change the number between 1 - max(N) to show N pictures
  const [paging, setPaging] = React.useState<number>(12);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const [pictures, setPictures] = React.useState<Picture[]>([]);

  const loadPictures = async () => {
    try {
      const response = await call(endpoints.PICTURES, [paging]);
      setPictures(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (e) {
      // Normally handle this in an error handler
      console.error(e);
    }
  };

  React.useEffect(() => {
    loadPictures();
  }, [paging]);
  return loading ? (
    <Indicator text="Loading" />
  ) : (
    <View style={styles.contentContainer}>
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.header}>Explore</Text>
        <Text style={styles.subHeading}>Browse Nasa's Api</Text>
      </SafeAreaView>
      <View style={styles.container}>
        {refreshing ? (
          <Indicator text="Refreshing" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  setRefreshing(true);
                  loadPictures();
                }}
              />
            }
            style={{ height: "100%" }}
            data={pictures}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ index, item }) => (
              <BrowseItem
                key={index}
                picture={item}
                onPress={() => navigation.navigate("DetailScreen", { picture: item })}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    margin: height * 0.02,
    marginBottom: 0,
  },
  headerContainer: {
    height: height * 0.1,
    marginBottom: height * 0.02,
  },
  header: {
    fontSize: height * 0.04,
  },
  subHeading: {
    fontSize: height * 0.02,
  },
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
