export const createShopSlice = (set) => ({
    items: [
        { id: 1, name: '스타벅스 아메리카노', price: '4,500', img: '☕', isActive: true },
        { id: 2, name: '배달의민족 1만원권', price: '10,000', img: '🛵', isActive: true },
        { id: 3, name: '반차 휴가권', price: '15,000', img: '🏖️', isActive: true },
        { id: 4, name: '편의점 5천원권', price: '5,000', img: '🏪', isActive: false },
        { id: 5, name: '치킨 세트', price: '20,000', img: '🍗', isActive: true },
        { id: 6, name: '영화 관람권', price: '12,000', img: '🎬', isActive: false },
    ],
    toggleItemStatus: (id) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, isActive: !item.isActive } : item
            ),
        })),
    activateAll: () =>
        set((state) => ({
            items: state.items.map((item) => ({ ...item, isActive: true })),
        })),
    deactivateAll: () =>
        set((state) => ({
            items: state.items.map((item) => ({ ...item, isActive: false })),
        })),
});
