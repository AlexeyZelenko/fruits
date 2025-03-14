<template>
    <div ref="scrollContainer" class="infinite-scroll">
      <slot :items="visibleItems"></slot>
      <div v-if="loading" class="loading-indicator">
        Loading more items...
      </div>
      <div ref="loadMoreTrigger" class="load-more-trigger"></div>
      <div v-if="error" class="error-message">
        Error loading data. Please try again.
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Fruit } from '~/types/fruit';
  import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
  
  const props = defineProps<{
    items: Fruit[];
    loading?: boolean;
    pageSize?: number;
  }>();
  
  const emit = defineEmits<{
    'load-more': [];
  }>();
  
  const scrollContainer = ref<HTMLElement | null>(null);
  const loadMoreTrigger = ref<HTMLElement | null>(null);
  const currentPage = ref(1);
  const visibleItems = computed(() => {
    const end = currentPage.value * (props.pageSize || 10);
    const items = props.items.slice(0, end);
    console.log('Visible fruit IDs:', items.map((item) => item.id).join(', '));
    return items;
  });
  
  const error = ref(false);
  let observer: IntersectionObserver | null = null;
  
  const loadMore = () => {
    try {
      if (!props.loading && visibleItems.value.length < props.items.length) {
        currentPage.value++;
        emit('load-more');
        error.value = false;
      }
    } catch (err) {
      console.error('Error loading more items:', err);
      error.value = true;
    }
  };
  
  const initObserver = () => {
    if (loadMoreTrigger.value) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log("IntersectionObserver triggered:", entry.isIntersecting)
            if (entry.isIntersecting) {
              loadMore();
            }
          });
        },
        { threshold: 0.7 }
      );
      observer.observe(loadMoreTrigger.value);
    } else {
      setTimeout(initObserver, 100);
    }
  };
  
  onMounted(() => {
    initObserver();
  });
  
  watch(
    () => props.items,
    (newItems, oldItems) => {
      const oldIds = new Set(oldItems.map((item) => item.id));
      const newIds = new Set(newItems.map((item) => item.id));
      const removedIds = [...oldIds].filter((id) => !newIds.has(id));
      if (removedIds.length > 0) {
        console.log('Removed fruit IDs:', removedIds.join(', '));
      }
      currentPage.value = 1;
    },
    { deep: true }
  );
  
  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });
  </script>
  
  <style lang="scss" scoped>
  .infinite-scroll {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .loading-indicator {
    text-align: center;
    padding: 1rem;
    color: var(--text-color);
  }
  
  .load-more-trigger {
        height: 40px; /* Увеличиваем высоту */
        /* border: 1px dashed gray; Добавляем границу для отладки */
    }
  
  .error-message {
    text-align: center;
    padding: 1rem;
    color: red;
  }
  </style>