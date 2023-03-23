import { create } from 'zustand';

interface GlobalStoreState {
  test: string;

  setTest: (test: string) => void;

  getTest: () => string;
}

const useGlobal = create<GlobalStoreState>((set, get) => ({
  test: '测试专用',

  setTest: (test) => {
    set({ test });
  },

  getTest: () => {
    const newTest = get().test + '后缀';
    return newTest;
  },
}));

export default useGlobal;
