<script setup>
import BaseInput from "@components/BaseInput.vue";
import BaseButton from "@components/BaseButton.vue";
import BaseLabel from "@components/BaseLabel.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { registerApi } from "@api/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const router = useRouter();
const $toast = useToast();

const message = {
  required: "Trường này không được để trống",
  email: "Email không hợp lệ",
  min: "Mật khẩu phải có ít nhất 6 ký tự",
  oneOf: "Mật khẩu không khớp",
  success: "Đăng ký thành công",
  error: "Đăng ký thất bại",
};

const schema = yup.object({
  name: yup.string().required(message.required),
  phone: yup.string().required(message.required),
  address: yup.string().required(message.required),
  email: yup.string().required(message.required).email(message.email),
  password: yup.string().min(6, message.min).required(message.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], message.oneOf),
});

const { defineInputBinds, errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const email = defineInputBinds("email");
const name = defineInputBinds("name");
const password = defineInputBinds("password");
const confirmPassword = defineInputBinds("confirmPassword");
const phone = defineInputBinds("phone");
const address = defineInputBinds("address");

async function onSuccess(values) {
  try {
    await registerApi(values);
    $toast.success(message.success);
    router.push("/login");
  } catch (error) {
    $toast.error(message.error);
  }
}

const onSubmit = handleSubmit(onSuccess);
</script>

<template>
  <div class="flex flex-col items-center justify-center pt-16">
    <div class="p-10 border-2 rounded-lg">
      <p class="text-2xl">Đăng ký tài khoản</p>
      <form class="my-6 w-96" @submit="onSubmit">
        <div class="mb-6">
          <BaseLabel for="name">Họ và tên</BaseLabel>
          <BaseInput type="text" id="name" v-bind="name" />
        </div>
        <div class="mb-6">
          <BaseLabel for="phone">Số điện thoại</BaseLabel>
          <BaseInput type="tel" id="phone" v-bind="phone" />
        </div>
        <div class="mb-6">
          <BaseLabel for="address">Địa chỉ</BaseLabel>
          <BaseInput type="text" id="address" v-bind="address" />
        </div>
        <div class="mb-6">
          <BaseLabel for="email">Email</BaseLabel>
          <BaseInput type="text" id="email" v-bind="email" />
          <div>{{ errors.email }}</div>
        </div>
        <div class="mb-6">
          <BaseLabel for="password">Mật khẩu</BaseLabel>
          <BaseInput type="password" id="password" v-bind="password" />
          <div>{{ errors.password }}</div>
        </div>
        <div class="mb-6">
          <BaseLabel for="confirmPassword">Nhập lại mật khẩu</BaseLabel>
          <BaseInput
            type="password"
            id="confirmPassword"
            v-bind="confirmPassword"
          />
          <div>{{ errors.confirmPassword }}</div>
        </div>

        <BaseButton>Đăng ký</BaseButton>
      </form>
      <p class="text-lg">
        Bạn đã có tài khoản? Đăng nhập tại
        <span>
          <router-link to="/login" class="text-blue-500">đây</router-link>
        </span>
      </p>
    </div>
  </div>
</template>
