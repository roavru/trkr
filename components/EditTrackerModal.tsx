import React, { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import GlassModal from "./GlassModal";
import { colors, radii, fontSizes, spacing } from "../lib/theme";
import type { TrackerInfo } from "../lib/types";

interface EditTrackerModalProps {
  visible: boolean;
  tracker: TrackerInfo | null;
  onClose: () => void;
  onSave: (tracker: TrackerInfo, newName: string) => void;
  onDelete: (tracker: TrackerInfo) => void;
}

export default function EditTrackerModal({
  visible,
  tracker,
  onClose,
  onSave,
  onDelete,
}: EditTrackerModalProps) {
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (tracker) setEditName(tracker.name);
  }, [tracker]);

  const handleSave = () => {
    if (!tracker || !editName.trim()) return;
    onSave(tracker, editName);
  };

  return (
    <GlassModal visible={visible} onClose={onClose}>
      <Text
        style={{
          color: colors.text,
          fontSize: fontSizes.xl,
          fontWeight: "700",
          marginBottom: spacing.xl,
          textAlign: "center",
        }}
      >
        Editar Tracker
      </Text>

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
        value={editName}
        onChangeText={setEditName}
        placeholder="Nombre del tracker"
        placeholderTextColor={colors.placeholder}
        style={{
          backgroundColor: colors.inputBg,
          borderRadius: radii.md,
          padding: spacing.lg,
          color: colors.text,
          fontSize: fontSizes.body,
          marginBottom: spacing.lg,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          handleSave();
        }}
        style={{
          paddingVertical: spacing.lg,
          borderRadius: radii.lg,
          backgroundColor: colors.accent,
          alignItems: "center",
          marginBottom: spacing.md,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontWeight: "600",
            fontSize: fontSizes.body,
          }}
        >
          Guardar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          tracker && onDelete(tracker);
        }}
        style={{
          paddingVertical: spacing.lg,
          borderRadius: radii.lg,
          backgroundColor: colors.card,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.red,
            fontWeight: "600",
            fontSize: fontSizes.body,
          }}
        >
          Eliminar
        </Text>
      </TouchableOpacity>
    </GlassModal>
  );
}
