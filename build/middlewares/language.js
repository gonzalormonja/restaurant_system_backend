"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const es_1 = __importDefault(require("../lang/es"));
const en_1 = __importDefault(require("../lang/en"));
const pt_1 = __importDefault(require("../lang/pt"));
const react_intl_1 = require("react-intl");
const language = (req, res, next) => {
    //language 
    let lang = req.get('lang');
    if (lang) {
        lang = lang.toLowerCase();
        if (lang != "es" && lang != "en" && lang != "pt") {
            lang = "es";
        }
    }
    else {
        lang = "es";
        req['lang'] = lang;
    }
    const cache = react_intl_1.createIntlCache();
    const intl = react_intl_1.createIntl({
        locale: lang,
        messages: (lang === "es") ? es_1.default : (lang === "en") ? en_1.default : pt_1.default,
    }, cache);
    req.intl = intl;
    next();
};
exports.default = language;
//# sourceMappingURL=language.js.map