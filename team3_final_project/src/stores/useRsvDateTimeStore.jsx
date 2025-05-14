import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useRsvDateTimeStore = create(persist((set) => ({
    rsvDateTime: null,
    setRsvDateTime: (rsvDateTime) => set({rsvDateTime}),
    clearRsvDateTime: () => set({rsvDateTime: null})
  }),
  {
    name: 'rsvDateTime-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useRsvDateTimeStore;