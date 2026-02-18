import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radii, fontSizes, spacing } from "../../lib/theme";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + spacing.md,
          left: 110,
          right: 110,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: "transparent",
          height: 56,
          borderRadius: radii.pill,
          overflow: "hidden",
          shadowColor: colors.bg,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            tint="dark"
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: radii.pill,
              overflow: "hidden",
              backgroundColor: colors.glass,
            }}
          />
        ),
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: fontSizes.xs,
          fontWeight: "600",
          letterSpacing: 0.5,
          marginTop: -2,
        },
        tabBarItemStyle: {
          paddingVertical: spacing.xs,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "TRKR",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "AJUSTES",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
