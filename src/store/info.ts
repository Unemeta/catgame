import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

interface basicInfo {
    nickname: string,
    age: number,
    gender: number
}

const userBasicInfo = atom<basicInfo>(
    {
        nickname: '',
        age: 0,
        gender: 0
    },
);

export const useUserBasicInfo = () => {
    useHydrateAtoms([[userBasicInfo, {
        nickname: '',
        age: 0,
        gender: 0
    }]] as const);
    return useAtom(userBasicInfo);
};
