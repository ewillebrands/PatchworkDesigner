<template>
  <div class="welcome">
    <h2>Welcome to Quillit!</h2>
    <router-link :to="{ name: 'quiltdesign' }">
      <button>Get Started</button>
    </router-link>
  </div>
</template>

<style>
.welcome {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 32px;
}
</style>
