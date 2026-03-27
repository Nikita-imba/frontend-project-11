import * as yup from 'yup';
import i18next from 'i18next';

export default () => {
  const i18nInstance = i18next.createInstance();
  return i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru: {
        translation: {
          errors: {
            invalidUrl: 'Ссылка должна быть валидным URL',
            required: 'Не должно быть пустым',
            exists: 'RSS уже существует',
          },
          rssSuccess: 'RSS успешно загружен',
        },
      },
    },
  }).then(() => {
    // Настраиваем yup глобально
    yup.setLocale({
      string: {
        url: 'errors.invalidUrl',
      },
      mixed: {
        required: 'errors.required',
      },
    });
    
    return i18nInstance;
  });
};