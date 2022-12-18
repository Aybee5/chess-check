<template>
  <nav
    class="bg-dark-text border-gray-200 px-2 sm:px-4 py-2.5 mb-4 rounded dark:bg-gray-900"
  >
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <div>
        <Icon
          name="game-icons:empty-chessboard"
          class="bg-light-text mr-3 h-6 w-6 md:h-8 md:w-8"
        />
        <span
          class="self-center md:text-xl font-semibold whitespace-nowrap text-light-text"
          >Check Chess</span
        >
      </div>
      <div class="text-light-text text-sm md:text-base">
        Made with <Icon name="mdi:heart" class="self-center text-[red]" /> by
        <a
          href="http://github.com/aybee5"
          target="_blank"
          class="text-primary-hover"
          >Ibrahim</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
