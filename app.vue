<template>
  <div class="app">
    <nav class="nav">
      <div class="container">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/favorites" class="nav-link">Favorites</NuxtLink>
      </div>
    </nav>
    
    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="scss">
.nav {
  background: var(--card-background);
  padding: 1rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .container {
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
}
</style>