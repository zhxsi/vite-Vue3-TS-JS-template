import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore(
  "main",
  () => {
    const cachedViews = ref<string[]>([]);
    const addCacheRoute = (name: string) => {
      cachedViews.value.push(name);
      cachedViews.value = Array.from(new Set(cachedViews.value));
    };
    const clearCacheRoute = (name: string) => {
      cachedViews.value = [name];
    };
    return {
      cachedViews,
      addCacheRoute,
      clearCacheRoute,
    } as const;
  },
  {
    persist: true,
  },
);
