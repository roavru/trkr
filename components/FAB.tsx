import React from "react";
import { Pressable, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors } from "../lib/theme";

interface FABProps {
  onPress: () => void;
  bottom: number;
}

export default function FAB({ onPress, bottom }: FABProps) {
  return (
    <View
      style={{
        position: "absolute",
        bottom,
        right: 24,
      }}
    >
      <Pressable onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          onPress();
        }}>
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            overflow: "hidden",
            backgroundColor: colors.glassFab,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add" size={30} color={colors.text} />
        </BlurView>
      </Pressable>
    </View>
  );
}
