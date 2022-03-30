import React, {ReactElement} from "react";
import "./PhaseLine.css";
import photosPhase from "../../svg/photosPhase.svg";
import phaseCircle from "../../svg/phaseCircle.svg";
import progressCommon from './progress.png';
import progressEdit from './progess2.png';


type IComponentType = ({stage}: {stage: string}) => ReactElement;

export const PhaseLine: IComponentType = ({stage}) => {
    return (
        <div className={'App-phaseLine'}>
            <img src={stage === 'common' ? progressCommon : progressEdit} style={{
                width: '300px',
                height: '25px'
            }}/>
        </div>
    )
}
