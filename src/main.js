import { proxy } from 'valtio/vanilla';
import * as yup from 'yup';
import init from './init.js';
import watch from './view.js';

init().then((i18n) => {
  // 1. Состояние (Model)
  const state = proxy({
    form: {
      valid: true,
      error: null,
    },
    feeds: [], // Сюда будем сохранять добавленные ссылки для проверки на дубли
  });

  // 2. Элементы DOM
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    feedback: document.querySelector('.feedback'),
  };

  // 3. Запускаем "слежку" за состоянием (View)
  watch(state, elements, i18n);

  // 4. Логика (Controller)
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    // Описываем схему валидации
    const schema = yup.string().url().required().notOneOf(state.feeds);

    schema.validate(url)
      .then(() => {
        state.form.valid = true;
        state.form.error = null;
        state.feeds.push(url); // Запоминаем ссылку, чтобы не было дублей
        e.target.reset();      // Очищаем форму
        elements.input.focus(); // Возвращаем фокус
      })
      .catch((err) => {
        state.form.valid = false;
        state.form.error = err.message; // Сюда прилетит ключ ошибки из yup.setLocale
      });
  });
});