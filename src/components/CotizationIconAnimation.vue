<template>
  <div class="cotization-icon-wrapper">
    <LottieAnimation
      :animation-data="moneyReportAnimation"
      width="100%"
      height="100%"
      :speed="0.8"
      :loop="true"
      :autoplay="true"
    />
  </div>
</template>

<script setup lang="ts">
import LottieAnimation from '@/components/LottieAnimation.vue';
import moneyReportAnimation from '@/assets/animations/money-report.json';
</script>

<style scoped>
.cotization-icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(0, 177, 232, 0.1);
}
</style>
