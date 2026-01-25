<template>
  <div v-if="enabled" class="alert alert-primary text-center m-0" role="alert">
    Hello World — esta es una bandera controlada por DevCycle.
  </div>
  <div v-else class="d-none" />
  <!-- keeps layout stable when off -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getBooleanFlag } from "@/helpers/feature-flags";

const enabled = ref(false);

onMounted(async () => {
  try {
    enabled.value = await getBooleanFlag("hello-world-banner", false, {
      targetingKey: "visitor",
    });
    // Optional: refresh later or subscribe to changes if needed
  } catch (e) {
    console.warn("Feature flag evaluation failed", e);
  }
});
</script>
