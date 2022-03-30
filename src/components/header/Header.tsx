import React, {ReactElement} from "react";
import "./Header.css";
import "../../App.css";
import logo from "../../logo.svg";

type IComponentType = () => ReactElement;

export const Header: IComponentType = () => {
    return <header className={'App-header'}>
        <span className={'App-logoText'}>
            Book
            Best
            Hotel
        </span>
    </header>
}
