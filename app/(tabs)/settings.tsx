import { useState, useEffect } from "react";
import { Text, View, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors, fontSizes, spacing, radii } from "../../lib/theme";

export default function Settings() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userName").then((stored) => {
      if (stored) setName(stored);
    });
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    AsyncStorage.setItem("userName", value);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        paddingTop: insets.top + spacing.lg,
        paddingHorizontal: spacing.xxl,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.title,
          fontWeight: "bold",
          marginBottom: spacing.xxxl,
        }}
      >
        Ajustes
      </Text>

      {/* Nombre */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: fontSizes.xs,
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: spacing.sm,
        }}
      >
        Nombre
      </Text>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        placeholder="Tu nombre"
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.inputBg,
          borderRadius: radii.md,
          padding: spacing.lg,
          color: colors.text,
          fontSize: fontSizes.md,
        }}
      />
    </View>
  );
}
