<template>
  <div class="app">
    <nav class="nav">
      <div class="container nav-container">
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/favorites" class="nav-link">Favorites</NuxtLink>
          <NuxtLink to="/workout" class="nav-link">Workout</NuxtLink>
        </div>
        <button v-if="currentRoute === '/'" class="filter-button" @click="toggleFilters">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>
    </nav>
    
    <main class="container page-container">
      <Suspense>
        <NuxtPage />
        <template #fallback>
          <div class="loading-page">
            Loading...
          </div>
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const currentRoute = computed(() => route.path);
const emitter = useEmitter();

const toggleFilters = () => {
  emitter.emit('toggle-filters');
};
</script>

<style lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: var(--card-background);  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--background-color);
    }

    &.router-link-active {
      color: var(--primary-color);
      background-color: var(--background-color);
    }
  }

  .filter-button {
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

    svg {
      display: block;
    }
  }
}

.page-container {
  margin-top: 40px;
}

.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: var(--text-color);
}
</style>