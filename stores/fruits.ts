import { defineStore } from 'pinia';
import type { Fruit, FruitFilters } from '~/types/fruit';
import { IndexedDBService } from '~/utils/indexedDBService';
import { fruitsApi } from '~/api/fruits';

const fruitDBService = new IndexedDBService<Fruit>({
  dbName: 'fruitDatabase',
  objectStoreName: 'fruits',
  keyPath: 'id',
});

export const useFruitsStore = defineStore('fruits', () => {
  const fruits = shallowRef<Fruit[]>([]);
  const favorites = shallowRef<Fruit[]>([]);
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

  const initializeFavorites = () => {
    if (isClient) {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        favorites.value = JSON.parse(stored);
      }
    }
  };

  watch(favorites, (newFavorites) => {
    if (isClient) {
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  }, { deep: true });

  const shouldFetchFreshData = async (): Promise<boolean> => {
    if (!isClient) return true;

    const lastUpdate = await fruitDBService.getLastUpdateTime();
    if (!lastUpdate) return true;

    const currentTime = new Date().getTime();
    const ONE_HOUR = 1 * 60 * 60 * 1000;
    return currentTime - Number(lastUpdate) >= ONE_HOUR;
  };

  const fetchFruits = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      let localData: Fruit[] = [];
      
      if (isClient) {
        localData = await fruitDBService.getData();
        if (localData.length > 0) {
          fruits.value = localData;
        }
      }

      const needsFetch = await shouldFetchFreshData();
      
      if (needsFetch) {
        const data = await fruitsApi.getAllFruits();
        const hasChanges = !localData.length || 
          JSON.stringify(data) !== JSON.stringify(localData);
        
        if (hasChanges) {
          fruits.value = data;
          
          if (isClient) {
            await fruitDBService.storeData(data);
            await fruitDBService.setLastUpdateTime(new Date().getTime());
          }
        }
      }
    } catch (e) {
      if (isClient) {
        const localData = await fruitDBService.getData();
        if (localData.length > 0) {
          fruits.value = localData;
        } else {
          error.value = 'Failed to fetch fruits and no local data available';
        }
      } else {
        error.value = 'Failed to fetch fruits';
      }
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchFruitsByFamily = async (family: string) => {
    loading.value = true;
    error.value = null;
    try {
      return await fruitsApi.getFruitsByFamily(family);
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
      favorites.value = [...favorites.value, fruit];
    } else {
      favorites.value = favorites.value.filter(f => f.id !== fruit.id);
    }
  };

  const isFavorite = (fruitId: number) => {
    return favorites.value.some(f => f.id === fruitId);
  };

  const filteredFruits = computed(() => {
    return fruits.value.filter(fruit => {
      if (!fruit?.nutritions) return false;

      const { nutritions } = fruit;
      
      const isValidNutrition = (
        typeof nutritions.calories === 'number' &&
        typeof nutritions.fat === 'number' &&
        typeof nutritions.sugar === 'number' &&
        typeof nutritions.carbohydrates === 'number' &&
        typeof nutritions.protein === 'number'
      );

      if (!isValidNutrition) return false;

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