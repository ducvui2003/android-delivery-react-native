import React from "react";
import Row from "../custom/Row";
import InputStyles from "./style/input.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/redux/store.config";
import { TextInput } from "react-native-gesture-handler";
import InputSearchProps from "./type/InputSearchProps";
import { View } from "react-native";

const InputSearch = ({
  iconLeft,
  iconRight,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  value,
  keyboardType,
  borderColor,
}: InputSearchProps) => {
  const theme = useSelector((state: RootState) => state.themeState.theme);

  return (
    <View>
      <Row
        style={[
          InputStyles.container,
          {
            backgroundColor: theme.background_input.getColor(),
            borderColor: theme.border.getColor(),
            borderRadius: 8,
            borderWidth: 1,
            gap: 12,
          },
        ]}
      >
        {iconLeft && iconLeft}
        <TextInput
          style={[InputStyles.input, { color: theme.text_3.getColor() }]}
          placeholderTextColor={theme.placeholder.getColor()}
          onBlur={onBlur}
          keyboardType={keyboardType}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
          placeholder={placeholder}
        />
        {iconRight && iconRight}
      </Row>
    </View>
  );
};

export default InputSearch;
