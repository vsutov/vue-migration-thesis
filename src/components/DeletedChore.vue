<template>
  <chore
    class="DeletedChore"
    :item="item"
  >
    <template #actions>
      <div class="buttons">
        <button
          class="button is-small is-inverted is-primary"
          title="Restore from Trash"
          @click="$emit('restore', item)"
        >
          <span class="icon">
            <span class="fa fa-history fa-lg" />
          </span>
        </button>
        <button
          class="button is-small is-inverted is-danger"
          title="Remove from Recycle Bin"
          @click="$emit('remove', item)"
        >
          <span class="icon">
            <span class="fa fa-trash fa-lg" />
          </span>
        </button>
      </div>
    </template>
  </chore>
</template>

<script>
import Chore from '@/components/Chore'

export default {
  name: 'DeletedChore',
  components: { Chore },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['remove', 'restore']
}
</script>

<style lang="scss" scoped>
.DeletedChore .buttons {
  flex-wrap: nowrap;
}
</style>
