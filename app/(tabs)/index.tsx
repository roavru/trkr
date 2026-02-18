import { useState, useCallback } from "react";
import { Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import { colors, fontSizes, spacing } from "../../lib/theme";
import type { TrackerInfo, TrackerType } from "../../lib/types";
import {
  loadTrackers,
  createTracker,
  deleteTracker,
  renameTracker,
  trackAction,
  decrementNumericTracker,
  sanitizeName,
} from "../../lib/trackerService";

import TrackerWidget from "../../components/TrackerWidget";
import EmptyState from "../../components/EmptyState";
import FAB from "../../components/FAB";
import CreateTrackerModal from "../../components/CreateTrackerModal";
import EditTrackerModal from "../../components/EditTrackerModal";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState("");
  const [trackers, setTrackers] = useState<TrackerInfo[]>([]);

  // Modal state
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editTracker, setEditTracker] = useState<TrackerInfo | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const refreshTrackers = useCallback(() => {
    setTrackers(loadTrackers());
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("userName").then((name) => {
        if (name) setUserName(name);
      });
      refreshTrackers();
    }, [refreshTrackers])
  );

  // ── Handlers ─────────────────────────────────────────

  const handleCreate = (name: string, type: TrackerType) => {
    createTracker(name, type);
    setCreateModalVisible(false);
    refreshTrackers();
  };

  const handleTrack = (tracker: TrackerInfo) => {
    trackAction(tracker);
    refreshTrackers();
  };

  const handleDecrement = (tracker: TrackerInfo) => {
    decrementNumericTracker(tracker);
    refreshTrackers();
  };

  const handleLongPress = (tracker: TrackerInfo) => {
    setEditTracker(tracker);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (tracker: TrackerInfo, newName: string) => {
    const sanitized = sanitizeName(newName);
    if (sanitized !== tracker.name) {
      renameTracker(tracker.fileName, newName);
    }
    setEditModalVisible(false);
    setEditTracker(null);
    refreshTrackers();
  };

  const handleDeletePress = (tracker: TrackerInfo) => {
    setEditModalVisible(false);
    setTimeout(() => {
      setDeleteConfirmVisible(true);
    }, 300);
  };

  const handleConfirmDelete = () => {
    if (editTracker) {
      deleteTracker(editTracker.fileName);
    }
    setDeleteConfirmVisible(false);
    setEditTracker(null);
    refreshTrackers();
  };

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
    setEditTracker(null);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setEditTracker(null);
  };

  // ── Render ───────────────────────────────────────────

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        paddingTop: insets.top + spacing.lg,
      }}
    >
      {/* Header */}
      <View style={{ paddingHorizontal: spacing.xxl }}>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSizes.hero,
            fontWeight: "800",
            letterSpacing: 2,
          }}
        >
          TRKR
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: fontSizes.xl,
            fontWeight: "500",
            marginTop: spacing.xs,
            marginBottom: spacing.xxxl,
          }}
        >
          {userName ? `Hola ${userName}` : "Hola"}
        </Text>
      </View>

      {/* Tracker list */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.xxl,
          paddingBottom: insets.bottom + 120,
          gap: spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        {trackers.map((tracker) => (
          <TrackerWidget
            key={tracker.fileName}
            tracker={tracker}
            onTrack={handleTrack}
            onDecrement={handleDecrement}
            onLongPress={handleLongPress}
          />
        ))}
        {trackers.length === 0 && <EmptyState />}
      </ScrollView>

      {/* FAB */}
      <FAB
        onPress={() => setCreateModalVisible(true)}
        bottom={insets.bottom + 100}
      />

      {/* Modals */}
      <CreateTrackerModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={handleCreate}
      />

      <EditTrackerModal
        visible={editModalVisible}
        tracker={editTracker}
        onClose={handleCancelEdit}
        onSave={handleSaveEdit}
        onDelete={handleDeletePress}
      />

      <DeleteConfirmModal
        visible={deleteConfirmVisible}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </View>
  );
}
