import './Common.css';
import {useToggle} from "../../hooks/useToggle";

const data = [
    {
        category: 'Тип объекта',
        values: ['Апартаменты', 'Дома', 'Отели']
    },
    {
        category: 'Название субъекта',
        values: ['Отель', 'Дома', 'Отели']
    }
]

export const Common = () => {
    return <div className="Common-container">
        <div className="Common-header">Тип объекта</div>
        <div className="Common-buttons-container">
            <Button title="Апартаменты"/>
            <Button title="Дома"/>
            <Button title="Отели"/>
        </div>
        <div className="Common-header">Название субъекта</div>
        <div className="Common-item" style={{
            width: '489px'
        }}>
            <span className="Common-item-text" contentEditable="true"></span>
        </div>
        <div className="Common-header">Адрес</div>
        <div className="Common-item" style={{
            width: '489px'
        }}>
            <span className="Common-item-text" contentEditable="true"></span>
        </div>
        <div className="Common-header">Удобства</div>
        <div className="Common-buttons-container">
            <Button title="Парковка"/>
            <Button title="Wi-Fi"/>
            <Button title="Отопление"/>
        </div>
        <div style={{height: '14px'}}/>
        <div className="Common-buttons-container">
            <Button title="Завтрак"/>
            <Button title="Утюг"/>
            <Button title="Кондиционер"/>
        </div>
        <div style={{height: '14px'}}/>
        <div className="Common-buttons-container">
            <Button title="Апартаменты"/>
            <Button title="Холодильник"/>
            <Button title="Телевизор"/>
        </div>
        <div style={{height: '14px'}}/>
        <div className="Common-buttons-container">
            <Button title="Бассейн"/>
            <Button title="Сауна"/>
            <Button title="Балкон"/>
        </div>
    </div>;
};

// @ts-ignore
const Button = ({title}) => {
    const [isActive, toggle] = useToggle(false);

    return <div className="Common-item" style={{
        background: isActive ? '#CAD1F5' : '#FFFFFF',
        cursor: 'pointer'
    }} onClick={toggle}>
        <span className="Common-item-text">{title}</span>
    </div>
}
