<template>
  <teleport to="body">
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 z-50 flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-dark-hover bg-opacity-60 md:inset-0 md:h-full"
    >
      <div
        class="relative flex items-center justify-center h-screen overflow-auto p-4"
      >
        <!-- Modal content -->
        <div class="shadow relative rounded-lg bg-light" ref="modalBody">
          <!-- Modal header -->
          <div
            v-if="$slots.header"
            class="flex items-start justify-between rounded-t px-4 py-3"
          >
            <slot name="header" />
          </div>
          <!-- Modal body -->
          <div class="space-y-6 p-6">
            <slot />
          </div>
          <!-- Modal footer -->
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
const emit = defineEmits(["outside"]);

const modalBody = ref(null);
onClickOutside(modalBody, () => {
  emit("outside");
});
</script>

<style scoped></style>
