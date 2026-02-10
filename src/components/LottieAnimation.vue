<template>
  <div
    ref="lottieContainer"
    class="lottie-container"
    :style="{ width, height }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import lottie from 'lottie-web';

interface Props {
  animationData: Record<string, unknown>;
  width?: string;
  height?: string;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '100%',
  speed: 1,
  loop: true,
  autoplay: true,
});

const lottieContainer = ref<HTMLDivElement | null>(null);
let animation: ReturnType<typeof lottie.loadAnimation> | null = null;

onMounted(() => {
  if (lottieContainer.value) {
    animation = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
    });

    if (animation) {
      animation.setSpeed(props.speed);
    }
  }
});

watch(() => props.speed, (newSpeed) => {
  if (animation) {
    animation.setSpeed(newSpeed);
  }
});

defineExpose({
  animation,
});
</script>

<style scoped>
.lottie-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
