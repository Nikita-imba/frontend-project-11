import { proxy } from 'valtio/vanilla';
import * as yup from 'yup';
import init from './init.js';
import watch from './view.js';

init().then((i18n) => {
  // 1. Состояние приложения
  const state = proxy({
    form: {
      valid: true,
      error: null,
    },
    feeds: [], // Список уже добавленных URL
  });

  // 2. Ссылки на элементы HTML
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedback: document.querySelector('.feedback'),
  };

  // 3. Запуск наблюдателя за состоянием
  watch(state, elements, i18n);

  // 4. Обработчик отправки формы
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    // Правила валидации
    const schema = yup.string().url().required().notOneOf(state.feeds);

    schema.validate(url)
      .then(() => {
        // Если всё ок
        state.form.error = null;
        state.form.valid = true;
        state.feeds.push(url);
      })
      .catch((err) => {
        // Если ошибка валидации
        state.form.valid = false;
        state.form.error = err.message;
      });
  });
});