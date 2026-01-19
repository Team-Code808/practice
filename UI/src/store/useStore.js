import { create } from 'zustand';
import { UserRole } from '../constants/types';

const useStore = create((set) => ({
    user: null,
    isAdminMode: false,

    setUser: (user) => set({ user }),
    setIsAdminMode: (mode) => set({ isAdminMode: mode }),

    // Helper action to handle login logic
    login: (user) => {
        const isAdmin = user.role === UserRole.ADMIN;
        set({ user, isAdminMode: isAdmin });
    },

    // Helper action to handle logout
    logout: () => set({ user: null, isAdminMode: false }),
}));

export default useStore;
