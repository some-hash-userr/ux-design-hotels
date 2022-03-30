import {useCallback, useRef, useState} from "react";
import {useForceRender} from "./useForceRender";

type IUseToggleType = (initial: boolean) => [boolean, () => void];

export const useToggle: IUseToggleType = (initial) => {
    const [state, setState] = useState<boolean>(initial);
    const value = useRef<boolean>(initial);
    const render = useForceRender();

    const toggle = useCallback<() => void>(() => {
        value.current = !value.current;
        render();
    }, [render]);

    return [value.current, toggle];
}
