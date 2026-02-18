import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import GlassModal from "./GlassModal";
import { colors, radii, fontSizes, spacing } from "../lib/theme";
import type { TrackerType } from "../lib/types";

interface CreateTrackerModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string, type: TrackerType) => void;
}

export default function CreateTrackerModal({
  visible,
  onClose,
  onCreate,
}: CreateTrackerModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<TrackerType>("bool");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name, type);
    setName("");
    setType("bool");
  };

  const handleClose = () => {
    setName("");
    setType("bool");
    onClose();
  };

  return (
    <GlassModal visible={visible} onClose={handleClose}>
      {/* Título */}
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.xl,
          fontWeight: "700",
          marginBottom: spacing.xl,
          textAlign: "center",
        }}
      >
        Nuevo Tracker
      </Text>

      {/* Nombre */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: fontSizes.sm,
          fontWeight: "600",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Nombre
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre del tracker"
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.inputBg,
          borderRadius: radii.md,
          padding: spacing.lg,
          color: colors.text,
          fontSize: fontSizes.body,
          marginBottom: spacing.xl,
        }}
      />

      {/* Tipo */}
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: fontSizes.sm,
          fontWeight: "600",
          marginBottom: spacing.sm,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Tipo de tracker
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.inputBg,
          borderRadius: radii.md,
          padding: 3,
          marginBottom: spacing.xxxl,
        }}
      >
        {(["bool", "numeric"] as const).map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => {
              Haptics.selectionAsync();
              setType(option);
            }}
            style={{
              flex: 1,
              paddingVertical: spacing.sm + 2,
              borderRadius: radii.sm,
              backgroundColor:
                type === option ? colors.segmentActive : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  type === option ? colors.text : colors.buttonTextActive,
                fontWeight: "600",
                fontSize: fontSizes.md,
              }}
            >
              {option === "bool" ? "Booleano" : "Numérico"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones */}
      <View style={{ flexDirection: "row", gap: spacing.sm + 2 }}>
        <TouchableOpacity
          onPress={handleClose}
          style={{
            flex: 1,
            paddingVertical: spacing.lg,
            borderRadius: radii.lg,
            backgroundColor: colors.buttonGhost,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.buttonText,
              fontWeight: "600",
              fontSize: fontSizes.body,
            }}
          >
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            handleCreate();
          }}
          style={{
            flex: 1,
            paddingVertical: spacing.lg,
            borderRadius: radii.lg,
            backgroundColor: colors.accent,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
              fontSize: fontSizes.body,
            }}
          >
            Crear
          </Text>
        </TouchableOpacity>
      </View>
    </GlassModal>
  );
}
