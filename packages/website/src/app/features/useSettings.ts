import create from 'zustand';
import { persist } from 'zustand/middleware';

type SettingsState = {
  gasless: boolean;
  toggleGasless: () => void;
};

const useSettings = create<SettingsState>(
  persist(
    (set, get) => ({
      gasless: true,
      toggleGasless: () => set({ gasless: !get().gasless })
    }),
    { name: 'internet-camera-settings' }
  )
);

export default useSettings;
