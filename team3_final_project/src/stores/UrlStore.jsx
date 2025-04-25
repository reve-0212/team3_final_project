import {create} from "zustand/react";

// url : aws 서버 주소
const UseUrlStore = create((set) => ({
  url: 'ec2-15-165-205-236.ap-northeast-2.compute.amazonaws.com',
  setUpUrl: (newUrl) => set(() => ({url: newUrl}))
}))

export default UseUrlStore