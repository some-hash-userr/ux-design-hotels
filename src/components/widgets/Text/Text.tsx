import {TextModel} from "../../../data/model/model";
import {FC, memo, ReactElement, useRef} from "react";
import {EditText, IBlockOperation, IValueOperation} from "../../../data/operation/operations";
import useDebounce from "../../../hooks/useDebounce";
import '../../block/Block.css';
import '../../../App.css';

type IComponentType = (
    props: ITextProps
) => ReactElement;

interface ITextProps {
    value: string,
    widthPX: number,
    heightPX: number
    performOperation: (factory: (i: number) => IBlockOperation) => void;
}

const TextWidget: FC<ITextProps> = (
    {
        value,
        widthPX,
        heightPX,
        performOperation
    }
) => {
    const textElem = useRef<HTMLDivElement>(null);

    const updateText = useDebounce(() => {
        performOperation(EditText(new TextModel(textElem.current?.innerText || '')))
    }, 2500);

    return <div className={'App-Block__item'} style={{
        // textAlign: 'center'
        width: `${widthPX}px`,
        height: `${heightPX}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <span className={'App-mainText'} ref={textElem} onInput={updateText} contentEditable={'true'} style={{
        }}>
            {value}
        </span>
    </div>;
}

export default memo(TextWidget);
