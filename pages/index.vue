<template>
  <div class="page-container">
    <FilterPanel v-model="store.filters" />
    
    <div v-if="loading && !store.fruits.length" class="loading">
      Loading fruits...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <InfiniteScroll
      v-else-if="filteredFruits.length > 0"
      :items="filteredFruits"
      :loading="loading"
      :page-size="12"
      class="fruits-container"
      @load-more="loadMore"
    >
      <template #default="{ items }">
        <div class="grid">
          <FruitCard 
            v-for="fruit in items"
            :key="fruit.id"
            :fruit="fruit"
          />
        </div>
      </template>
    </InfiniteScroll>
    
    <div v-else class="no-data">
      No fruits found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFruitsStore } from '~/stores/fruits';
import { storeToRefs } from 'pinia';

const store = useFruitsStore();
const { loading, error, filteredFruits } = storeToRefs(store);

onMounted(() => {
  store.fetchFruits();
});

const loadMore = () => {
  // This function will be called when we need to load more items
  // In this case, we're using client-side pagination, so we don't need
  // to do anything here, but you could add API pagination if needed
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: calc(100vh - 60px); // Adjust based on your header height
  display: flex;
  flex-direction: column;
}

.fruits-container {
  flex: 1;
  overflow-y: auto;
}

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

.grid {
  padding: 0;
  margin-bottom: 0;
}
</style>