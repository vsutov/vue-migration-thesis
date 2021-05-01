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
import { ref, computed, nextTick } from 'vue'
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
  emits: ['change'],
  setup(props, { emit }){
    const isEditing = ref(false)
    const contentLocal = ref('')
    const editInput = ref(null)

    const completedLocal = computed({
      get: () => !!props.item.completedAt,
      set: val => {
        emitChange({
          completedAt: val ? Date.now() : null
        })
      }
    })

    const deleteItem = () => emitChange({
      deletedAt: Date.now()
    })

    const enableEdit = async () => {
      contentLocal.value = props.item.content
      isEditing.value = true
      await nextTick()
      editInput.value.focus()
    }

    const saveEdit = () => {
      if(contentLocal.value){
        emitChange({
          content: contentLocal.value
        })
      }
      stopEdit()
    }

    const stopEdit = () => {
      isEditing.value = false
      contentLocal.value = ''
    }

    const emitChange = (updatedItem) => {
      emit('change', {
        ...props.item,
        ...updatedItem
      })
    }

    return { 
      completedLocal,
      enableEdit,
      isEditing,
      contentLocal, 
      editInput,
      saveEdit,
      stopEdit,
      deleteItem
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
