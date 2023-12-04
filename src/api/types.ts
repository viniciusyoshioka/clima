
export type LanguageCode = "ms" | "gu" | "is" | "wa" | "mg" | "gl" | "om"
    | "ku" | "tw" | "mk" | "ee" | "fj" | "gd" | "ky" | "yo" | "zu" | "bg"
    | "tk" | "co" | "sh" | "de" | "kl" | "bi" | "km" | "lt" | "fi" | "fy"
    | "ba" | "sc" | "ja" | "am" | "sk" | "mr" | "es" | "sq" | "te" | "br"
    | "uz" | "da" | "sw" | "fa" | "sr" | "cu" | "ln" | "na" | "wo" | "ig"
    | "to" | "ta" | "mt" | "ar" | "su" | "ab" | "ps" | "bm" | "mi" | "kn"
    | "kv" | "os" | "bn" | "li" | "vi" | "zh" | "eo" | "ha" | "tt" | "lb"
    | "ce" | "hu" | "it" | "tl" | "pl" | "sm" | "en" | "vo" | "el" | "sn"
    | "fr" | "cs" | "io" | "hi" | "et" | "pa" | "av" | "ko" | "bh" | "yi"
    | "sa" | "sl" | "hr" | "si" | "so" | "gn" | "ay" | "se" | "sd" | "af"
    | "ga" | "or" | "ia" | "ie" | "ug" | "nl" | "gv" | "qu" | "be" | "an"
    | "fo" | "hy" | "nv" | "bo" | "id" | "lv" | "ca" | "no" | "nn" | "ml"
    | "my" | "ne" | "he" | "cy" | "lo" | "jv" | "sv" | "mn" | "tg" | "kw"
    | "cv" | "az" | "oc" | "th" | "ru" | "ny" | "bs" | "st" | "ro" | "rm"
    | "ff" | "kk" | "uk" | "pt" | "tr" | "eu" | "ht" | "ka" | "ur" | "ascii"
    | "feature_name"


export type LocalName = {
    [code in LanguageCode]: string
}


export interface GeocodingResponse {
    name: string
    localNames: LocalName
    lat: number
    lon: number
    country: string
    state: string
}


export interface CurrentWeatherResponse {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    base: string
    main: {
        temp: number
        feels_like: number
        pressure: number
        humidity: number
        temp_min: number
        temp_max: number
        sea_level: number
        grnd_level: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    }
    clouds: {
        all: number
    }
    rain: {
        "1h": number
        "3h": number
    }
    snow: {
        "1h": number
        "3h": number
    }
    dt: number
    sys: {
        id: number
        type: number
        message: string
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
}


export interface ForecastResponse {
    "cod": string
    "message": number
    "cnt": number
    "list": Array<{
        "dt": number
        "main": {
            "temp": number
            "feels_like": number
            "temp_min": number
            "temp_max": number
            "pressure": number
            "sea_level": number
            "grnd_level": number
            "humidity": number
            "temp_kf": number
        }
        "weather": Array<{
            "id": number
            "main": string
            "description": string
            "icon": string
        }>
        "clouds": {
            "all": number
        }
        "wind": {
            "speed": number
            "deg": number
            "gust": number
        }
        "visibility": number
        "pop": number
        "sys": {
            "pod": string
        }
        "dt_txt": string
    }>
    "city": {
        "id": number
        "name": string
        "coord": {
            "lat": number
            "lon": number
        }
        "country": string
        "population": number
        "timezone": number
        "sunrise": number
        "sunset": number
    }
}
