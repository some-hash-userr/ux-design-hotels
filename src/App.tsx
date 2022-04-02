import React, {useCallback, useState} from 'react';
import {Header} from "./components/header/Header";
import {PhaseLine} from "./components/PhaseLine/PhaseLine";
import {Editor} from "./components/Editor/Editor";
import {
    Block,
    EmptyImageModel,
    ImageModel,
    IValueModel,
    TextModel
} from "./data/model/model";
import './App.css';
import {ActionPanel} from "./components/ActionPanel/ActionPanel";
import common from './png/common.png';
import photo1 from './hotels/IMG-01-01-01.png';
import photo2 from './hotels/IMG-01-01-02.png';
import photo3 from './hotels/IMG-01-01-03.png';
// import photo4 from './hotels/IMG-01-02-01.png';
import photo6 from './hotels/IMG-01-02-03.png';
import photo7 from './hotels/IMG-01-03-01.png';
import photo8 from './hotels/IMG-01-03-02.png';
import photo9 from './hotels/IMG-01-03-03.png';
import photoAtmo from './hotels/IMG-02-03-02.png';
import photo100 from './hotels/IMG-03-01-03.png';
import {Common} from "./components/common/Common";
import {Results} from "./components/Results/Results";


const value: IValueModel = [
    new Block([
        // new ImageModel(photo1, 5184, 3456),
        new EmptyImageModel(),
        new TextModel('2-3 фотографии того, что можно делать в отеле'),
    ]),
    new Block([

        new EmptyImageModel(),

        // new ImageModel(photo2, 1380, 690),
        new EmptyImageModel()
    ]),
    new Block([
        new TextModel('3-4 фотографии интерьера номеров'),
        // new ImageModel(photo3, 1024, 768),
        new EmptyImageModel()
    ]),
    new Block([
        new EmptyImageModel(),
        new EmptyImageModel()

        // new ImageModel(photo7, 550, 367),
        // new ImageModel(photo8, 312, 367)
    ]),
    new Block([
        new TextModel('1-2 фотографии отеля и его окружения'),
        // new ImageModel(photo6, 1200, 958),
        new EmptyImageModel()

    ]),
    new Block([
        new EmptyImageModel(),
        // new ImageModel(photo100, 550, 367),
        new TextModel('1-2 фотографии ресторана и блюд ')
    ]),
    new Block([
        new TextModel('1-2 фотографии атмосферы в отеле'),
        new EmptyImageModel()
        // new ImageModel(photoAtmo, 550, 367),
    ]),
]

function App() {
    const [model, setModel] = useState(value);
    const onAddBlock =  useCallback((newBlock: Block) => {
        setModel([
            ...model,
            newBlock
        ])
    }, [model]);

    const [stage, setStage] = useState<'common' | 'edit' | 'results'>('common');

    return (
        <div className="App-root">
            {stage === 'common' &&
                <>
                    <Header/>
                    <PhaseLine stage={stage}/>
                    <Common/>
                    <div className={'App-common__button'} onClick={() => setStage('edit')}>
                        <div className={'App-common__button__text'}>
                            Далее
                        </div>
                    </div>
                </>
            }
            {stage === 'edit' &&
            <>
                <Header/>
                <PhaseLine stage={stage}/>
                <div className={'App-editZone__container'}>
                    <Editor value={model} setValue={setModel} mode={'w'}/>
                    <div style={{
                        width: '382px',
                        // height: '500px'
                    }}>
                        <ActionPanel goResults={() => setStage('results')} onAdd={onAddBlock}/>
                    </div>
                </div>
            </>
            }
            {stage === 'results' &&
                <Results model={model}/>
            }
    </div>
    );
}

export default App;
