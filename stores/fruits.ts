import { defineStore } from 'pinia';
import type { Fruit, FruitFilters } from '~/types/fruit';
import { IndexedDBService } from '~/utils/indexedDBService';

const fruitDBService = new IndexedDBService<Fruit>({
  dbName: 'fruitDatabase',
  objectStoreName: 'fruits',
  keyPath: 'id',
});

export const useFruitsStore = defineStore('fruits', () => {
  const fruits = ref<Fruit[]>([]);
  const favorites = ref<Fruit[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const filters = ref<FruitFilters>({
    calories: { min: 0, max: 100 },
    fat: { min: 0, max: 5 },
    sugar: { min: 0, max: 20 },
    carbohydrates: { min: 0, max: 30 },
    protein: { min: 0, max: 5 }
  });

  const isClient = typeof window !== 'undefined';

  // Load favorites from localStorage on store initialization
  const initializeFavorites = () => {
    if (isClient) {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        favorites.value = JSON.parse(stored);
      }
    }
  };

  // Save favorites to localStorage whenever they change
  watch(favorites, (newFavorites) => {
    if (isClient) {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  }, { deep: true });

  const fetchFruits = async () => {
    loading.value = true;
    error.value = null;
    try {
      const config = useRuntimeConfig();
      const response = await fetch('https://fruityvice.com/api/fruit/all');
      const data = await response.json();
      fruits.value = data;

      if (isClient) {
        await fruitDBService.storeData(data);
      }
    } catch (e) {
      if (isClient) {
        fruits.value = await fruitDBService.getData();
      }
      error.value = 'Failed to fetch fruits';
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchFruitsByFamily = async (family: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`https://fruityvice.com/api/fruit/family/${family}`);
      const data = await response.json();
      return data;
    } catch (e) {
      error.value = 'Failed to fetch fruits by family';
      console.error(e);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const toggleFavorite = (fruit: Fruit) => {
    const index = favorites.value.findIndex(f => f.id === fruit.id);
    if (index === -1) {
      favorites.value.push(fruit);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = (fruitId: number) => {
    return favorites.value.some(f => f.id === fruitId);
  };

  const filteredFruits = computed(() => {
    return fruits.value.filter(fruit => {
      // Check if fruit and nutritions exist before accessing properties
      if (!fruit?.nutritions) {
        return false;
      }

      const { nutritions } = fruit;
      
      // Ensure all nutritional values exist and are numbers
      const isValidNutrition = (
        typeof nutritions.calories === 'number' &&
        typeof nutritions.fat === 'number' &&
        typeof nutritions.sugar === 'number' &&
        typeof nutritions.carbohydrates === 'number' &&
        typeof nutritions.protein === 'number'
      );

      if (!isValidNutrition) {
        return false;
      }

      return (
        nutritions.calories >= filters.value.calories.min &&
        nutritions.calories <= filters.value.calories.max &&
        nutritions.fat >= filters.value.fat.min &&
        nutritions.fat <= filters.value.fat.max &&
        nutritions.sugar >= filters.value.sugar.min &&
        nutritions.sugar <= filters.value.sugar.max &&
        nutritions.carbohydrates >= filters.value.carbohydrates.min &&
        nutritions.carbohydrates <= filters.value.carbohydrates.max &&
        nutritions.protein >= filters.value.protein.min &&
        nutritions.protein <= filters.value.protein.max
      );
    });
  });

  // Initialize favorites when the store is created
  if (isClient) {
    initializeFavorites();
  }

  return {
    fruits,
    favorites,
    loading,
    error,
    filters,
    filteredFruits,
    fetchFruits,
    fetchFruitsByFamily,
    toggleFavorite,
    isFavorite
  };
});