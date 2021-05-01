<template>
  <div>
    <div class="DeletedChoresList">
      <div class="RecycleBin__content">
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
      </div>
      <portal to="count-destination">
        Deleted: {{ choresCount }}
      </portal>
    </div>
  </div>
</template>

<script>
import { ChoresService } from '@/services/ChoresService'
import DeletedChore from '@/components/DeletedChore'

export default {
  name: 'DeletedChoresList',
  components: { DeletedChore },
  data () {
    return {
      deletedItems: []
    }
  },
  computed: {
    choresCount () {
      return this.deletedItems.length
    }
  },
  mounted () {
    this.fetchDeletedItems()
  },
  methods: {
    fetchDeletedItems () {
      this.deletedItems = ChoresService.fetchDeleted()
    },
    restore (item) {
      item.deletedAt = null
      ChoresService.updateItem(item.id, item)
      this.fetchDeletedItems()
    },
    removeFromBin (item) {
      ChoresService.removeItem(item.id)
      this.fetchDeletedItems()
    }
  }
}
</script>
