
export const STORAGE_KEY = 'Chores'

export const ChoresService = {
  storeAll (items) {
    ChoresService.setLocalStorageItem(STORAGE_KEY, items)
  },
  fetchAllWithDeleted () {
    return ChoresService.getLocalStorageItem(STORAGE_KEY, [])
  },
  fetchDeleted () {
    return ChoresService.fetchAllWithDeleted().filter(item => item.deletedAt)
  },
  fetchAll () {
    return ChoresService.fetchAllWithDeleted().filter(item => !item.deletedAt)
  },
  updateItem (itemId, payload) {
    const items = ChoresService.fetchAllWithDeleted()
    const index = items.findIndex(i => i.id === itemId)
    if (index === -1) return
    items.splice(index, 1, payload)
    ChoresService.storeAll(items)
  },
  removeItem (itemId) {
    const items = ChoresService.fetchAllWithDeleted()
    const index = items.findIndex(i => i.id === itemId)
    items.splice(index, 1)
    ChoresService.storeAll(items)
  },
  getLocalStorageItem (key, fallback) {
    try {
      let item = window.localStorage.getItem(key)
      return item ? window.JSON.parse(item) : fallback
    } catch (err) {
      return fallback
    }
  },
  setLocalStorageItem (key, value = {}) {
    window.localStorage.setItem(key, window.JSON.stringify(value))
  },
  removeLocalStorageItem (key) {
    window.localStorage.removeItem(key)
  }
}
