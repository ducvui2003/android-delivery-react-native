/**
 * Author: Le Anh Duc
 * Email: ducvui2003@gmail.com
 * Phone number: +84 965809127
 * Created at: 17/8/24 - 12:02 pm
 * User: ducvui2003
 **/
import { View, StyleSheet, Image, Text } from "react-native";
import { ThemeType } from "../../../types/theme.type";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/redux/store.config";
import { ProductHomeCardType } from "./type/productHomeCard.type";
import textStyle from "../../../configs/styles/textStyle.config";
import { Icon } from "@rneui/themed";
import React from "react";


function ProductHomeCard({ product: { name, rating, id, basePrice, salePrice, image } }: ProductHomeCardType) {
  const theme: ThemeType = useSelector((state: RootState) => state.themeState.theme);
  const styles = makeStyled(theme);
  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail}
             src={"https://plus.unsplash.com/premium_photo-1668618295237-f1d8666812c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
      <View style={styles.content}>
        <Text style={styles.nameProduct}>{name}</Text>
        <View style={styles.containerContent}>
          <Icon
            name="star"
            size={14}
            type="font-awesome-5"
            solid
            color={theme.secondary.getColor("500")}
          />
          <Text style={styles.star}>{rating}</Text>
        </View>
        <View style={styles.containerContent}>
          {salePrice ? (
            <>
              <Text style={{ ...styles.oldPrice }}>{basePrice + " VND"}</Text>
              <Text style={{ ...styles.currentPrice }}>{salePrice + " VND"}</Text>
            </>
          ) : (
            <Text style={{ ...styles.currentPrice }}>{basePrice + " VND"}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const makeStyled = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    elevation: 10,
  },
  thumbnail: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  content: {
    marginTop: 8,
    gap: 8,
    justifyContent: "flex-start",
  },
  nameProduct: {
    ...textStyle["12_medium"],
    color: theme.neutral.getColor("900"),
  },
  containerContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  star: {
    ...textStyle["12_regular"],
    color: theme.neutral.getColor("900"),
  },
  oldPrice: {
    ...textStyle["16_regular"],
    color: theme.neutral.getColor("200"),
    textDecorationLine: "line-through",
  },
  currentPrice: {
    ...textStyle["16_semibold"],
    color: theme.primary.getColor("500"),
  },

});

export default ProductHomeCard;