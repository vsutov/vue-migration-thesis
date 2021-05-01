<template>
  <div class="container">
    <div class="app-content">
      <navigation-bar class="has-text-centered" />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar'

export default {
  name: 'App',
  components: { NavigationBar }
}
</script>

<style lang="scss">
@import "assets/styles/app";

#app {
  color: $secondary;
  background: $primary;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  padding: 0 $spacing--s;
}

.app-content {
  background: $grey-lightest;
  padding: $spacing--xl;
  padding-top: 0;
  border-radius: 5px;
  box-shadow: 0 0 30px -5px $secondary;
  margin: $spacing--m auto;

  @include tablet {
    width: 40%;
  }
}
</style>
