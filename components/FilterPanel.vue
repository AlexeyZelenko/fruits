<template>
  <div class="filter-container">
    <button v-if="isMobile" class="filter-toggle-button" @click="toggleFilters">
      {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
    </button>
    <div class="filters" :class="{ 'filters-open': filtersOpen }">
      <div class="filters-grid">
        <div v-for="(filter, key) in modelValue" :key="key" class="filter-group">
          <h5>{{ formatLabel(key) }}</h5>
          <div class="range-inputs">
            <div class="input-group">
              <label :for="key + '-min'">Min:</label>
              <input
                :id="key + '-min'"
                type="number"
                v-model.number="modelValue[key].min"
                step="0.1"
                @change="update"
              />
            </div>
            <div class="input-group">
              <label :for="key + '-max'">Max:</label>
              <input
                :id="key + '-max'"
                type="number"
                v-model.number="modelValue[key].max"
                step="0.1"
                @change="update"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FruitFilters } from '~/types/fruit';
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue: FruitFilters;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: FruitFilters];
}>();

const filtersOpen = ref(false);

const toggleFilters = () => {
  filtersOpen.value = !filtersOpen.value;
};

const isMobile = computed(() => window.innerWidth < 768);

const update = () => {
  emit('update:modelValue', props.modelValue);
};

const formatLabel = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1);
};
</script>

<style lang="scss" scoped>
.filter-container {
  position: relative;
}

.filters {
  transition: transform 0.3s ease;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.range-inputs {
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.input-group {
  flex: 1;

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    color: #555;
    font-weight: 600;
  }

  input {
    width: 80%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: .9rem;
    transition: all 0.3s ease;
    background-color: #fafafa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background-color: white;
    }
  }
}

.filter-toggle-button {
  background-color: var(--primary-color);
  filter: brightness(1);
  color: white;
  padding: 0.25rem .5rem;
  border: none;
  border-radius: 10px;
  font-size: .9rem;

  &:hover {
    filter: brightness(0.9); // затемнённый цвет
  }
}

@media (max-width: 768px) {
  .filters {
    position: fixed;
    top: 0;
    right: -100%;
    width: 85%;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;

    &.filters-open {
      transform: translateX(-100%);
    }
  }
}
</style>