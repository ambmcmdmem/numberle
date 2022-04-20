<template>
  <div class="text-center toCenter">
    <div class="mb-1">シード値(0以上の整数)を入力してください。</div>
    <span v-if="seedError && isInput" class="error">{{ seedError }}</span>
    <input type="number" v-model="seed" min="1" @input="isInput = true" />
    <button class="mt-3" type="button" @click="sendSeed">SUBMIT</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { emitter } from '../../modules/emitter';
import { ensure } from '../../modules/numberleModule';

const doesFallForValidation = (target: {
  validation: () => boolean;
}): boolean => !target.validation();

export default defineComponent({
  setup() {
    const isInput = ref(false);
    const seed = ref<number | ''>('');
    const validationAndErrors = [
      {
        validation: () => String(seed.value).length > 0,
        error: 'シード値を入力してください。',
      },
      {
        validation: () =>
          Number.isInteger(seed.value) && Number(seed.value) > 0,
        error: 'シード値は0より大きい整数としてください。',
      },
    ];
    const seedError = computed((): string =>
      validationAndErrors.some(doesFallForValidation)
        ? ensure(validationAndErrors.find(doesFallForValidation)).error
        : ''
    );

    const sendSeed = (): void => {
      if (seedError.value || typeof seed.value !== 'number') {
        isInput.value = true;
        return;
      }

      emitter.emit('seedIsSet', seed.value);
    };

    return {
      seed,
      sendSeed,
      seedError,
      isInput,
    };
  },
});
</script>
