<template>
  <div class="d-flex justify-content-around">
    <Character
      v-for="characterNo in maxNumberOfInput"
      :key="`character${characterNo - 1}`"
      :character="proposedSolution[characterNo - 1] ?? ''"
      :statusOfCharacter="statusOfProposedSolution[characterNo - 1] ?? ''"
    ></Character>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Character from './Character.vue';
import {
  maxNumberOfInput,
  StatusOfProposedSolutionType,
} from '../../modules/numberleModule';

export default defineComponent({
  props: {
    proposedSolution: Array as PropType<string[]>,
    statusOfProposedSolution: Array as PropType<StatusOfProposedSolutionType[]>,
  },
  components: {
    Character,
  },
  setup() {
    return {
      maxNumberOfInput,
    };
  },
});
</script>
