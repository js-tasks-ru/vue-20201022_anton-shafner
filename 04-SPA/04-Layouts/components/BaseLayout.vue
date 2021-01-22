<template>
  <div class="wrapper bg-grey">
    <the-header></the-header>
    <main>
      <slot></slot>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'BaseLayout',
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
  main {
    flex: 1 0 auto;
  }
  
  .wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .bg-grey {
    background-color: var(--grey-light);
  }

  ::v-deep .page {
    padding: 48px 0;
  }

  ::v-deep .page__title {
    font-family: Roboto, sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 37px;
    color: var(--body-color);
    margin: 0 0 32px;
  }

  ::v-deep .container {
    max-width: 1008px;
    width: 100%;
    margin: 0 auto;
  }

  @media all and (max-width: 992px) {
    ::v-deep .container {
      padding: 0 16px;
    }
  }
</style>
