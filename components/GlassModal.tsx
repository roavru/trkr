import React from "react";
import {
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  type ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "../lib/theme";

interface GlassModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  intensity?: number;
  useKeyboardAvoiding?: boolean;
  contentStyle?: ViewStyle;
}

export default function GlassModal({
  visible,
  onClose,
  children,
  width = 320,
  intensity = 80,
  useKeyboardAvoiding = true,
  contentStyle,
}: GlassModalProps) {
  const content = (
    <Pressable
      onPress={() => {}}
      style={{
        width,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[
          {
            padding: 24,
            backgroundColor: colors.glass,
          },
          contentStyle,
        ]}
      >
        {children}
      </BlurView>
    </Pressable>
  );

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
          backgroundColor: colors.overlay,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onClose}
      >
        {useKeyboardAvoiding ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </Pressable>
    </Modal>
  );
}
