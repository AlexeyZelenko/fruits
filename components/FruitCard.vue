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
        <li>Calories: {{ fruit.nutritions.calories }}</li>
        <li>Fat: {{ fruit.nutritions.fat }}g</li>
        <li>Sugar: {{ fruit.nutritions.sugar }}g</li>
        <li>Carbohydrates: {{ fruit.nutritions.carbohydrates }}g</li>
        <li>Protein: {{ fruit.nutritions.protein }}g</li>
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
</script>

<style lang="scss" scoped>
.fruit-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    color: var(--text-color);
    margin-bottom: 0.5rem;
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
      margin-top: 0.5rem;

      li {
        margin: 0.25rem 0;
      }
    }
  }

  button {
    margin-top: auto;
  }
}
</style>