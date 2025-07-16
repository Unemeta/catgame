import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import * as globalApi from '@/services/global';

interface userInfo {
    uniqueId: string,
    avatar: string,
    nickname: string,
    nowExpPercent: number,
    fishAmount: number,
    language: number | null,
    totalLevel: number,
    uuid: string,
    diamond: number,
    coin: number,
    nowExp: number,
    loginDays: number,
    totalLevelTotalExp: number,
    meowname: string,
    day: number,
    isCheckin: boolean
}

const userDataAtom = atom<userInfo>(
    {
        uniqueId: '',
        avatar: '',
        nickname: '',
        nowExpPercent: 0,
        totalLevel: 0,
        diamond: 0,
        fishAmount: 0,
        language: null,
        loginDays:0,
        uuid: '',
        coin: 0,
        nowExp: 0,
        totalLevelTotalExp: 0,
        day: 0,
        meowname: '',
        isCheckin: false

    },
);

export const useUserData = () => {
    useHydrateAtoms([[userDataAtom, {
        uniqueId: '',
        avatar: '',
        nickname: '',
        nowExpPercent: 0,
        fishAmount: 0,
        language: null,
        isCheckin: false,
        uuid: '',
        totalLevel: 0,
        loginDays: 0,
        diamond: 0,
        coin: 0,
        nowExp: 0,
        totalLevelTotalExp: 0,
        day: 0,
        meowname: '',
    }]] as const);
    return useAtom(userDataAtom);
};

export const useFetchUser = () => {
    const [userData, setUserData] = useUserData();
    const fetchUser = async () => {
        try {
            const { data } = await globalApi.getUserInfo();
            setUserData(data);
            return data;
        } catch (error) {
            console.log('🚀 ~ file: user.ts  fetchUser ~ error', error);
        }
    };
    return { userData, fetchUser };
};