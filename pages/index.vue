<template>
  <div>
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
.fruits-container {
  height: calc(100vh - 200px);
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
</style>