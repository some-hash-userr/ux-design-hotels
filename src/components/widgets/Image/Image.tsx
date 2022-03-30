import {ImageModel} from "../../../data/model/model";
import {ReactElement, FC, memo} from "react";
import {IBlockOperation} from "../../../data/operation/operations";
import '../../block/Block.css';

type IComponentType = (
    props: IImageProps
) => ReactElement;

interface IImageProps {
    src: string,
    widthPX: number,
    heightPX: number,
    performOperation: (factory: (i: number) => IBlockOperation) => void;
}

const Image: FC<IImageProps> = (
    {
        src,
        widthPX,
        heightPX
    }
) => {
    return <img className={'App-Block__item'} src={src} width={`${widthPX}px`} height={`${heightPX}px`}
    style={{background: 'blue'}}/>;
}

export default memo(Image);
