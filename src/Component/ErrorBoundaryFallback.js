import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import RNRestart from "react-native-restart";
import { IMAGES } from "../../utils/Images";
import { useTranslation } from "react-i18next";
import CustomButton from "../Screens/category/JoAcademySchool/SchoolComponents/CustomButton";
import { Colors } from "../constant/styles";

const ErrorBoundaryFallback = () => {
  const { t } = useTranslation();
  const restart = () => {
    RNRestart.restart();
  };

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.EmptyPost}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{t("common:ErrorBoundaryMessage")}</Text>
      <CustomButton
        title={t("common:Reload")}
        style={styles.buttonContainer}
        textStyle={styles.buttonText}
        onPress={restart}
      />
    </View>
  );
};

export default ErrorBoundaryFallback;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 15,
    marginTop: 100,
  },
  image: {
    width: 0.7*width,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 22,
  },
  buttonContainer: {
    backgroundColor: Colors.Marianblue,
    alignSelf: "center",
    borderRadius: 20,
    width: 250,
    paddingVertical: 5,
  },
  buttonText: { 
    color: Colors.whiteColor,
    fontSize: 16,
    paddingVertical: 5
  },
});
