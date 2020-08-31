import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import superagent from "superagent";
import { signupValidationSchema } from "@reddit-clone/common";
import { Formik, FormikErrors } from "formik";
import { useTheme } from "@react-navigation/native";
import { ThemeColors } from "../../../themes/themes";
import Animated from "react-native-reanimated";
import CustomTextField from "../../../shared/modules/CustomTextField/CustomTextField";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  checkEmailAvailability: (email: string) => Promise<superagent.Response>;
  submitForm: (values: {
    email: string;
    password: string;
    username: string;
  }) => void;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SignupFormView = ({ checkEmailAvailability, submitForm }: Props) => {
  const theme = useTheme();
  const colors = theme.colors as ThemeColors;

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
  });

  const handleSubmit = async (
    values: {
      email: string;
      username: string;
      password: string;
    },
    setErrors: (
      errors: FormikErrors<{
        email: string;
        username: string;
        password: string;
      }>
    ) => void
  ) => {
    const emailResponse = await checkEmailAvailability(values.email);
    if (!emailResponse.body) {
      setErrors({ email: "Email is already taken." });
      return;
    }
    submitForm(values);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Create an account</Text>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={() => {}}
        validationSchema={signupValidationSchema}
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
              value={values.email}
              name="email"
              label="Email"
              textInputStyle={styles.textInput}
              containerStyle={styles.inputContainer}
              labelStyle={styles.labelStyle}
              color={colors.textMain}
              highlightColor={colors.highlightSelection}
              errorColor={colors.error}
              labelColor={colors.textMuted}
              errors={errors.email}
              touched={touched.email}
              textInputProperties={{
                autoCapitalize: "none",
                autoCompleteType: "email",
                keyboardType: "email-address",
                autoCorrect: false,
              }}
            />
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

export default SignupFormView;
