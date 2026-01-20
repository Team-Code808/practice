import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice';
import { createAttendanceSlice } from './slices/createAttendanceSlice';
import { createUiSlice } from './slices/createUiSlice';

const useStore = create((...a) => ({
    ...createAuthSlice(...a),
    ...createAttendanceSlice(...a),
    ...createUiSlice(...a),
}));

export default useStore;
