import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useMenuIdxStore = create(persist((set) => ({
    menuIdx: null,
    setMenuIdx: (menuIdx) => set({menuIdx}),
    clearMenuIdx: () => set({menuIdx: null})
  }),
  {
    name: 'menuIdx-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useMenuIdxStore;