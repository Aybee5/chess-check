<template>
  <div ref="dropDownElement">
    <button
      class="vp-select"
      type="button"
      v-bind="$attrs"
      @click="openDropdown"
    >
      <span class="w-full">
        <slot name="opener" :data="modelValue">
          {{ modelValue ? modelValue.label : placeholder }}
        </slot>
      </span>
    </button>
    <!-- Dropdown menu -->
    <div v-if="showDropdown" class="vp-divide-option">
      <ul class="py-1 z-40 text-sm">
        <li
          v-for="option in options"
          :key="option.label"
          :name="option.label"
          tabindex="0"
          class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-dark-hover hover:text-light-text"
          @click="selectOption(option)"
          @keyup.enter="selectOption(option)"
        >
          <slot name="options" :option="option">
            {{ option.label }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { AlphaNumeric, SelectOption } from "~~/types/generics";
defineProps<{
  placeholder?: AlphaNumeric;
  options: SelectOption[];
  modelValue?: SelectOption;
}>();
const emit = defineEmits<{
  (e: "select", value: SelectOption): void;
}>();

const showDropdown = ref(false);
const dropDownElement = ref(null);

onClickOutside(dropDownElement, () => {
  showDropdown.value = false;
});

const openDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const selectOption = (option: SelectOption) => {
  showDropdown.value = false;
  emit("select", option);
};
</script>

<style scoped>
.vp-select {
  @apply inline-flex items-center justify-between gap-1 text-center text-dark-text shadow-sm outline-none focus:border focus:border-primary-hover;
}
.vp-divide-option {
  @apply absolute z-10 w-max h-max border border-solid  border-primary bg-[#FCFCFD];
}
</style>
