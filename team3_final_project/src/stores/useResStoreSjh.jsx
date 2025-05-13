import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useResStoreSjh = create(persist((set) => ({
    res: null,
    setRes: (res) => set({res}),
    clearRes: () => set({res: null})
  }),
  {
    name: 'res-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useResStoreSjh;