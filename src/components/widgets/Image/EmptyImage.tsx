import {FC, useCallback, useMemo, useRef, useState} from "react";
import {ImageModel} from "../../../data/model/model";
import {IBlockOperation, InsertImage} from "../../../data/operation/operations";
import { v4 as uuidv4 } from '../../../uuid';
import '../../block/Block.css';
import inputImageIcon from '../../../svg/inputImage.svg';

interface IProps {
    widthPX: number;
    heightPX: number;
    performOperation: (factory: (i: number) => IBlockOperation) => void;
}

export const EmptyImage: FC<IProps> = ({
    performOperation,
    widthPX,
    heightPX
}) => {

    const [imgSrc, setImgSrc] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const idd = useMemo(() => {
        return uuidv4();
    }, [])

    const readFile = useCallback(() => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            if(!result) return;
            setImgSrc(result);

            // @ts-ignore
            const name = inputRef.current.files[0].name;

            console.log(`added fileName=${name}`);

            setTimeout(() => {
                performOperation(InsertImage(
                    new ImageModel(
                        result,
                        imgRef.current?.naturalWidth ?? 0,
                        imgRef.current?.naturalHeight ?? 0
                    )
                ))
            }, 50);
        }
        // @ts-ignore
        if(inputRef.current?.files[0])
            reader.readAsDataURL(inputRef.current?.files[0]);
    }, [performOperation]);

    return <div className={'App-EmptyImage App-Block__item'} onClick={() => {
        // @ts-ignore
        inputRef.current.click();
    }} style={{
        width: `${widthPX}px`,
        height: `${heightPX}px`,
        border: '1px solid #000000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }}>
        <img src={inputImageIcon} style={{
            width: '43px',
            height: '36px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }}/>
        <input id={`file-upload-${idd}`} type="file" accept=".png, .jpg, .jpeg" style={{display: 'none'}}
               onChange={readFile} ref={inputRef}/>
        <img ref={imgRef} src={imgSrc} style={{position: 'fixed', left: '-15000px'}}/>
    </div>
}
