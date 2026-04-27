import { onMounted, ref } from 'vue'
import { fetchCategories, fetchFoods } from '../data/foods'

export function useMenuData() {
  const categories = ref([])
  const foods = ref([])
  const loading = ref(true)
  const error = ref('')

  async function loadMenu() {
    loading.value = true
    error.value = ''

    try {
      const [categoryResults, foodResults] = await Promise.all([
        fetchCategories(),
        fetchFoods(),
      ])

      categories.value = categoryResults
      foods.value = foodResults
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load menu data.'
    } finally {
      loading.value = false
    }
  }

  onMounted(loadMenu)

  return {
    categories,
    foods,
    loading,
    error,
    reload: loadMenu,
  }
}
