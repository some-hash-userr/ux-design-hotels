import {
    RefObject,
    useEffect,
    useState
} from 'react';

type IHookType = (targetRef: RefObject<HTMLElement>) => boolean;

export const useHover: IHookType = (targetRef) => {

    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(() => {
        if (!targetRef.current) {
            return;
        }
        const node = targetRef.current;

        const on = () => setHovered(() => true);
        const off = () => setHovered(() => false);

        node.addEventListener('mouseenter', on);
        node.addEventListener('mousemove', on);
        node.addEventListener('mouseleave', off);

        return () => {
            node.removeEventListener('mouseenter', on);
            node.removeEventListener('mousemove', on);
            node.removeEventListener('mouseleave', off);
        };
    }, [targetRef.current]);

    return hovered;
};
