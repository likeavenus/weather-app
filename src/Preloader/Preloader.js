import React, {Component} from 'react';
import styles from './Preloader.scss';
import preloader from './img/preloader.svg';

export default class Preloader extends Component {
    render() {
        return(
            <img className={styles.preloader} src={preloader} alt=""/>
        );
    }
}
