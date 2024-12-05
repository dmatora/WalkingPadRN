// src/contexts/SocketContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import { AppState, AppStateStatus } from 'react-native';
import { miioInit } from '../libs/miio';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SocketContextProps {
  connected: boolean;
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
}

export const SocketContext = createContext<SocketContextProps>({
  connected: false,
  connectSocket: async () => {},
  disconnectSocket: () => {},
});

const LAST_ACTIVE_TIMESTAMP_KEY = 'lastActiveTimestamp';
// Интервал, после которого считаем, что приложение было долго в фоне (5 минут)
const INACTIVE_THRESHOLD = 5 * 60 * 1000; // 5 минут в миллисекундах

export const useWalkingPadSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [connected, setConnected] = useState<boolean>(false);

  const connectSocket = async () => {
    try {
      const success = await miioInit();
      if (success) {
        setConnected(true);
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setConnected(false);
    }
  };

  const disconnectSocket = () => {
    // Реализуйте логику отключения сокета, если необходимо
    setConnected(false);
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        // Сохраняем время ухода в фон
        await AsyncStorage.setItem(
          LAST_ACTIVE_TIMESTAMP_KEY,
          Date.now().toString()
        );
      } else if (nextAppState === 'active') {
        // Приложение снова активно, проверяем, сколько времени прошло
        const storedTime = await AsyncStorage.getItem(
          LAST_ACTIVE_TIMESTAMP_KEY
        );
        if (storedTime) {
          const timeInBackground = Date.now() - parseInt(storedTime, 10);
          if (timeInBackground > INACTIVE_THRESHOLD) {
            // Было долго в фоне - переподключаемся
            await connectSocket();
          } else {
            // Было недолго, но если не подключено - подключаем
            if (!connected) {
              await connectSocket();
            }
          }
        } else {
          // Нет сохранённого времени — скорее всего первый запуск или очистка. Проверим подключение.
          if (!connected) {
            await connectSocket();
          }
        }
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [connected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && !connected) {
        connectSocket();
      } else if (!state.isConnected) {
        disconnectSocket();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [connected]);

  return (
    <SocketContext.Provider
      value={{ connected, connectSocket, disconnectSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};
