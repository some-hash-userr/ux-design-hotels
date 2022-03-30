import {FC, memo, useMemo} from "react";
import {EmptyImageModel, EmptyWidgetModel, IBlockValue, TextModel} from "../../data/model/model";
import Text from '../widgets/Text/Text';
import Image from '../widgets/Image/Image';
import './Block.css';
import {EmptyImage} from "../widgets/Image/EmptyImage";
import {EDITOR_WIDTH} from "../Editor/Editor";
import {changeBlockValue, IBlockOperation, IValueOperation, RemoveBlock} from "../../data/operation/operations";
import {EmptyWidget} from "../widgets/EmptyWidget/EmptyWidget";
import deleteImg from '../../png/delete.png';

interface IBlockProps {
    value: IBlockValue,
    performOperation: (factory: (i: number) => IValueOperation) => void;
    // perfromBlock: (factory: (i: number) => IBlockOperation) => void;
}

const Block: FC<IBlockProps> = (
    {
        value,
        performOperation,
        // perfromBlock
    }
) => {
    const widths_heights: Array<{
        width: number,
        height: number
    }> = useMemo(() => {
        const array = value.map((widget) => {
            if (widget instanceof TextModel || widget instanceof EmptyImageModel || widget instanceof EmptyWidgetModel) {
                return {
                    width: 1,
                    height: 1
                }
            }
            return {
                width: widget.widthPX,
                height: widget.heightPX,
            }
        })

        const array2 = array.map(({width, height}) => ({
            width: 1000 * width / height,
            height: 1000
        }));

        const sumWidth = array2.reduce((acc, {width}) => acc + width, 0);

        const k = (EDITOR_WIDTH)  / sumWidth;


        return array2.map(({width, height}) => ({
            width: width * k,
            height: height * k
        }))
    }, [value]);



    return <div className={'App-Block'}>
        {value.map((widget, ind) => {
            const widgetPerformOperation = (factory: (i: number) => IBlockOperation) => {
                console.log('called inside block');
                performOperation(changeBlockValue(factory(ind)(value)));
            }

            if (widget instanceof TextModel) {
                return <Text performOperation={widgetPerformOperation} value={widget.value}
                             widthPX={widths_heights[ind].width}
                             heightPX={widths_heights[ind].height} key={widget.hash()} />
            }
            if (widget instanceof EmptyImageModel) {
                return <EmptyImage performOperation={widgetPerformOperation}
                    widthPX={widths_heights[ind].width}
                                   heightPX={widths_heights[ind].height}
                                   key={widget.hash()}
                />
            }
            if (widget instanceof EmptyWidgetModel) {
                return <EmptyWidget performOperation={widgetPerformOperation}
                                   widthPX={widths_heights[ind].width}
                                   heightPX={widths_heights[ind].height}
                                   key={widget.hash()}
                />
            }
            return <Image src={widget.src}
                          performOperation={widgetPerformOperation}
                          widthPX={widths_heights[ind].width}
                          heightPX={widths_heights[ind].height} key={widget.hash()}/>;
        })
        }
        {/*<img className={'App-Block__remove'}  src={deleteImg} onClick={() => {*/}
        {/*    performOperation(RemoveBlock());*/}
        {/*}}/>*/}
    </div>
}

// export default memo(Block);
export default Block;
