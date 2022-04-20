<template>
  <div class="appContainer toCenter">
    <SeedForm v-if="!seed"></SeedForm>
    <template v-else>
      <ProposedSolutions :seed="seed"></ProposedSolutions>
      <CorrectAnswer></CorrectAnswer>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import SeedForm from './seed/SeedForm.vue';
import ProposedSolutions from './solution/ProposedSolutions.vue';
import CorrectAnswer from './answer/CorrectAnswer.vue';
import { emitter } from '../modules/emitter';

export default defineComponent({
  components: {
    SeedForm,
    ProposedSolutions,
    CorrectAnswer,
  },
  setup() {
    const seed = ref<number | null>(null);

    onMounted(() => {
      emitter.on('seedIsSet', (setSeed): void => {
        seed.value = setSeed;
      });
    });

    return {
      seed,
    };
  },
});
</script>

<style lang="scss">
.appContainer {
  height: 100vh;
}
</style>
