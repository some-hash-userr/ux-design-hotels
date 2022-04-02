import './Common.css';
import {useToggle} from "../../hooks/useToggle";
import {useState} from "react";

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
        {/*<div className="Common-buttons-container">*/}
        {/*    <Button title="Апартаменты"/>*/}
        {/*    <Button title="Дома"/>*/}
        {/*    <Button title="Отели"/>*/}
        {/*</div>*/}
        <Type/>
        <div className="Common-header">Название объекта</div>
        <input className="Common-item Common-item-text Common-input"  type={'text'} placeholder="Введите название"/>
        <div className="Common-header">Адрес</div>
        <input className="Common-item Common-item-text Common-input"  type={'text'} placeholder="Введите адрес"/>
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

const Type = () => {
    const [active, setActive] = useState<'Апартаменты' | 'Дома' | 'Отели' | null>(null);

    return <div className="Common-buttons-container">
        <div className="Common-item" style={{
            background: active === "Апартаменты" ? '#CAD1F5' : '#FFFFFF',
            cursor: 'pointer'
        }} onClick={() => setActive('Апартаменты')}>
            <span className="Common-item-text">Апартаменты</span>
        </div>
        <div className="Common-item" style={{
            background: active === "Дома" ? '#CAD1F5' : '#FFFFFF',
            cursor: 'pointer'
        }} onClick={() => setActive('Дома')}>
            <span className="Common-item-text">Дома</span>
        </div>
        <div className="Common-item" style={{
            background: active === "Отели" ? '#CAD1F5' : '#FFFFFF',
            cursor: 'pointer'
        }} onClick={() => setActive('Отели')}>
            <span className="Common-item-text">Отели</span>
        </div>
        {/*<Button title="Апартаменты"/>*/}
        {/*<Button title="Дома"/>*/}
        {/*<Button title="Отели"/>*/}
    </div>
}

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
