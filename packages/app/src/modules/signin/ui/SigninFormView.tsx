import React, { useEffect } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import { useSelector } from "react-redux";
import { FormikErrors, Formik } from "formik";
import { usernamePasswordValidationSchema } from "@reddit-clone/common";
import CustomTextField from "../../../shared/modules/CustomTextField/CustomTextField";
import { LinearGradient } from "expo-linear-gradient";
import { State } from "@reddit-clone/controller";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  signin: (values: { username: string; password: string }) => void;
}

const SigninFormView = ({ signin }: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;
  const userAuth = useSelector((state: State) => state.auth);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 40,
      backgroundColor: colors.colorCard,
    },
    formContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.colorCard,
    },
    title: {
      backgroundColor: colors.colorCard,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.textMain,
    },
    textInput: {
      backgroundColor: colors.inputBackground,
      borderRadius: 4,
      marginTop: 20,
      padding: 10,
    },
    inputContainer: {
      width: "100%",
      borderBottomWidth: 0.8,
    },
    labelStyle: {},
    submitButtonContainer: {
      padding: 10,
      width: Dimensions.get("screen").width - 20,
      alignItems: "center",
      borderRadius: 40,
      marginTop: 20,
      paddingHorizontal: 10,
    },
    submitButtonText: {
      fontWeight: "bold",
      color: "white",
    },
    submitButtonTextDisabled: {
      color: colors.textMuted,
    },
    redirectLoginContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    redirectLoginLink: {
      color: colors.highlightSelection,
      fontWeight: "bold",
      marginLeft: 5,
      padding: 7,
    },
    redirectLoginText: {
      color: colors.textMuted,
    },
  });

  const handleSubmit = async (
    values: {
      username: string;
      password: string;
    },
    setErrors: (
      errors: FormikErrors<{
        username: string;
        password: string;
      }>
    ) => void
  ) => {
    signin(values);
  };

  useEffect(() => {
    if (userAuth.email && userAuth.email !== "") {
      (async function () {
        try {
          await AsyncStorage.setItem("userInfo", JSON.stringify(userAuth));
        } catch (error) {}
      })();
      navigation.navigate("Homepage");
    }
  }, [userAuth]);

  const handleRedirectToLogin = () => {
    navigation.navigate("signupScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Create an account</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={() => {}}
        validationSchema={usernamePasswordValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
          setErrors,
        }) => (
          <View style={styles.formContainer}>
            <CustomTextField
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.username}
              name="username"
              label="Username"
              textInputStyle={styles.textInput}
              containerStyle={styles.inputContainer}
              labelStyle={styles.labelStyle}
              color={colors.textMain}
              highlightColor={colors.highlightSelection}
              errorColor={colors.error}
              labelColor={colors.textMuted}
              errors={errors.username}
              touched={touched.username}
              textInputProperties={{
                autoCapitalize: "none",
                autoCompleteType: "username",
                autoCorrect: false,
              }}
            />
            <CustomTextField
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.password}
              name="password"
              label="Password"
              textInputStyle={styles.textInput}
              containerStyle={styles.inputContainer}
              labelStyle={styles.labelStyle}
              color={colors.textMain}
              highlightColor={colors.highlightSelection}
              errorColor={colors.error}
              labelColor={colors.textMuted}
              errors={errors.password}
              touched={touched.password}
              textInputProperties={{
                autoCapitalize: "none",
                autoCompleteType: "password",
                autoCorrect: false,
                secureTextEntry: true,
              }}
            />
            <View style={styles.redirectLoginContainer}>
              <Text style={styles.redirectLoginText}>New to Reddit?</Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={handleRedirectToLogin}
              >
                <Text style={styles.redirectLoginLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              disabled={!isValid}
              onPress={() => handleSubmit(values, setErrors)}
              style={styles.submitButtonContainer}
            >
              <LinearGradient
                colors={["rgba(255, 187, 138,1)", "rgba(230, 118, 108,1)"]}
                start={[0.9, 1]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 39,
                  borderRadius: 40,
                  borderWidth: 1,
                }}
              />
              <Text
                style={
                  isValid
                    ? styles.submitButtonText
                    : styles.submitButtonTextDisabled
                }
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SigninFormView;
