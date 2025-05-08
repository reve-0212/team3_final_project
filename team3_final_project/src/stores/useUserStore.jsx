import {create} from 'zustand';
import {persist} from "zustand/middleware";

// persist 로 새로고침해도 데이터가 안날아가게
const useUserStore = create(persist((set) => ({
    user: null,
    setUser: (user) => set({user}),
    clearUser: () => set({user: null})
  }),
  {
    name: 'user-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))
export default useUserStore;