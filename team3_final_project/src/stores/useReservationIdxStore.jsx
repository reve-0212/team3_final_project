import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useReservationIdxStore = create(persist((set) => ({
    reservationIdx: null,
    setReservationIdx: (reservationIdx) => set({reservationIdx}),
    clearReservationIdx: () => set({reservationIdx: null})
  }),
  {
    name: 'reservationIdx-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useReservationIdxStore;