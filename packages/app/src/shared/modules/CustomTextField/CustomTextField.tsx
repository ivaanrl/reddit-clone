import React, { useState, useRef } from "react";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import {
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
  TextInputProperties,
  TextInputProps,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  labelStyle: StyleProp<TextStyle>;
  textInputStyle: StyleProp<TextStyle>;
  containerStyle: StyleProp<ViewStyle>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  value: string;
  name: string;
  label: string;
  highlightColor: string;
  color: string;
  errorColor: string;
  labelColor: string;
  errors: string | undefined;
  touched: boolean | undefined;
  textInputProperties?: TextInputProps;
}

const CustomTextField = ({
  labelStyle,
  textInputStyle,
  containerStyle,
  handleBlur,
  handleChange,
  value,
  name,
  label,
  highlightColor,
  color,
  errorColor,
  labelColor,
  errors,
  touched,
  textInputProperties,
}: Props) => {
  const transition = (
    <Transition.Change interpolation="easeInOut" durationMs={100} />
  );
  const [top, setTop] = useState<number>(34);
  const [left, setLeft] = useState<number>(10);
  const [fontSize, setFontSize] = useState<number>(16);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const ref = useRef<TransitioningView>();
  const handleOnFocus = () => {
    if (ref && ref.current) {
      ref.current.animateNextTransition();
      setTop(10);
      setLeft(0);
      setFontSize(14);
      setIsFocused(true);
    }
  };

  const handleEndFocus = () => {
    setIsFocused(false);
    if (value != "") return;
    if (ref && ref.current) {
      ref.current.animateNextTransition();
      setTop(34);
      setLeft(10);
      setFontSize(16);
    }
  };

  return (
    <React.Fragment>
      <Transitioning.View
        ref={(ref as unknown) as TransitioningView}
        style={{
          position: "relative",
          ...containerStyle,
          borderBottomColor: errors
            ? errorColor
            : isFocused
            ? highlightColor
            : labelColor,
        }}
        transition={transition}
      >
        <TextInput
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={value}
          style={textInputStyle}
          autoCompleteType="email"
          textContentType="emailAddress"
          onFocus={handleOnFocus}
          onEndEditing={handleEndFocus}
          {...textInputProperties}
        />
        <Text
          style={{
            position: "absolute",
            top: top,
            left: left,
            fontWeight: "bold",
            fontSize: fontSize,
            ...labelStyle,
            color: errors
              ? errorColor
              : isFocused
              ? highlightColor
              : labelColor,
          }}
        >
          {label}
        </Text>
      </Transitioning.View>
      {errors && touched ? (
        <Text
          style={{
            color: errorColor,
            width: "100%",
          }}
        >
          {errors}
        </Text>
      ) : null}
    </React.Fragment>
  );
};

export default CustomTextField;
