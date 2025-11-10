<template>
  <div>
    <div>
      <h1>Uh-oh!</h1>
      <p>
        It looks like you are experiencing some network issues, please take a few seconds before
        <a href="#" @click="$router.go(-1)">clicking here</a> to try again.
      </p>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  text-align: center;
  margin-top: 50px;
}
</style>
