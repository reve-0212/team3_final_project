import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useRsvTimeStore = create(persist((set) => ({
    rsvTime: null,
    setRsvTime: (rsvTime) => set({rsvTime}),
    clearRsvTime: () => set({rsvTime: null})
  }),
  {
    name: 'rsvTime-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useRsvTimeStore;