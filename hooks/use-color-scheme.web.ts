import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/** Usa o tema claro na renderização estática e a preferência do aparelho no cliente. */
export function useColorScheme(): 'light' | 'dark' {
  const hasHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const colorScheme = useRNColorScheme();

  return hasHydrated && colorScheme === 'dark' ? 'dark' : 'light';
}
