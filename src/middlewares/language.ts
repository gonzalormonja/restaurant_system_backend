import es from '../lang/es';
import en from '../lang/en';
import pt from '../lang/pt';
import { createIntl, createIntlCache } from 'react-intl'

const language = (req, res, next) => {
    //language 
    let lang = req.get('lang');
    if (lang) {
        lang = lang.toLowerCase();
        if (lang != "es" && lang != "en" && lang != "pt") {
            lang = "es";
        }
    } else {
        lang = "es";
        req['lang'] = lang;
    }

    const cache = createIntlCache();
    const intl = createIntl(
        {
            locale: lang,
            messages: (lang === "es") ? es : (lang === "en") ? en : pt,
        },
        cache
    )
    req.intl = intl;
    next();
}


export default language;