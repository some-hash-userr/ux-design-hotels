import React, {FC, useCallback, useState} from "react";
import './ActionPanel.css';
import '../../App.css';
import {Block, EmptyImageModel, EmptyWidgetModel, TextModel} from "../../data/model/model";
import imageWidgetPng from '../../png/imageWidget.png';
import {log} from "util";

interface IProps {
    onAdd: (newBlock: Block) => void;
}

export const ActionPanel: FC<IProps> = ({
    onAdd
}) => {
    const [state, setState] = useState<'blocks' | 'widgets'>('blocks');

    const onDragStart = useCallback((e, toAdd: 'text' | 'image') => {
        e.dataTransfer.setData('modelItem', toAdd);
    }, []);

    return <div className={'App-ActionPanel__container'}>
        <div className={'App-ActionPanel__upLine'}>
            <div onClick={() => setState('blocks')} id={'App-ActionPanel__blocks'} className={'App-headerText'} style={{
                color: state === 'blocks' ? '' : 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer'
            }}>Блоки</div>
            <div onClick={() => setState('widgets')} id={'App-ActionPanel__widgets'} className={'App-headerText'} style={{
                color: state === 'widgets' ? '' : 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer'
            }}>Виджеты</div>
        </div>
        <div className={'App-ActionPanel__separator'}/>
        {state === 'blocks' ?
            <div className={'App-ActionPanel__blocks__variants'}>
                <div onClick={() => {
                onAdd(new Block([new EmptyWidgetModel()]))}
                } className={'App-ActionPanel__blocks__variant'}>
                    <div className={'App-ActionPanel__blocks__variant__block1'}/>
                </div>
                <div onClick={() => {
                    onAdd(new Block([new EmptyWidgetModel(), new EmptyWidgetModel()]))}}
                    className={'App-ActionPanel__blocks__variant'}>
                    <div className={'App-ActionPanel__blocks__variant__block2'}/>
                    <div className={'App-ActionPanel__blocks__variant__block2'}/>
                </div>
                <div onClick={() => {
                    onAdd(new Block([new EmptyWidgetModel(), new EmptyWidgetModel(), new EmptyWidgetModel()]))}}
                    className={'App-ActionPanel__blocks__variant'}>
                    <div className={'App-ActionPanel__blocks__variant__block3'}/>
                    <div className={'App-ActionPanel__blocks__variant__block3'}/>
                    <div className={'App-ActionPanel__blocks__variant__block3'}/>
                </div>
            </div> :
            <div className={'App-ActionPanel__widgets__variants'}>
                <div draggable={'true'} onDragStart={(e) => {
                    onDragStart(e,'text');
                }
                } className={'App-ActionPanel__widgets__variant'}>
                    <div style={{margin: 'auto'}}>Текст</div>
                </div>
                <div draggable={'true'} onDragStart={e => {
                    onDragStart(e, 'image')
                }} className={'App-ActionPanel__widgets__variant'}>
                    <img src={imageWidgetPng} style={{
                        width: '36px',
                        height: '43px',
                        margin: 'auto'
                    }}/>
                </div>
            </div>
        }
        <div className={'App-common__button'} style={{marginTop: '45px'}} onClick={() => console.log('Clicked далее')}>
            <div className={'App-common__button__text'}>
                Далее
            </div>
        </div>
    </div>
}
