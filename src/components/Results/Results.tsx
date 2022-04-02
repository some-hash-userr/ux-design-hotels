import {ImageModel, IValueModel, IWidgetModel} from "../../data/model/model";
import {FC, useEffect} from "react";

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return <div className="App-results">
        <div className="App-results__header App-headerText">
            Задание успешно выполнено. Сообщите об этом модератору
        </div>
        <div className="App-file__list">
            Список выбранных файлов:
            {/*{filesString}*/}
        </div>
        <div>[</div>
        {imagePaths.map((name) => (
            <div>{name},</div>
        ))}
        <div>]</div>
    </div>
}
