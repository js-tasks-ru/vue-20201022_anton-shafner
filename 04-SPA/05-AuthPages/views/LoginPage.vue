<template>
  <form class="form" @submit.prevent="submitHandler">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" placeholder="demo@email" class="form-control" v-model="email"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" placeholder="password" class="form-control" v-model="password"/>
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">Нет аккаунта? <router-link :to="{ name: 'register' }" class="link">Зарегистрируйтесь</router-link></div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitHandler() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }

      login(this.email, this.password).then(res => this.fetchResponseHandler(res));
    },
    fetchResponseHandler(res) {
      if (res.error) {
        alert(res.message)
      } else if (res.fullname) {
        alert(res.fullname)
      }
    },
  }
}
</script>

<style scoped>
  .form {
    margin: 0;
  }

  .form-group {
    position: relative;
    margin-bottom: 24px;
  }

  .form-group.form-group_inline {
    display: inline-block;
    margin-bottom: 0;
  }

  .form-group.form-group_inline + .form-group.form-group_inline {
    margin-left: 16px;
  }

  .input-group {
    position: relative;
  }

  .input-group .form-control {
    width: 100%;
  }

  .input-group.input-group_icon .form-control {
    padding-left: 50px;
  }

  .input-group.input-group_icon .icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  .input-group.input-group_icon.input-group_icon-left .icon {
    left: 16px;
  }

  .input-group.input-group_icon.input-group_icon-right .icon {
    right: 16px;
  }

  .form-label {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: var(--body-color);
    margin-bottom: 10px;
    display: block;
  }

  .form-control {
    padding: 12px 16px;
    height: 52px;
    border-radius: 8px;
    border: 2px solid var(--blue-light);
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: var(--body-color);
    transition: 0.2s all;
    background-color: var(--white);
    outline: none;
    box-shadow: none;
  }

  .form-control::placeholder {
    font-weight: 400;
    color: var(--blue-2);
  }

  .form-control:focus {
    border-color: var(--blue);
  }

  textarea.form-control {
    width: 100%;
    min-height: 211px;
  }

  .form-control.form-control_rounded {
    border-radius: 26px;
  }

  .form-control.form-control_sm.form-control_rounded {
    border-radius: 22px;
  }

  .form-control.form-control_sm {
    padding: 8px 16px;
    height: 44px;
    border-radius: 4px;
  }

  .form__buttons {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    margin-top: 40px;
  }

  .form__append {
      margin-top: 40px;
      text-align: center;
      font-weight: 400;
      font-size: 20px;
      line-height: 28px;
  }

  .form__buttons .button + .button {
      margin-bottom: 8px;
  }

  .button {
    display: inline-block;
    padding: 10px 24px;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: initial;
    text-align: center;
    border: 4px solid transparent;
    transition: .2s all;
    outline: none;
    box-shadow: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
  }

  .button.button_block {
    display: block;
    width: 100%;
  }

  .button.button_primary {
      background-color: var(--blue);
      border-color: var(--blue);
      color: var(--white);
  }

  .button.button_primary:hover {
      background-color: var(--blue-light);
      border-color: var(--blue-light);
      color: var(--blue);
  }

  .link {
    color: var(--blue);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }
</style>
