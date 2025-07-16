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


const showRewardsDia = atom<boolean>(false) // 是否显示奖励弹框

export const useRewardsDia = () => {
    useHydrateAtoms([[showRewardsDia, false]] as const);
    return useAtom(showRewardsDia);
};


const playItemId = atom<number>(0) // 存放执行play道具的id

export const usePlayItemId = () => {
    useHydrateAtoms([[playItemId, 0]] as const);
    return useAtom(playItemId);
};



const rewardDiaOpenByLevelup = atom<boolean>(false) // 是否通过levelup的确认键去显示奖励

export const useRewardDiaOpenByLevelup = () => {
    useHydrateAtoms([[rewardDiaOpenByLevelup, false]] as const);
    return useAtom(rewardDiaOpenByLevelup);
};


const showTalkSelcetDia = atom<boolean>(false) // 是否显示talk技能选择

export const useTalkSelcetDia = () => {
    useHydrateAtoms([[showTalkSelcetDia, false]] as const);
    return useAtom(showTalkSelcetDia);
};




const showVocie = atom<boolean>(false) // 是否显示talk技能选择

export const useShowVocie = () => {
    useHydrateAtoms([[showVocie, false]] as const);
    return useAtom(showVocie);
};


const showCheckInDia = atom<boolean>(false) // 是否显示签到弹框

export const useCheckInDia = () => {
    useHydrateAtoms([[showCheckInDia, false]] as const);
    return useAtom(showCheckInDia);
};


const showExchange = atom<boolean>(false)
export const useExchange = () => {
    useHydrateAtoms([[showExchange, false]] as const);
    return useAtom(showExchange);
};
