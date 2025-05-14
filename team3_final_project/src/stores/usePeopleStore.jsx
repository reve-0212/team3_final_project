import {create} from 'zustand';
import {persist} from "zustand/middleware";

const usePeopleStore = create(persist((set) => ({
    people: null,
    setPeople: (people) => set({people}),
    clearPeople: () => set({people: null})
  }),
  {
    name: 'people-storage', // 로컬 스토리지 키 이름
    getStorage: () => localStorage, //사용할 스토리지
  }))

export default usePeopleStore;