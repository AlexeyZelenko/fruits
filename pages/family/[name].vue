<template>
  <div>
    <h1>{{ familyName }} Family</h1>
    
    <div v-if="loading" class="loading">
      Loading fruits...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="grid">
      <FruitCard 
        v-for="fruit in familyFruits"
        :key="fruit.id"
        :fruit="fruit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fruit } from '~/types/fruit';
import { useFruitsStore } from '~/stores/fruits';

const route = useRoute();
const store = useFruitsStore();

const familyName = computed(() => route.params.name);
const familyFruits = ref<Fruit[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    familyFruits.value = await store.fetchFruitsByFamily(familyName.value as string);
  } catch (e) {
    error.value = 'Failed to load family fruits';
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: red;
}
</style>