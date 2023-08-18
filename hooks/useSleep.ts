
import React, {useEffect, useState} from "react";

// 'T' is going to be a type declared at run-time instead of compile time
function useSleep<T>(value:T, delay?:number) {
    const [sleepValue, setSleepValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSleepValue(value)
        }, delay || 500 );

        return () => clearTimeout(timer) // не забываем про отчистку
    }, [value, delay]) // и про то, что все, что использовалось в юзэффекте попадает в список зависимостей

    return sleepValue;
}

export default useSleep;

// юзер пишет что-то в поиск, но мы ждем 500 мс, и только потом выводим результат, иначе будет мгновенный поиск