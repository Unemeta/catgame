import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import * as globalApi from '@/services/global';

interface userInfo {
    uniqueId: string,
    avatar: string,
    nickname: string,
    nowExpPercent: number,
    totalLevel: number,
    diamonds: number,
    gold: number
}

const userDataAtom = atom<userInfo>(
    {
        uniqueId: '',
        avatar: '',
        nickname: '',
        nowExpPercent: 0,
        totalLevel: 0,
        diamonds: 0,
        gold: 0
    },
);

export const useUserData = () => {
    useHydrateAtoms([[userDataAtom, {
        uniqueId: '',
        avatar: '',
        nickname: '',
        nowExpPercent: 0,
        totalLevel: 0,
        diamonds: 0,
        gold: 0
    }]] as const);
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