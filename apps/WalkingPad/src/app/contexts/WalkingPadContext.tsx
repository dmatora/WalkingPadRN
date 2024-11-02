import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { miioInit, miioSend } from '../libs/miio';
import { getTodaySteps, initHealthKit, saveSteps } from '../libs/healthKit';
// import KeepAwake from 'react-native-keep-awake';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

// Define the shape of the context
interface WalkingPadContextProps {
  auto: boolean | null;
  ready: boolean | null;
  run: boolean | null;
  speed: number | null;
  steps: number | null;
  todaySteps: number | null;
  leftSeconds: number | null;
  time: number | null;
  mode: 'manual' | 'standby' | null;
  updateSpeed: (speed: number) => void;
  updateAuto: (auto: boolean) => void;
  updateMode: (mode: 'manual' | 'standby') => void;
  startRunning: () => void;
  stopRunning: () => void;
}

interface WalkingPadProviderProps {
  children: ReactNode;
}

export const WalkingPadContext = createContext<WalkingPadContextProps>({
  auto: null,
  ready: null,
  run: null,
  speed: null,
  steps: null,
  todaySteps: null,
  leftSeconds: null,
  time: null,
  mode: null,
  updateSpeed: () => {},
  updateAuto: () => {},
  updateMode: () => {},
  startRunning: () => {},
  stopRunning: () => {},
});

let lastStepsValue: number | null = null;
let interval: any;

export const WalkingPadProvider: React.FC<WalkingPadProviderProps> = ({
  children,
}) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [run, setRun] = useState<boolean | null>(null);
  const [auto, setAuto] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [steps, setSteps] = useState<number | null>(null);
  const [todaySteps, setTodaySteps] = useState<number | null>(null);
  const [leftSeconds, setLeftSeconds] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [mode, setMode] = useState<'manual' | 'standby' | null>(null);
  const [ready, setReady] = useState(false);
  const [healthKitReady, setHealthKitReady] = useState(false);

  const startMonitoring = async () => {
    if (interval) {
      return;
    }
    console.log('Setting up interval');
    interval = setInterval(async () => {
      const now = new Date();
      const currentSecond = now.getSeconds();
      setLeftSeconds(60 - currentSecond);
      // console.log({currentSecond});
      if (currentSecond % 2 !== 0) {
        return;
      }
      if (await isRunning()) {
        if (currentSecond === 0) {
          await updateAll();
        }
      }
    }, 1000);
  };

  const startRunning = async () => {
    await updateMode('manual');
    setRun((await miioSend('set_state', 'run')) === 'ok');
    // startMonitoring();
  };

  const stopRunning = async () => {
    await updateMode('standby');
  };

  const updateSpeed = async (speed: number) => {
    if (!run) {
      return;
    }
    const response = await miioSend('set_speed', [speed / 10]);
    if (response === 'ok') {
      setSpeed(speed);
      await miioSend('set_start_speed', [speed / 10]);
    }
  };

  const updateAuto = async (auto: boolean) => {
    setAuto(await miioSend('set_auto', [auto ? 1 : 0]));
  };

  const updateMode = async (mode: 'manual' | 'standby') => {
    const response = await miioSend('set_mode', [mode === 'manual' ? 1 : 2]); // set mode to manual
    setMode(response === 1 ? 'manual' : 'standby');
  };

  const updateAll = async () => {
    const all = await miioSend('get_prop', 'all');
    setSteps(all.step);
    setMode(all.mode === '1' ? 'manual' : 'standby');
    setTime(all.time);
  };

  const isRunning = async () => {
    const running = (await miioSend('get_prop', 'state')) === 'run';
    setRun(running);
    return running;
  };

  const updateTodaySteps = async (skipCheck = false) => {
    if (!skipCheck && !healthKitReady) {
      return;
    }
    const todaySteps = await getTodaySteps();
    setTodaySteps(todaySteps);
  };

  useEffect(() => {
    console.log('initializing');
    miioInit().then(async (success) => {
      if (success) {
        setReady(true);
        initHealthKit().then((success) => {
          if (success) {
            setHealthKitReady(success);
            updateTodaySteps(true);
          }
        });
        await updateAll();
        setSpeed(10 * (await miioSend('get_prop', 'start_speed')));
        startMonitoring();
        setInitialized(true);
      }
    });

    // Return a cleanup function to remove any event listeners and clear the interval
    return () => {
      // clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!steps) {
      return;
    }
    if (lastStepsValue === null) {
      lastStepsValue = steps;
      return;
    }
    const increment = steps - lastStepsValue;
    if (!increment) {
      return;
    }
    if (increment < 0) {
      lastStepsValue = steps;
      return;
    }
    saveSteps(increment).then(() => {
      updateTodaySteps();
    });
    lastStepsValue = steps;
  }, [steps]);

  useEffect(() => {
    if (!initialized) return;
    updateAuto(!run);
    if (run) {
      activateKeepAwake();
      // KeepAwake.activate();
      // startMonitoring();
    } else {
      deactivateKeepAwake();
      // KeepAwake.deactivate();
      // console.log('Clearing interval');
      // clearInterval(interval);
    }
  }, [run, initialized]);

  return (
    <WalkingPadContext.Provider
      value={{
        auto,
        speed,
        steps,
        todaySteps,
        leftSeconds,
        time,
        mode,
        ready,
        run,
        updateSpeed,
        updateAuto,
        updateMode,
        startRunning,
        stopRunning,
      }}
    >
      {children}
    </WalkingPadContext.Provider>
  );
};
