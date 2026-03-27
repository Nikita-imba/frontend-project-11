import { subscribe } from 'valtio/vanilla';

export default (state, elements, i18n) => {
  subscribe(state.form, () => {
    const { input, feedback, form } = elements;
    
    if (state.form.valid) {
      // Состояние УСПЕХА
      input.classList.remove('is-invalid');
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      feedback.textContent = i18n.t('rssSuccess');
      
      // Очистка и фокус
      form.reset();
      input.focus();
    } else {
      // Состояние ОШИБКИ
      input.classList.add('is-invalid');
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      feedback.textContent = i18n.t(state.form.error);
    }
  });
};