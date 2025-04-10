import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';



const showLevelUpAtom = atom<boolean>(
    false
);

export const useShowLevelUp = () => {
    useHydrateAtoms([[showLevelUpAtom, false]] as const);
    return useAtom(showLevelUpAtom);
};




const showLoveCollectAtom = atom<boolean>(
    false
);

export const useShowLoveCollect = () => {
    useHydrateAtoms([[showLoveCollectAtom, false]] as const);
    return useAtom(showLoveCollectAtom);
};


