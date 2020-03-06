import React, {Component} from 'react';
import styles from './Main.scss';
import Preloader from "../../Preloader/Preloader";
const API_KEY = 'ec6ad128cb27d3422ba0afa3f9df1389';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
            weather: '',
            temperature: undefined,
            inputCity: ''
        }
    }

    getCelciusFromKelvin = (temperature) => {
        const KELVIN_TO_CELCIUS = 273.15;
        return Math.round(temperature - KELVIN_TO_CELCIUS);
    };

    getWeather = async (city) => {
        if (city.trim() !== '') {
            const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
            this.setState({
                city: '',
                temperature: '',
                weather: '',
                inputCity: ''
            });

            const promise = await fetch(url);
            if (promise.ok) {
                const response = await promise.json();
                console.log('[Data is ready]');
                console.log(response);
                this.setState({
                    city: response.name,
                    temperature: this.getCelciusFromKelvin(response.main.temp),
                    weather: response
                })
            } else {
                this.getWeather('Saint Petersburg, RU');
            }
        }


    };

    handleChangeCity = (e) => {
        this.setState({
            inputCity: e.target.value
        })
    };

    handleOnKeydown = (e) => {
        if (e.keyCode === 13) {
            this.getWeather(this.state.inputCity);
        }
    };

    componentDidMount() {
        this.getWeather('Saint Petersburg, RU');
    }

    render() {
        const {city, temperature, inputCity, weather} = this.state;
        let content = <Preloader/>;
        if (city === '') {
            content = <Preloader/>;
        } else {
            content = <div className={styles.main}>
                <div className={styles.main_container}>
                    <h1 className={styles.main_title}>{city}</h1>
                    <p className={styles.main_weather}>{weather.weather[0].main}</p>
                    <p className={styles.main__temp}>{temperature} °C</p>

                    <form onSubmit={(e) => {e.preventDefault()}} className={styles.main_form} action="">
                        <p className={styles.main_select_text}>Show another city:</p>
                        <input onKeyDown={(e) => {this.handleOnKeydown(e)}} placeholder={'city'} className={styles.main_input} onChange={(e)=> {this.handleChangeCity(e)}} type="text" id={'city'} name={'city'} value={inputCity}/>
                        <button className={styles.main_btn} type={'button'} onClick={()=> {this.getWeather(inputCity)}}>Find</button>
                    </form>
                </div>

            </div>;
        }
        return(content)
    }
}
