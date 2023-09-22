<script setup>
import { UPDATE_SELECT } from "@constants/events.js";
const props = defineProps(["optionsValue"]);
const emit = defineEmits([UPDATE_SELECT]);
const hanleSelect = function (value) {
  emit(UPDATE_SELECT, value);
};
</script>

<template>
  <select
    @change="(e) => hanleSelect(e.target.value)"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block fit-content p-2"
  >
    <option disabled selected>
      <slot name="name"></slot>
    </option>
    <template v-for="(item, index) in props.optionsValue" :key="index">
      <option :value="item.value">{{ item.label }}</option>
    </template>
  </select>
</template>
