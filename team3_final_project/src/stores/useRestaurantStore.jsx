import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useRestaurantStore = create(persist((set) => ({
    restaurantIdx: null,
    setRestaurantIdx: (restaurantIdx) => set({restaurantIdx}),
    clearRestaurantIdx: () => set({restaurantIdx: null})
  }),
  {
    name: 'restaurantIdx-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useRestaurantStore;