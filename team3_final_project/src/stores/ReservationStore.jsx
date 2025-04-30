import {create} from "zustand/react";

const UseReservationStore = create((set) => ({
    reservation: true,
    setUpUrl: (val) => set(() => ({reservation: val}))
}))

export default UseReservationStore