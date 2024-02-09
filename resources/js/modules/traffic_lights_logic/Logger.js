import {Config} from "./Config.js";
import {PublicConfig} from "../PublicConfig.js";

export class Logger {
    /**
     * Логирование
     * @param log_message
     */
    static log(log_message) {
        this.saveOnDb(log_message)
            .done(responseData => this.render(responseData))
    }

    /**
     * Сохранение лога в базе данных
     */
    static saveOnDb(log_message) {
        return $.ajax({
            url: PublicConfig.routes.LogController.store,
            method: 'POST',
            data: {
                log_message: log_message
            }
        })
    }

    /**
     * Отображение лога на странице
     * @param logObj
     */
    static render(logObj) {
        const $tableRow = $('<tr>')
        const $timeTd = $('<td>', {
            text: this.reformatDateTime(logObj.created_at)
        })
        const $messageTd = $('<td>', {
            text: logObj.log_message
        })

        $tableRow.append($timeTd, $messageTd)
        $(`.${Config.domElements.classes.logs} table`).prepend($tableRow)
    }

    /**
     * Делаем строку со временем более читабельной
     * @param datetimeStr
     */
    static reformatDateTime(datetimeStr) {
        const dateTime = new Date(datetimeStr)

        const year = dateTime.getFullYear()
        const month = String(dateTime.getMonth() + 1).padStart(2, '0')
        const day = String(dateTime.getDate()).padStart(2, '0')
        const hours = String(dateTime.getHours()).padStart(2, '0')
        const minutes = String(dateTime.getMinutes()).padStart(2, '0')
        const seconds = String(dateTime.getSeconds()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
}
