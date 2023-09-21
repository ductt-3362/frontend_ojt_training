<script setup>
import BaseSelect from "@components/BaseSelect.vue";

const emit = defineEmits(["handleSort"]);

const optionsValue = [
  { label: "A->Z", value: "name asc" },
  { label: "Z->A", value: "name desc" },
  { label: "Giá từ thấp đến cao", value: "price asc" },
  { label: "Giá từ cao đến thấp", value: "price desc" },
];

const handleSelect = (value) => {
  const [_sort, _order] = value.split(" ");
  const params = { _sort: _sort, _order: _order };
  emit("handleSort", params);
};
</script>

<template>
  <BaseSelect
    @update:select="(value) => handleSelect(value)"
    :options-value="optionsValue"
  >
    <template v-slot:name>Sắp xếp</template>
  </BaseSelect>
</template>
