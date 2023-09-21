<script setup>
import BaseSelect from "@components/BaseSelect.vue";
import { getSortProductApi } from "@apis/category.js";
import { onMounted, ref, watch } from "vue";
const optionsValue = [
  { label: "A->Z", value: "name asc" },
  { label: "Z->A", value: "name desc" },
  { label: "Giá từ thấp đến cao", value: "price asc" },
  { label: "Giá từ cao đến thấp", value: "price desc" },
];
const valueSort = ref([]);
const bookList = ref();
const handleSort = (value) => {
  valueSort.value = value.split(" ");
};

const handleApiSort = async function () {
  try {
    const { data } = await getSortProductApi(
      valueSort.value[0],
      valueSort.value[1]
    );
    bookList.value = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
watch(valueSort, () => handleApiSort());

onMounted(handleApiSort);
</script>

<template>
  This is Home page
  <BaseSelect
    @update:select="(value) => handleSort(value)"
    :options-value="optionsValue"
  >
    <template v-slot:name>Sắp xếp</template>
  </BaseSelect>
  <div v-for="(item, index) in bookList" :key="index">{{ item.name }}</div>
</template>
