<template>
  <div class="subnet-calculator">
    <UiField label="IP-адрес">
      <UiInput
        v-model="ipInput"
        placeholder="192.168.1.150"
        @keyup.enter="calculate"
      />
    </UiField>

    <UiField label="Маска подсети">
      <UiSelect
        v-model="selectedMask"
        :options="maskOptions"
      />
    </UiField>

    <UiButton
      :is-disabled="!isValid"
      layout="primary"
      type="button"
      @click="calculate"
    >
      Рассчитать
    </UiButton>

    <div v-if="result" class="result">
      <p><strong>IP:</strong> {{ ipInput }}</p>
      <p><strong>Маска:</strong> {{ getMaskLabel(selectedMask) }}</p>
      <p><strong>Адрес сети:</strong> {{ result.network }}</p>
      <p><strong>Доступных адресов:</strong> {{ result.hosts }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SUBNET_OPTIONS } from 'src/constants/subnetMasks';
import { isIpValid } from 'src/utils/ipValidation';
import { getNetworkAddress } from 'src/utils/networkCalculation';
import { getAddressesCount } from 'src/utils/addressCount';


import UiButton from '@notdrexx/is-components-new/src/lib/UiButton/UiButton.vue';
import UiInput from '@notdrexx/is-components-new/src/lib/UiInput/UiInput.vue';
import UiSelect from '@notdrexx/is-components-new/src/lib/UiSelect/UiSelect.vue';
import UiField from '@notdrexx/is-components-new/src/lib/UiField/UiField.vue';

const ipInput = ref('');
const selectedMask = ref(SUBNET_OPTIONS[24].mask);

const maskOptions = SUBNET_OPTIONS.map(opt => opt.mask);

const isValid = computed(() => isIpValid(ipInput.value));

const result = ref<{ network: string; hosts: number } | null>(null);

function getMaskLabel(mask: string): string {
  const opt = SUBNET_OPTIONS.find(o => o.mask === mask);
  return opt ? opt.label : mask;
}

function calculate() {
  if (!isValid.value) return;
  const network = getNetworkAddress(ipInput.value, selectedMask.value);
  const hosts = getAddressesCount(selectedMask.value);
  result.value = { network, hosts };
}
</script>

<style scoped>
.subnet-calculator {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.5rem;
  max-width: 500px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.result {
  padding: 1rem;
  background: var(--color-bg-light, #f8fafc);
  border-radius: 8px;
  border: 1px solid var(--color-border, #cbd5e1);
}
</style>