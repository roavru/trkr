import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSizes } from "../lib/theme";

export default function EmptyState() {
  return (
    <View style={{ alignItems: "center", paddingTop: 60 }}>
      <Ionicons
        name="analytics-outline"
        size={48}
        color={colors.textDisabled}
      />
      <Text
        style={{
          color: colors.textMuted,
          fontSize: fontSizes.body,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        Crea tu primer tracker{"\n"}con el botón +
      </Text>
    </View>
  );
}
