import {DragEventHandler, FC, SyntheticEvent, useCallback, useMemo, useRef, useState} from "react";
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
    heightPX,
}) => {

    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const [imgSrc, setImgSrc] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const idd = useMemo(() => {
        return uuidv4();
    }, [])

    const readFile = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            if(!result) return;
            setImgSrc(result);

            const name = file.name;

            console.log(`added fileName=${name}`);

            setTimeout(() => {
                performOperation(InsertImage(
                    new ImageModel(
                        name,
                        result,
                        imgRef.current?.naturalWidth ?? 0,
                        imgRef.current?.naturalHeight ?? 0
                    )
                ))
            }, 50);
        }
        reader.readAsDataURL(file);
    }, [performOperation]);

    const onChangeInput = useCallback(() => {
        // @ts-ignore
        const file: File = inputRef.current?.files[0]

        if(file) {
            readFile(file);
        }
    }, [readFile]);

    // const readFiless = useCallback(() => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         const result = reader.result as string;
    //         if(!result) return;
    //         setImgSrc(result);
    //
    //         // @ts-ignore
    //         const name = inputRef.current.files[0].name;
    //
    //         console.log(`added fileName=${name}`);
    //
    //         setTimeout(() => {
    //             performOperation(InsertImage(
    //                 new ImageModel(
    //                     result,
    //                     imgRef.current?.naturalWidth ?? 0,
    //                     imgRef.current?.naturalHeight ?? 0
    //                 )
    //             ))
    //         }, 50);
    //     }
    //     // @ts-ignore
    //     if(inputRef.current?.files[0])
    //         reader.readAsDataURL(inputRef.current?.files[0]);
    // }, [performOperation]);


    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);



    // // @ts-ignore
    // function dragOverHandler(ev) {
    //     console.log('File(s) in drop zone');
    //
    //     // Prevent default behavior (Prevent file from being opened)
    //     ev.preventDefault();
    // }

    const onDrop = useCallback((ev) => {
        ev.preventDefault();

        let inputImageFile: File | null = null;

        // @ts-ignore
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            // @ts-ignore
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                // @ts-ignore
                if (ev.dataTransfer.items[i].kind === 'file') {
                    // @ts-ignore
                    const file = ev.dataTransfer.items[i].getAsFile();
                    if (file && (file.name.match(new RegExp('.png')) ||
                        file.name.match(new RegExp('.jpeg')) ||
                        file.name.match(new RegExp('.jpg')))) {
                        inputImageFile = file;
                        break;
                    }
                    console.log('... file[' + i + '].name = ' + file.name);
                }
            }
        }

        if(inputImageFile) readFile(inputImageFile);
    }, [readFile]);

    return <div className={`App-EmptyImage App-Block__item ${isDragOver && 'App-EmptyImage__dark'}`} onClick={() => {
        // @ts-ignore
        inputRef.current.click();
    }} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={(e) => onDrop(e)} style={{
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
               onChange={onChangeInput} ref={inputRef}/>
        <img ref={imgRef} src={imgSrc} style={{position: 'fixed', left: '-15000px'}}/>
    </div>
}
