import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import * as globalApi from '@/services/global';

interface userInfo {
    uniqueId: string,
    avatar: string,
    nickname: string,
    nowExpPercent: 0,
    totalLevel: 0,
    diamonds: 0,
    gold: 0
}

const userDataAtom = atom<userInfo | object>(
    {},
);

export const useUserData = () => {
    useHydrateAtoms([[userDataAtom, {}]] as const);
    return useAtom(userDataAtom);
};

export const useFetchUser = () => {
    const [userData, setUserData] = useUserData();
    const fetchUser = async () => {
        try {
            const { data } = await globalApi.getUserInfo();
            setUserData(data);
        } catch (error) {
            console.log('🚀 ~ file: user.ts  fetchUser ~ error', error);
        }
    };
    return { userData, fetchUser };
};