/**
 * Хук для принудидельного ререндера. Удобен при работе с ref'ами,
 * поскольку позволяет спровоцировать ререндер из любого места.
 * Пример использования хука можно посмотреть в файле useMaybePromiseFactory.ts
 */
import {useCallback, useState} from "react";

export const useForceRender = () => {
    const [_, setValue] = useState(0); // integer state
    return useCallback(() => {
        setValue((value) => value + 1); // update the state to force render
    }, []);
};
