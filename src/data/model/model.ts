import { v4 as uuidv4 } from 'uuid';

interface IHashable {
    hash: () => string;
}

export class EmptyWidgetModel implements IHashable {
    private id: string;
    constructor() {
        this.id = uuidv4();
    }

    hash(): string {
        return this.id;
    }
}

export class EmptyImageModel implements IHashable {
    private id: string;
    constructor() {
        this.id = uuidv4();
    }

    hash(): string {
        return this.id;
    }
}

export class ImageModel implements IHashable {
    constructor(
        readonly src: string,
        readonly widthPX: number,
        readonly heightPX: number
    ) {}

    hash(): string {
        return this.src + this.widthPX + this.heightPX;
    }
}

export class TextModel implements IHashable {
    constructor(
        readonly value: string
    ) {}

    hash(): string {
        return this.value;
    }
}

type IWidgetModel =
    | EmptyWidgetModel
    | ImageModel
    | EmptyImageModel
    | TextModel;
export type IBlockValue =
    | [IWidgetModel]
    | [IWidgetModel, IWidgetModel]
    | [IWidgetModel, IWidgetModel, IWidgetModel];

export class Block implements IHashable {
    constructor(readonly value: IBlockValue) {}

    hash(): string {
        return this.value.reduce((acc, vm) => {
            return acc + vm.hash();
        }, '');
    }
}

export type IValueModel = Block[];
