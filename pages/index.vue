<template>
  <div>
    <FilterPanel />
    
    <div v-if="loading" class="loading">
      Loading fruits...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="filteredFruits.length > 0" class="grid">
      <FruitCard 
        v-for="fruit in filteredFruits"
        :key="fruit.id"
        :fruit="fruit"        
      />
    </div>
    
    <div v-else class="no-data">
      No fruits found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFruitsStore } from '~/stores/fruits';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useFruitsStore();
const { loading, error, filteredFruits } = storeToRefs(store);

// Fetch fruits when the component is mounted
onMounted(() => {
  console.log('Fetching fruits...');
  store.fetchFruits();
});
</script>

<style lang="scss" scoped>
.loading, .error, .no-data {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: red;
}

.no-data {
  color: gray;
}
</style>