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

    // Attendance State
    attendance: {
        isClockedIn: false,
        isAway: false,
        isCoolDown: false,
        coolDownStartTime: null,
    },
    // UI Persistence State
    ui: {
        departmentFilter: '전체',
    },

    // Attendance Actions
    setClockIn: (status) => set((state) => ({ attendance: { ...state.attendance, isClockedIn: status } })),
    setAway: (status) => set((state) => ({ attendance: { ...state.attendance, isAway: status } })),
    setCoolDown: (status) => set((state) => ({
        attendance: {
            ...state.attendance,
            isCoolDown: status,
            coolDownStartTime: status ? Date.now() : null
        }
    })),

    // UI Actions
    setDepartmentFilter: (filter) => set((state) => ({ ui: { ...state.ui, departmentFilter: filter } })),

    // Helper action to handle logout (Updated to clear all state)
    logout: () => set({
        user: null,
        isAdminMode: false,
        attendance: { isClockedIn: false, isAway: false, isCoolDown: false, coolDownStartTime: null },
        ui: { departmentFilter: '전체' }
    }),
}));

export default useStore;
