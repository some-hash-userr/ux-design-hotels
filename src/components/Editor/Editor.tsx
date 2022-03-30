import {ReactElement, useCallback, useRef, useState} from "react";
import Block from '../block/Block';
import {IValueModel} from "../../data/model/model";
import {default as MyImage} from "../widgets/Image/Image";
import exp from "constants";
import {IValueOperation} from "../../data/operation/operations";
import './Editor.css';

type IComponentType = (
    props: {
        value: IValueModel,
        setValue: (newValue: IValueModel) => void;
        mode: 'r' | 'w'
    }
) => ReactElement;

export const Editor: IComponentType = ({
    value,
    setValue,
    mode
}) => {

    // @ts-ignore
    return <div className={'App-Editor'}>
        {value.map((block, ind) => {

            const performOperation = (factory: (i: number) => IValueOperation) => {
                const operation = factory(ind);
                console.log('called inside editor');
                setValue(operation(value));
            }

            return <Block performOperation={performOperation} value={block.value}/>
        })}
    </div>
}

export const EDITOR_WIDTH = 710;
