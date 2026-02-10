<template>
  <router-link to="/" class="logo">
    <span>
      <ProcessingCircleAnimation class="logo-sm logo-sm-animated" />{{ " " }}
    </span>
    <span class="">
      <img :src="logoLight" alt="logo-large" class="logo-lg logo-light" />
      <img :src="logoDark" alt="logo-large" class="logo-lg logo-dark" />
    </span>
  </router-link>
</template>
<script setup lang="ts">
import ProcessingCircleAnimation from "./ProcessingCircleAnimation.vue";
import logoLight from "@/assets/images/logo-light.png";
import logoDark from "@/assets/images/logo-dark.png";
</script>

<style scoped>
.logo-sm {
  width: 60px;
  height: 60px;
}
</style>
