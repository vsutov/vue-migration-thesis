<template>
  <chore
    class="ToDoChore"
    :item="item"
  >
    <template #checkbox>
      <input
        v-model="completedLocal"
        type="checkbox"
        class="checkbox"
      >
    </template>
    <template #content>
      <div
        v-if="!isEditing"
        class="break-all"
        @dblclick="enableEdit"
      >
        {{ item.content }}
      </div>
      <input
        v-if="isEditing"
        ref="editInput"
        v-model="contentLocal"
        type="text"
        class="input"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        @keyup.esc="stopEdit"
      >
    </template>
    <template #actions>
      <button
        class="ToDoChore__delete button is-inverted is-danger is-small"
        @click.prevent="deleteItem"
      >
        <span class="icon"><i class="fa fa-trash fa-lg" /></span>
      </button>
    </template>
  </chore>
</template>

<script>
import Chore from '@/components/Chore'

export default {
  name: 'ToDoChore',
  components: { Chore },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isEditing: false,
      contentLocal: ''
    }
  },
  computed: {
    completedLocal: {
      get () {
        return !!this.item.completedAt
      },

      set (value) {
        this.emitChange({
          completedAt: value ? Date.now() : null
        })
      }
    }
  },
  methods: {
    deleteItem () {
      this.emitChange({
        deletedAt: Date.now()
      })
    },
    emitChange (updatedItem) {
      this.$emit('change', {
        ...this.item,
        ...updatedItem
      })
    },
    async enableEdit () {
      this.contentLocal = this.item.content
      this.isEditing = true
      await this.$nextTick()
      this.$refs.editInput.focus()
    },
    saveEdit () {
      if (this.contentLocal) {
        this.emitChange({
          content: this.contentLocal
        })
      }
      this.stopEdit()
    },
    stopEdit () {
      this.isEditing = false
      this.contentLocal = ''
    }
  }
}
</script>

<style lang='scss' scoped>
.break-all {
  word-break: break-all;
}

.ToDoChore {
  &:hover {
    .ToDoChore__delete {
      opacity: 1;
    }
  }

  &__delete {
    opacity: 0;
    margin-right: $spacing--s;
    border-radius: 100%;
  }
}
</style>
