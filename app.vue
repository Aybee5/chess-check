<template>
  <nav-bar />
  <main class="px-4">
    <section class="grid md:grid-cols-12 gap-6 md:gap-10 mb-10">
      <div
        class="grid grid-cols-8 md:col-[2_/_span_6] col-span-full order-2 md:order-1"
      >
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
              @select="setSelected($event, column, j)"
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
      </div>
      <section
        class="md:col-[8_/_12] col-span-full flex items-start justify-center flex-col bg-dark px-6 md:px-10 py-10 rounded-md gap-6 order-1 md:order-2"
      >
        <div class="w-full">
          <p class="label">Check for:</p>

          <div class="">
            <ul class="actions-ul">
              <li class="" v-for="(action, index) in chessActions" :key="index">
                <div
                  class="inline-flex items-center justify-center gap-2 py-2 px-2 cursor-pointer text-light rounded-t-lg border-b-2 border-light hover:bg-primary-hover"
                  @click="activeAction = action.label"
                  :class="[
                    activeAction === action.label ? 'bg-primary-active' : '',
                  ]"
                >
                  <Icon :name="action.icon" />
                  {{ action.label }}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full">
          <p class="label">Piece Color:</p>

          <ul class="actions-ul">
            <li class="" v-for="color in chessColors" :key="color.label">
              <button
                class="inline-block py-3 px-4 rounded-lg cursor-pointer hover:border-primary hover:border-[3px] hover:border-solid"
                :class="[
                  color.colors,
                  activeColorValue === color.value
                    ? 'border-[3px] border-dashed border-primary-active'
                    : 'border-none',
                ]"
                @click="activeColorValue = color.value"
                aria-current="page"
              >
                <Icon name="mdi:chess-king" />
                {{ color.label }}
              </button>
            </li>
          </ul>
          <p class="text-light-text mt-2 italic">
            <Icon name="mdi:information-outline" />
            The selected color is assumed to be the next play on submit
          </p>
        </div>
        <div class="hidden md:block w-full">
          <button
            class="w-full bg-primary p-4 rounded-lg text-light-text font-semibold hover:bg-primary-hover"
            @click="checkBoard"
          >
            Check Chess
          </button>
          <div class="flex items-end justify-end">
            <div @click="resetBoard" class="mt-1 cursor-pointer text-[red]">
              Reset Board
            </div>
          </div>
        </div>
      </section>
      <div class="md:hidden block w-full order-3">
        <button
          class="w-full bg-primary p-4 rounded-lg text-light-text font-semibold hover:bg-primary-hover"
          @click="checkBoard"
        >
          Check Chess
        </button>
        <div class="flex items-end justify-end">
          <div @click="resetBoard" class="mt-1 cursor-pointer text-[red]">
            Reset Board
          </div>
        </div>
      </div>
    </section>
    <Modal @outside="showModal = false" v-if="showModal">
      <div
        class="flex flex-col items-center justify-center text-base md:text-4xl"
      >
        <h3 class="mb-5">
          {{ modalMessage.title }}
        </h3>
        <Icon
          class="h-10 w-10 md:h-24 md:w-24"
          :name="modalMessage.icon"
          :class="modalMessage.color"
        />
      </div>
    </Modal>
  </main>
</template>

<script lang="ts" setup>
import DropDown from "./components/DropDown.vue";
import { ModalContent, SelectOption } from "./types/generics";
import { Chess, validateFen } from "chess.js";

const columns = "abcdefgh";
const chessActions = [
  {
    label: "CheckMate",
    icon: "arcticons:openchaoschess",
    action: "inCheckmate",
  },
  { label: "Stalemate", icon: "arcticons:chessclock", action: "isStalemate" },
];
const activeAction = ref("CheckMate");

const chessColors = [
  { label: "White", colors: "bg-dark-chess text-light-text", value: "w" },
  { label: "Black", colors: "bg-light-chess text-[#1d1c1a]", value: "b" },
];
const activeColorValue = ref("w");

const chessPieces = ref<SelectOption[]>([
  { label: "None", icon: "", value: null },
  { label: "King", icon: "fa6-solid:chess-king", value: "K" },
  { label: "Queen", icon: "fa6-solid:chess-queen", value: "Q" },
  { label: "Rook", icon: "fa6-solid:chess-rook", value: "R" },
  { label: "Knight", icon: "fa6-solid:chess-knight", value: "N" },
  { label: "Bishop", icon: "fa6-solid:chess-bishop", value: "B" },
  { label: "Pawn", icon: "fa6-solid:chess-pawn", value: "P" },
]);

let positions = reactive({});
const activeCells = reactive({});
const setSelected = (option: SelectOption, column: string, row: number) => {
  const key = `${column}${row}`;
  positions[key] = option.value
    ? `${activeColorValue.value}${option.value}`
    : null;
  activeCells[key] = option.value
    ? {
        icon: option.icon,
        color:
          activeColorValue.value === "w"
            ? "text-light-chess"
            : "text-dark-chess",
      }
    : null;
};

const resetBoard = () => {
  Object.keys(positions).forEach((key) => delete positions[key]);
  Object.keys(activeCells).forEach((key) => delete activeCells[key]);
};
const showModal = ref(false);
let modalMessage = reactive<ModalContent>({
  title: "",
  icon: "",
  color: "",
});

const showSuccessModal = (status: string) => {
  modalMessage = {
    title: `This board is ${status}`,
    icon: "icon-park-solid:success",
    color: "text-primary",
  };
  showModal.value = true;
};
const showErrorModal = (title: string = "This is an invalid board") => {
  modalMessage = {
    title,
    icon: "mdi:warning-box",
    color: "text-[red]",
  };
  showModal.value = true;
};
const checkBoard = () => {
  const cleanedPositions = useDropFalsy(positions);
  const fenValue = useObjToFen(cleanedPositions);
  if (typeof fenValue !== "string") {
    return showErrorModal();
  }
  const isValid = validateFen(`${fenValue} ${activeColorValue.value} - - 0 1`);
  if (isValid.valid) {
    try {
      useValidatePieces(fenValue);
      const chess = new Chess(`${fenValue} ${activeColorValue.value} - - 0 1`);
      const status = ref(false);
      if (activeAction.value === "CheckMate") {
        status.value = chess.isCheckmate();
        status.value
          ? showSuccessModal("is in checkmate")
          : showErrorModal("The board is not in checkmate");
      } else {
        status.value = chess.isStalemate();
        status.value
          ? showSuccessModal("is in stalemate")
          : showErrorModal("The board is not in stalemate");
      }
    } catch (error) {
      if (typeof error === "string") {
        return showErrorModal(error);
      }
      showErrorModal("Something went wrong");
    }
  } else {
    return showErrorModal();
  }
};
</script>

<style lang="scss">
body {
  @apply bg-dark-body;
}
.label {
  @apply text-light-text text-lg mb-2;
}

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

.actions-ul {
  @apply flex flex-wrap text-lg gap-3 items-center justify-center -mb-px font-medium text-center;
}
</style>
