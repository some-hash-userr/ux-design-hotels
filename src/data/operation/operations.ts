import {Block, EmptyImageModel, IBlockValue, ImageModel, IValueModel, TextModel} from "../model/model";

export type IValueOperation = (was: IValueModel) => IValueModel;
export type IBlockOperation = (was: IBlockValue) => IBlockValue;

export const changeBlockValue = (newBlockValue: IBlockValue) => (blockInd: number): IValueOperation => {
    return (was: IValueModel) => {
        return was.map((item, index) => {
            return blockInd === index ? new Block(newBlockValue): item
        }) as IValueModel;
    }
}

export const InsertImage = (image: ImageModel) => (i: number): IBlockOperation => {
    return (was: IBlockValue) => {
        return was.map((item, index) => {
            return i === index ? image: item
        }) as IBlockValue;
    }
}

export const EditText = (text: TextModel) => (i: number): IBlockOperation => {
    return (was: IBlockValue) => {
        return was.map((item, index) => {
            return i === index ? text: item
        }) as IBlockValue;
    }
}

export const ChangeBlockItem = (newItem: TextModel | EmptyImageModel) => (i: number): IBlockOperation => {
    return (was: IBlockValue) => {
        return was.map((item, index) => {
            return i === index ? newItem: item
        }) as IBlockValue;
    }
}

export const RemoveBlock = () => (i: number): IValueOperation => {
    return (was: IValueModel) => {
        return was.filter((el, index) => {
            return i !== index;
        }) as IValueModel;
        // return was.map((item, index) => {
        //     return i === index ? newItem: item
        // }) as IBlockValue;
    }
}
