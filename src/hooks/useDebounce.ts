import {useCallback, useRef} from "react";

export default function (func: () => void, ms: number) {
    const tmt = useRef(null);

    return useCallback(() => {
        tmt.current && clearTimeout(tmt.current);

        // @ts-ignore
        tmt.current = setTimeout(func, ms);
    }, [func, ms]);
}
