import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: null, // 초기값: 로그인 안된 상태
    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
}));

export default useUserStore;