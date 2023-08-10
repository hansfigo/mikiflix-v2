import type { ApiCallResult } from "$lib/types/anime";
import type { PopupSettings } from "@skeletonlabs/skeleton";

export const generatePopupData = async (getFunc: Promise<ApiCallResult<any>>): Promise<PopupSettings[]> => {
    const popups: PopupSettings[] = [];
    console.log((await getFunc));
    
    (await getFunc).results.map((e, i) => {
        const popup: PopupSettings = {
            event: 'hover',
            target: `popupHover${i}`,
            placement: 'right',
        };
        popups.push(popup)
    })

    return popups
}