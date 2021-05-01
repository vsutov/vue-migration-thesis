<template>
  <div
    v-if="deletedItems.length"
    class="RecycleBin__items"
  >
    <deleted-chore
      v-for="item in deletedItems"
      :key="item.id"
      :item="item"
      @remove="removeFromBin"
      @restore="restore"
    />
  </div>
  <div
    v-else
    class="has-text-centered"
  >
    Nothing to see here!
  </div>
  <teleport to="#count-destination">
    Deleted: {{ choresCount }}
  </teleport>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { ChoresService } from '@/services/ChoresService'
import DeletedChore from '@/components/DeletedChore'

export default {
  name: 'DeletedChoresList',
  components: { DeletedChore },
  setup(){
    const deletedItems = ref([])

    const fetchDeletedItems = () => deletedItems.value = ChoresService.fetchDeleted()

    const restore = (item) => {
      item.deletedAt = null
      ChoresService.updateItem(item.id, item)
      fetchDeletedItems()
    }

    const removeFromBin = (item) => {
      ChoresService.removeItem(item.id)
      fetchDeletedItems()
    }

    const choresCount = computed(() => deletedItems.value.length)

    onMounted(() => fetchDeletedItems())

    return { deletedItems, removeFromBin, restore, choresCount }
  }
}
</script>
