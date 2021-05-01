<template>
  <div class="title is-4 has-text-centered">
    What do you need to do today?
  </div>
  <div class="ChoresList__addNew">
    <input
      v-model.trim="newChoreContent"
      class="input"
      type="text"
      name="new_todo"
      placeholder="Type in a chore and press ENTER to save"
      @keyup.enter.prevent="saveChore"
    >
  </div>
  <div class="ChoresList__items">
    <draggable
      v-model="choresToDo"
      handle=".ToDoChore"
      item-key="key"
      @end="storeItems"
    >
      <template #item="item">
        <to-do-chore
          :item="item.element"
          @change="handleItemChange"
        />
      </template>
    </draggable>
  </div>
  <teleport to="#count-destination">
    To do: {{ choresCount }}
  </teleport>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import Draggable from 'vuedraggable'
import ToDoChore from '@/components/ToDoChore'
import { ChoresService } from '@/services/ChoresService'

export default {
  name: 'ChoresList',
  components: { ToDoChore, Draggable },
  setup(){
    const choresToDo = ref([])

    const random = () => Math.random().toString(36).substr(2, 5)

    const fetchChoresLists = () => choresToDo.value = ChoresService.fetchAll()

    const newChoreContent = ref('')

    const saveChore = () => {
      if(newChoreContent.value) return
      
      choresToDo.value.push({
        id: random(),
        content: newChoreContent.value,
        createdAt: Date.now(),
        completedAt: null,
        deletedAt: null
      })
      newChoreContent.value = ''
      storeItems()
    }
    
    const handleItemChange = (item) => {
      ChoresService.updateItem(item.id, item)
      fetchChoresLists()
    }

    const storeItems = () => ChoresService.storeAll(choresToDo.value)

    const choresCount = ref(0)
    
    watch(choresToDo, (newVal, oldVal) => {
      choresCount.value = newVal.filter(x => x.completedAt === null).length
    },
    { deep: true })

    onMounted(() => fetchChoresLists())

    return {
      newChoreContent,
      saveChore,
      choresToDo,
      storeItems,
      handleItemChange,
      choresCount
    }
  }
}
</script>
<style lang="scss">
.ChoresList {
  &__items {
    margin-top: $spacing--l;
  }
}
</style>
