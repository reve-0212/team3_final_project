import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useSeatIdStore = create(persist((set) => ({
  seatId: 0,
  setSeatId: (seatId) => set({seatId}),
  clearSeatId: () => set({seatId: 0})
})))

export default useSeatIdStore;