import React from "react";
import { View, Text, TouchableOpacity, Pressable, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, radii, fontSizes, spacing } from "../lib/theme";

interface DeleteConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  visible,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: colors.overlayHeavy,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onClose}
      >
        <Pressable
          onPress={() => {}}
          style={{ width: 300, borderRadius: radii.xxl, overflow: "hidden" }}
        >
          <BlurView
            intensity={80}
            tint="dark"
            style={{
              padding: spacing.xxl,
              backgroundColor: colors.glassHeavy,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="warning"
              size={36}
              color={colors.red}
              style={{ marginBottom: spacing.md }}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: fontSizes.lg,
                fontWeight: "700",
                marginBottom: spacing.sm,
                textAlign: "center",
              }}
            >
              Esta acción no puede revertirse
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 15,
                textAlign: "center",
                marginBottom: spacing.xxl,
                lineHeight: 20,
              }}
            >
              ¿Estás seguro que quieres eliminar este trkr?
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: spacing.sm + 2,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={onClose}
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
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                  onConfirm();
                }}
                style={{
                  flex: 1,
                  paddingVertical: spacing.lg,
                  borderRadius: radii.lg,
                  backgroundColor: colors.redBg,
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
            </View>
          </BlurView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
