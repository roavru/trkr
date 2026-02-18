import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { colors, radii, fontSizes, spacing } from "../lib/theme";
import type { TrackerInfo } from "../lib/types";

interface TrackerWidgetProps {
  tracker: TrackerInfo;
  onTrack: (tracker: TrackerInfo) => void;
  onDecrement: (tracker: TrackerInfo) => void;
  onLongPress: (tracker: TrackerInfo) => void;
}

export default function TrackerWidget({
  tracker,
  onTrack,
  onDecrement,
  onLongPress,
}: TrackerWidgetProps) {
  const isDoneToday =
    tracker.type === "bool" && tracker.todayValue !== null;
  const canDecrement =
    tracker.type === "numeric" &&
    tracker.todayValue !== null &&
    tracker.todayValue > 0;

  const statusText =
    tracker.type === "bool"
      ? isDoneToday
        ? "Completado hoy"
        : "Sin registrar"
      : tracker.todayValue !== null
        ? `Hoy: ${tracker.todayValue}`
        : "Sin registrar";

  return (
    <Pressable
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onLongPress(tracker);
      }}
      delayLongPress={400}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: radii.xl,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSizes.lg,
            fontWeight: "600",
          }}
        >
          {tracker.name}
        </Text>
        <Text
          style={{
            color: colors.textTertiary,
            fontSize: fontSizes.sm,
            marginTop: 2,
          }}
        >
          {statusText}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        {tracker.type === "numeric" && (
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onDecrement(tracker);
            }}
            activeOpacity={0.7}
            disabled={!canDecrement}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: canDecrement
                ? colors.redBg
                : "rgba(255,255,255,0.04)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="remove"
              size={20}
              color={canDecrement ? colors.red : colors.textDisabled}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onTrack(tracker);
          }}
          activeOpacity={0.7}
          style={{
            width: 44,
            height: 44,
            borderRadius: radii.round,
            backgroundColor: isDoneToday
              ? colors.greenBg
              : tracker.type === "bool"
                ? colors.buttonGhost
                : colors.blueBg,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {tracker.type === "bool" ? (
            <Ionicons
              name="checkmark"
              size={22}
              color={isDoneToday ? colors.green : colors.buttonText}
            />
          ) : (
            <Ionicons name="add" size={22} color={colors.accent} />
          )}
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
