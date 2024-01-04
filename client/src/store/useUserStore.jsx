import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiGetCurrent } from "~/apis/user";

export const useUserStore = create(
    persist(
        (set, get) => ({
            token: null,
            current: null,
            setToken: (token) => set(() => ({ token })),
            getCurrent: async () => {
                const response = await apiGetCurrent();
                if (response.success)
                    return set(() => ({ current: response.currentUser }));
            },
        }),
        {
            name: "Real-estate",
            storage: createJSONStorage(() => localStorage),
            //return object of states, want save
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(
                        (item) => item[0] === "token" || item[0] === "current"
                    )
                ),
        }
    )
);
