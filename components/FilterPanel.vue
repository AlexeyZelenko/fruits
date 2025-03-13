<template>
  <div class="filters">
    <h2>Filters</h2>
    <div class="filters-grid">
      <div v-for="(filter, key) in filters" :key="key" class="filter-group">
        <h3>{{ formatLabel(key) }}</h3>
        <div class="range-inputs">
          <div class="input-group">
            <label :for="key + '-min'">Min:</label>
            <input
              :id="key + '-min'"
              type="number"
              v-model.number="filters[key].min"
              step="0.1"
            />
          </div>
          <div class="input-group">
            <label :for="key + '-max'">Max:</label>
            <input
              :id="key + '-max'"
              type="number"
              v-model.number="filters[key].max"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFruitsStore } from '~/stores/fruits';

const store = useFruitsStore();
const filters = toRef(store, 'filters');

const formatLabel = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1);
};
</script>

<style lang="scss" scoped>
.filters {
  h2 {
    margin-bottom: 1rem;
  }

  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .filter-group {
    h3 {
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
  }

  .range-inputs {
    display: flex;
    gap: 1rem;
  }

  .input-group {
    flex: 1;
    
    label {
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
  }
}
</style>