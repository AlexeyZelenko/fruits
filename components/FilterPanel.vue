<template>
  <div class="filter-container">
    <div class="filters" :class="{ 'filters-open': isOpen }">
      <div class="filters-header">
        <h3>Filters</h3>
        <div class="filters-actions">
          <button class="reset-button" @click="resetFilters">
            Reset
          </button>
          <button class="close-button" @click="closeFilters">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
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
    <div v-if="isOpen" class="filters-overlay" @click="closeFilters"></div>
  </div>
</template>

<script setup lang="ts">
import type { FruitFilters } from '~/types/fruit';
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue: FruitFilters;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: FruitFilters];
}>();

const isOpen = ref(false);
const emitter = useEmitter();

const defaultFilters: FruitFilters = {
  calories: { min: 0, max: 100 },
  fat: { min: 0, max: 5 },
  sugar: { min: 0, max: 20 },
  carbohydrates: { min: 0, max: 30 },
  protein: { min: 0, max: 5 }
};

const update = () => {
  emit('update:modelValue', props.modelValue);
};

const resetFilters = () => {
  emit('update:modelValue', { ...defaultFilters });
};

const closeFilters = () => {
  isOpen.value = false;
};

const toggleFilters = () => {
  isOpen.value = !isOpen.value;
};

const formatLabel = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1);
};

onMounted(() => {
  emitter.on('toggle-filters', toggleFilters);
});

onUnmounted(() => {
  emitter.off('toggle-filters', toggleFilters);
});
</script>

<style lang="scss" scoped>
.filter-container {
  position: relative;
}

.filters {
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 85%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    z-index: 1000;
    padding: 1.5rem;
    overflow-y: auto;

    &.filters-open {
      right: 0;
    }
  }

  @media (min-width: 769px) {
    transform: translateY(-150%);
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;

    &.filters-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    color: var(--text-color);
  }
}

.filters-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.close-button, .reset-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-color);
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
  }
}

.reset-button {
  font-size: 0.9rem;
  font-weight: 500;
}

.close-button svg {
  display: block;
}

.filters-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
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
</style>