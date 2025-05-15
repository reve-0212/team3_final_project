import {create} from 'zustand';
import {persist} from "zustand/middleware";

const useMenuStore = create(persist((set) => ({
    menu: null,
    setMenu: (menu) => set({menu}),
    clearMenu: () => set({menu: null})
  }),
  {
    name: 'menu-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default useMenuStore;