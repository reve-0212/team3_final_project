import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useRsvDateStore = create(persist((set) => ({
    rsvDate: null,
    setRsvDate: (rsvDate) => set({rsvDate}),
    clearRsvDate: () => set({rsvDate: null})
  }),
  {
    name: 'rsvDate-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useRsvDateStore;