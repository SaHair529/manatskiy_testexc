import './../../jquery.js'
import {Config} from "./Config.js";
import {Logger} from "./Logger.js";

export class TrafficLightsLogic {
    /**
     * Инициализация всех методов (У каждого главного класса модуля есть такая функция)
     * По ней легко определить что именно делает класс
     */
    static init() {
        this.switchingLightBulbs()
        this.forwardButtonListen()
    }

    /**
     * Переключение лампочек светофора
     */
    static switchingLightBulbs() {
        const $activeLamp = $(`.${Config.domElements.classes.trafficLightLamp}.active`)
        $activeLamp.removeClass('active')

        let waitTime
        if ($activeLamp.hasClass('red') || $activeLamp.length === 0) {
            waitTime = 2000
            $(`.${Config.domElements.classes.trafficLightLamp}.yellow`)
                .addClass('active')
                .addClass('before_green')
        }
        else if ($activeLamp.hasClass('green')) {
            waitTime = 2000
            $(`.${Config.domElements.classes.trafficLightLamp}.yellow`)
                .addClass('active')
                .addClass('before_red')
        }
        else if ($activeLamp.hasClass('yellow')) {
            waitTime = 5000
            if ($activeLamp.hasClass('before_green')) {
                $activeLamp.removeClass('before_green')
                $(`.${Config.domElements.classes.trafficLightLamp}.green`).addClass('active')
            }
            else if ($activeLamp.hasClass('before_red')) {
                $activeLamp.removeClass('before_red')
                $(`.${Config.domElements.classes.trafficLightLamp}.red`).addClass('active')
            }
        }

        setTimeout(() => this.switchingLightBulbs(), waitTime)
    }

    static forwardButtonListen() {
        $(`.${Config.domElements.classes.forwardButton}`).on('click', () => {
            const $activeLamp = $(`.${Config.domElements.classes.trafficLightLamp}.active`)
            if ($activeLamp.hasClass('red')) {
                Logger.log('Проезд на красный. Штраф!')
            }
            else if ($activeLamp.hasClass('green')) {
                Logger.log('Проезд на зеленый!')
            }
            else if ($activeLamp.hasClass('yellow')) {
                if ($activeLamp.hasClass('before_red')) {
                    Logger.log('Успели на желтый!')
                }
                else if ($activeLamp.hasClass('before_green')) {
                    Logger.log('Слишком рано начали движение!')
                }
            }
        })
    }
}
