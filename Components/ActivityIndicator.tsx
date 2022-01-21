import { View, SafeAreaView, Text, ActivityIndicator, StyleSheet } from "react-native";

interface Props {
  text: string;
  style?: object;
}

export const Indicator = ({ text, style }: Props) => {
  return (
    <SafeAreaView style={[styles.activityIndicatorContainer, { ...style }]}>
      <ActivityIndicator size={"large"} />
      <Text>{text}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
