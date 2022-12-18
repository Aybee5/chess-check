<template>
  <div v-for="column in columns" :key="column">
    <div
      v-for="j in 8"
      :key="j"
      :class="[
        columns.indexOf(column) % 2 === j % 2 ? 'bg-light' : 'bg-primary',
      ]"
      class="aspect-square flex items-center justify-center cursor-pointer capitalize relative chess-cell"
    >
      <DropDown
        @select="$emit('select', $event, column, j)"
        label="name"
        :options="chessPieces"
        class="w-full h-full"
      >
        <template #opener>
          <div>
            <span v-if="activeCells[`${column}${j}`]">
              <Icon
                :name="activeCells[`${column}${j}`].icon"
                :class="[activeCells[`${column}${j}`].color]"
                class="chess-piece w-6 h-6 md:h-10 md:w-10"
              />
            </span>
            <span class="placeholder text-xs md:text-base" v-else>
              {{ column }}{{ j }}
              <Icon name="fa6-solid:caret-down" />
            </span>
          </div>
        </template>
        <template v-slot:options="{ option }">
          <div class="flex gap-2 items-center">
            <Icon :name="option.icon" v-if="option.icon" />
            {{ option.label }}
          </div>
        </template>
      </DropDown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SelectOption } from "~~/types/generics";

const columns = "abcdefgh";
const chessPieces = ref<SelectOption[]>([
  { label: "None", icon: "", value: null },
  { label: "King", icon: "fa6-solid:chess-king", value: "K" },
  { label: "Queen", icon: "fa6-solid:chess-queen", value: "Q" },
  { label: "Rook", icon: "fa6-solid:chess-rook", value: "R" },
  { label: "Knight", icon: "fa6-solid:chess-knight", value: "N" },
  { label: "Bishop", icon: "fa6-solid:chess-bishop", value: "B" },
  { label: "Pawn", icon: "fa6-solid:chess-pawn", value: "P" },
]);
defineProps<{
  activeCells: any;
}>();
defineEmits(["select"]);
</script>

<style lang="scss" scoped>
.chess-piece path {
  stroke: black;
  stroke-width: 16px;
  stroke-linejoin: round;
}

.chess-cell {
  .placeholder {
    @apply opacity-60;
  }

  &:hover {
    .placeholder {
      @apply opacity-100;
    }
  }
}
</style>
