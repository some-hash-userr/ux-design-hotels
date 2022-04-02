import {ImageModel, IValueModel, IWidgetModel} from "../../data/model/model";
import {FC} from "react";

interface IResultsProps {
    model: IValueModel
}

export const Results: FC<IResultsProps> = ({model}) => {

    // @ts-ignore
    const widgetModels: IWidgetModel[] = model.reduce((acc, next) => ([...acc, ...next.value]), []);

    const imagePaths: string[] = widgetModels
        .filter((wm) => wm instanceof ImageModel)
        .map((wm) => wm as ImageModel)
        .map((wm) => wm.path);




    // const filesString: string = widgetModels
    //     .filter((wm) => wm instanceof ImageModel)
    //         .map((wm) => wm as ImageModel)
    //         .map((wm) => wm.path)
    //         .reduce((acc, next) => (`${acc},\n${next}`), '[\n')
    //     + '\n]'
    // ;


    return <div>
        <div className="App-results__header App-headerText">
            Замечательно! Эксперимент закончен
        </div>
        <div className="App-file__list">
            Список выбранных файлов:
            {/*{filesString}*/}
        </div>
        <div>[</div>
        {imagePaths.map((name) => (
            <div>{name},</div>
        ))}
        <div>[</div>
    </div>
}
