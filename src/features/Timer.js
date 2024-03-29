import { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";
import Countdown from "../components/Countdown";
import RoundedButton from "../components/RoundedButton";
import Timing from "./Timing";
import { spacing } from "../styles/sizes";
import colors from "../styles/colors";

const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [progress, setProgress] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(0.1);

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ]; // For Android only odd index consider as vibrating pattern

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setMinutes(0.1);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing On:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: "row",
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md, //Dimnsion Pixel
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: { color: colors.white, fontWeight: "bold", textAlign: "center" },
  clearSubject: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Timer;
