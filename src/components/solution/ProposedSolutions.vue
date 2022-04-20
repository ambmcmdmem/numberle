<template>
  <div v-if="seed" class="w-75 h-75 d-flex flex-column justify-content-between">
    <ProposedSolution
      v-for="proposedSolutionNo in maxNumberOfTries"
      :key="`proposedSolution${proposedSolutionNo - 1}`"
      :proposedSolution="proposedSolutions[proposedSolutionNo - 1]"
      :statusOfProposedSolution="
        statusOfProposedSolutions[proposedSolutionNo - 1]
      "
    ></ProposedSolution>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import {
  maxNumberOfInput,
  maxNumberOfTries,
  StatusOfProposedSolutionType,
  apiCheckDigit,
} from '../../modules/numberleModule';
import ProposedSolution from './ProposedSolution.vue';
import axios from 'axios';
import { emitter } from '../../modules/emitter';
import { apiOrigin } from '../../api/apiInformation';

export default defineComponent({
  components: {
    ProposedSolution,
  },
  props: {
    seed: Number,
  },
  setup(props) {
    axios.defaults.withCredentials = false;

    const keyValidation = ref(true);
    const numberOfTries = ref(1);
    const proposedSolutions = ref<string[][]>(
      [...Array(maxNumberOfTries)].map((): string[] => [])
    );
    const nowProposedSolution = computed(
      (): string[] => proposedSolutions.value[numberOfTries.value - 1]
    );
    const statusOfProposedSolutions = ref<StatusOfProposedSolutionType[][]>(
      [...Array(maxNumberOfTries)].map(() => [])
    );
    const nowStatusOfProposedSolutions = computed({
      get: (): StatusOfProposedSolutionType[] =>
        statusOfProposedSolutions.value[numberOfTries.value - 1],
      set: (
        givenStatusOfProposedSolutions: StatusOfProposedSolutionType[]
      ): StatusOfProposedSolutionType[] =>
        (statusOfProposedSolutions.value[numberOfTries.value - 1] =
          givenStatusOfProposedSolutions),
    });
    const IsProposedSolutionCorrect = computed((): boolean =>
      nowStatusOfProposedSolutions.value.every(
        (statusOfProposedSolution): boolean =>
          statusOfProposedSolution === 'correct'
      )
    );
    const parametersAboutSeed = computed(() => {
      if (props.seed === undefined)
        throw new Error('シード入力後ですがシードが空です。');
      return {
        seed: String(props.seed),
        checkDigit: String(apiCheckDigit(props.seed)),
      };
    });

    onMounted(() => {
      window.addEventListener('keydown', (event): void => {
        if (!keyValidation.value) return;

        if (
          !isNaN(Number(event.key)) &&
          nowProposedSolution.value.length < maxNumberOfInput
        ) {
          nowProposedSolution.value.push(event.key);
        } else if (event.key === 'Backspace') {
          nowProposedSolution.value.pop();
        } else if (
          event.key === 'Enter' &&
          nowProposedSolution.value.length === maxNumberOfInput
        ) {
          keyValidation.value = false;
          axios
            .post(
              `${apiOrigin}/collation`,
              new URLSearchParams({
                ...parametersAboutSeed.value,
                ...{ proposedSolution: nowProposedSolution.value.join('') },
              })
            )
            .then((response): void => {
              nowStatusOfProposedSolutions.value = response.data;

              if (
                IsProposedSolutionCorrect.value ||
                numberOfTries.value === maxNumberOfTries
              ) {
                axios
                  .post(
                    `${apiOrigin}/getAnswer`,
                    new URLSearchParams(parametersAboutSeed.value)
                  )
                  .then((response): void =>
                    emitter.emit('correctAnswerIsSent', String(response.data))
                  )
                  .catch((error): void => console.log(error));
              } else {
                numberOfTries.value++;
                keyValidation.value = true;
              }
            })
            .catch((error): void => console.log(error));
        }
      });
    });

    return {
      maxNumberOfTries,
      proposedSolutions,
      statusOfProposedSolutions,
    };
  },
});
</script>
