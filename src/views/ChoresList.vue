<template>
  <div>
    <div class="ChoresList">
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
          @end="storeItems"
        >
          <to-do-chore
            v-for="item in choresToDo"
            :key="item.key"
            :item="item"
            @change="handleItemChange"
          />
        </draggable>
      </div>
    </div>
    <portal to="count-destination">
      To do: {{ choresCount }}
    </portal>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

import ToDoChore from '@/components/ToDoChore'
import { ChoresService } from '@/services/ChoresService'

export default {
  name: 'ChoresList',
  components: { ToDoChore, Draggable },
  data () {
    return {
      newChoreContent: '',
      choresToDo: [],
      choresCount: 0
    }
  },
  watch: {
    choresToDo: {
      deep: true,
      handler (newVal, oldVal) {
        this.choresCount = newVal.filter(x => x.completedAt === null).length
      }
    }
  },
  mounted () {
    this.fetchChoresLists()
  },
  methods: {
    fetchChoresLists () {
      this.choresToDo = ChoresService.fetchAll()
    },
    saveChore () {
      if (!this.newChoreContent) return

      const random = () => Math.random().toString(36).substr(2, 5)

      this.choresToDo.push({
        id: random(),
        content: this.newChoreContent,
        createdAt: Date.now(),
        completedAt: null,
        deletedAt: null
      })
      this.newChoreContent = ''
      this.storeItems()
    },
    handleItemChange (item) {
      ChoresService.updateItem(item.id, item)
      this.fetchChoresLists()
    },
    storeItems () {
      ChoresService.storeAll(this.choresToDo)
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
