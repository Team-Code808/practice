import { UserRole } from '../../constants/types';

export const createAuthSlice = (set) => ({
    user: null,
    isAdminMode: false,

    setUser: (user) => set({ user }),
    setIsAdminMode: (mode) => set({ isAdminMode: mode }),

    // Helper action to handle login logic
    login: (user) => {
        const isAdmin = user.role === UserRole.ADMIN;
        set({ user, isAdminMode: isAdmin });
    },

    // Helper action to handle logout (Updated to clear all state)
    logout: () => set({
        user: null,
        isAdminMode: false,
        attendance: { isClockedIn: false, isAway: false, isCoolDown: false, coolDownStartTime: null },
        ui: { departmentFilter: '전체' }
    }),
});
