<template>
  <div class="fruit-card card">
    <h3>{{ fruit.name }}</h3>
    <NuxtLink 
      :to="'/family/' + fruit.family" 
      class="family-link"
    >
      Family: {{ fruit.family }}
    </NuxtLink>
    
    <div class="nutrition">
      <h4>Nutrition Facts:</h4>
      <ul>
        <li v-for="(value, key) in fruit.nutritions" :key="key">
          {{ formatLabel(key) }}: {{ value }}{{ key !== 'calories' ? 'g' : '' }}
        </li>
      </ul>
    </div>

    <button 
      class="button"
      :class="isFavorite ? 'button--secondary' : 'button--primary'"
      @click="toggleFavorite"
    >
      {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Fruit } from '~/types/fruit';
import { useFruitsStore } from '~/stores/fruits';

const props = defineProps<{
  fruit: Fruit;
}>();

const store = useFruitsStore();
const isFavorite = computed(() => store.isFavorite(props.fruit.id));

const toggleFavorite = () => {
  store.toggleFavorite(props.fruit);
};

const formatLabel = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1);
};
</script>

<style lang="scss" scoped>
.fruit-card {
  display: flex;
  flex-direction: column;
  gap: .4rem;

  h3 {
    color: var(--text-color);
    margin-bottom: 0.2rem;
  }

  .family-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  .nutrition {
    ul {
      list-style: none;
      margin-top: 0.2rem;

      li {
        margin: 0.05rem 0;
      }
    }
  }

  button {
    margin-top: auto;
  }
}
</style>