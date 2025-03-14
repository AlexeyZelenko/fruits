<template>
  <div>
    <h1>My Favorite Fruits</h1>
    
    <div v-if="favorites.length === 0" class="empty-state">
      No favorite fruits yet. Add some from the home page!
    </div>
    
    <InfiniteScroll
      v-else
      :items="favorites"
      :page-size="12"
      class="favorites-container"
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
  </div>
</template>

<script setup lang="ts">
import { useFruitsStore } from '~/stores/fruits';

const store = useFruitsStore();
const favorites = toRef(store, 'favorites');
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}

.favorites-container {
  height: calc(100vh - 200px);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  background: var(--card-background);
  border-radius: 8px;
  margin: 2rem 0;
}
</style>