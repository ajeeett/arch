import I18n from 'react-native-i18n';
import en from './../../translations/en';
I18n.fallbacks = true;
I18n.translations = {
    en
};
I18n.defaultLocale = 'en'

export default I18n;