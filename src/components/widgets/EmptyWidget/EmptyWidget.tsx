import {FC, useCallback} from "react";
import {ChangeBlockItem, IBlockOperation} from "../../../data/operation/operations";
import '../../block/Block.css';
import {EmptyImageModel, TextModel} from "../../../data/model/model";

interface IProps {
    widthPX: number;
    heightPX: number;
    performOperation: (factory: (i: number) => IBlockOperation) => void;
}

export const EmptyWidget: FC<IProps> = ({
    performOperation,
    widthPX,
    heightPX
}) => {
    const onDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const onDrop = useCallback((e) => {
        const data = e.dataTransfer.getData('modelItem');
        if(data !== 'text' && data !== 'image') return;

        if (data === 'text') performOperation(ChangeBlockItem(new TextModel('Текст')));
        if (data === 'image') performOperation(ChangeBlockItem(new EmptyImageModel()));
    }, [performOperation]);

    return <div onDragOver={onDragOver} onDrop={(e) => onDrop(e)} className={'App-emptyWidget App-Block__item'} style={{
        width: `${widthPX}px`,
        height: `${heightPX}px`,
        border: '1px solid #000000'
    }}/>;
}
