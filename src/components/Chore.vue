<template>
  <div
    class="Chore"
    :class="{ 'Chore--completed': item.completedAt }"
  >
    <div class="Chore__checkbox">
      <slot name="checkbox">
        <input
          type="checkbox"
          disabled
          :checked="!!item.completedAt"
        >
      </slot>
    </div>
    <div class="Chore__content">
      <slot name="content">
        {{ item.content }}
      </slot>
    </div>
    <div class="Chore__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chore',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.Chore {
  display: flex;
  align-items: center;
  margin-bottom: $spacing--m;
  background: $white;
  padding: $spacing--m;
  border-radius: 5px;

  &--completed {
    text-decoration: line-through;
    opacity: .5;
  }

  &__content {
    flex: 1 1 auto;
    padding: 0 $spacing--m;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
