<template>
  <div class="TheNav">
    <router-link
      :to="{ name: 'todo-list' }"
    >
      List of chores
    </router-link>
    <div id="count-destination" />
    <router-link
      :to="{ name: 'recycle-bin' }"
    >
      Deleted chores
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TheNav'
}
</script>

<style lang="scss" scoped>
.TheNav {
  padding: $spacing--l;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  a {
    font-weight: bold;
    color: $secondary;

    &.router-link-exact-active {
      color: $primary;
    }
  }
  #count-destination {
    font-weight: bold;
    font-size: 1.5rem;
  }
}
</style>
