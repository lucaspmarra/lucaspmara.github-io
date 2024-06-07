import {defineStore} from 'pinia';

interface HeroState {
    loaded: boolean;
    removeImg: boolean;
}

export const useHeroStore = defineStore({
    id: 'hero',
    state: (): HeroState => ({loaded: false, removeImg: false}),
    getters: {
        isLoaded: (state: HeroState): boolean => state.loaded,
        canRemoveImg: (state: HeroState): boolean => state.removeImg,
    },
    actions: {
        setLoaded(value: boolean) {
            this.$state.loaded = value;
        },
        setRemoveImg(value: boolean) {
            this.$state.removeImg = value;
        },
    },
});
