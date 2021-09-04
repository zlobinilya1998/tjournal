<template>
  <div class="fixed inset-0 overlay" @click="closeModal">
    <div
      class="bg-white modal rounded-lg flex overflow-hidden transition"
      ref="modal"
    >
      <div
        class="w-1/3"
        :style="{
          backgroundImage:
            'url(https://leonardo.osnova.io/b6bd61b5-eb5b-34db-8501-2fcc54cd051b/-/format/webp/)',
          backgroundSize: 'cover',
        }"
      >
        <svg
          class="absolute left-5 top-5"
          width="35"
          height="35"
          viewBox="0 0 24 25"
          id="site_logo"
        >
          <path fill="#e8a427" class="st0" d="M0 19h8.5v6H0v-6z"></path>
          <path class="st1" d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
          <path
            fill="rgba(0,0,0,0.15)"
            class="st2"
            d="M7.5 19h1v6l-1-6z"
          ></path>
        </svg>
      </div>
      <div class="w-2/3 p-10 pt-24 relative">
        <button
          class="flex items-center absolute left-10 top-5 hover:text-blue-500"
          @click="step = 0"
          v-if="step > 0"
        >
          <svg
            class="mr-1 fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="v_chevron_left"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.207 6.293a1 1 0 010 1.414L9.914 12l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
            ></path>
          </svg>
          <span>К авторизации</span>
        </button>
        <svg
          @click="closeModal($event, true)"
          class="absolute right-5 top-5 cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="v_close"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z"
          ></path>
        </svg>
        <div v-if="step === 0">
          <h3 class="font-bold text-xl">Вход на TJ</h3>
          <div class="space-y-3 mt-5">
            <button
              class="
                p-2
                shadow-md
                rounded-lg
                flex
                w-full
                text-center
                font-medium
              "
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                id="v_vkontakte"
              >
                <path
                  d="M2 11.583c0-4.517 0-6.776 1.403-8.18C4.807 2 7.066 2 11.583 2h.834c4.517 0 6.776 0 8.18 1.403C22 4.807 22 7.066 22 11.583v.834c0 4.517 0 6.776-1.404 8.18C19.194 22 16.934 22 12.416 22h-.833c-4.517 0-6.776 0-8.18-1.404C2 19.194 2 16.934 2 12.416v-.833z"
                  fill="#2787F5"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.417 8.25H5.958c-.417 0-.5.196-.5.412 0 .387.495 2.302 2.303 4.836 1.205 1.73 2.903 2.669 4.449 2.669.927 0 1.042-.209 1.042-.568v-1.307c0-.417.087-.5.381-.5.216 0 .587.108 1.453.942.989.99 1.152 1.433 1.708 1.433h1.459c.416 0 .625-.209.505-.62-.132-.41-.604-1.004-1.23-1.709-.34-.401-.85-.834-1.005-1.05-.216-.279-.155-.402 0-.65 0 0 1.777-2.502 1.962-3.352.093-.309 0-.536-.44-.536h-1.46c-.37 0-.541.196-.634.412 0 0-.742 1.808-1.793 2.982-.34.34-.494.448-.68.448-.092 0-.226-.108-.226-.417V8.786c0-.37-.108-.536-.417-.536h-2.292c-.232 0-.372.172-.372.335 0 .352.526.433.58 1.422v2.147c0 .471-.085.556-.27.556-.495 0-1.698-1.815-2.411-3.893-.14-.404-.28-.567-.653-.567z"
                  fill="#fff"
                ></path>
              </svg>
              <span class="w-full">ВКонтакте</span>
            </button>
            <button
              class="
                p-2
                shadow-md
                rounded-lg
                flex
                w-full
                text-center
                font-medium
              "
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                id="v_google"
              >
                <path
                  d="M6.433 14.086l-.696 2.599-2.545.054a9.955 9.955 0 01-1.191-4.74 9.95 9.95 0 011.118-4.598l2.266.415.992 2.252A5.944 5.944 0 006.056 12c0 .734.133 1.437.377 2.086z"
                  fill="#FBBB00"
                ></path>
                <path
                  d="M21.825 10.132a10.02 10.02 0 01-.044 3.956 9.997 9.997 0 01-3.52 5.71l-2.854-.146-.404-2.521a5.96 5.96 0 002.564-3.043H12.22v-3.956h9.605z"
                  fill="#518EF8"
                ></path>
                <path
                  d="M18.26 19.798A9.957 9.957 0 0112 22a9.998 9.998 0 01-8.808-5.26l3.24-2.654a5.946 5.946 0 008.57 3.045l3.258 2.667z"
                  fill="#28B446"
                ></path>
                <path
                  d="M18.384 4.302l-3.24 2.652a5.948 5.948 0 00-8.767 3.114L3.12 7.401a9.998 9.998 0 018.88-5.4c2.427 0 4.652.863 6.384 2.301z"
                  fill="#F14336"
                ></path>
              </svg>
              <span class="w-full">Google</span>
            </button>
            <button
              class="
                p-2
                shadow-md
                rounded-lg
                flex
                w-full
                text-center
                font-medium
              "
              @click="loginViaEmail"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" id="v_email">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 8a4 4 0 014-4h12a4 4 0 014 4v8a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm2.026-.32l6.947 4.156a2 2 0 002.054 0l6.947-4.157A2 2 0 0018 6H6a2 2 0 00-1.974 1.68zM20 9.993l-5.946 3.558a4 4 0 01-4.108 0L4 9.994V16a2 2 0 002 2h12a2 2 0 002-2V9.994z"
                ></path>
              </svg>
              <span class="w-full">Через почту</span>
            </button>
            <div class="flex space-x-4">
              <button
                class="
                  p-2
                  shadow-md
                  rounded-lg
                  flex
                  text-center
                  font-medium
                  w-1/3
                "
              >
                <svg
                  class="mx-auto"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  id="v_facebook"
                >
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.992 3.656 9.129 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.262c-1.242 0-1.629.772-1.629 1.563V12h2.774l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.992 22 12z"
                    fill="#1877F2"
                  ></path>
                  <path
                    d="M15.893 14.89l.443-2.89h-2.773v-1.875c0-.791.386-1.563 1.628-1.563h1.262v-2.46s-1.144-.196-2.238-.196c-2.285 0-3.777 1.385-3.777 3.89V12h-2.54v2.89h2.54v6.989a10.058 10.058 0 003.124 0V14.89h2.33z"
                    fill="#fff"
                  ></path>
                </svg>
              </button>
              <button
                class="
                  p-2
                  shadow-md
                  rounded-lg
                  flex
                  text-center
                  font-medium
                  w-1/3
                "
              >
                <svg
                  class="mx-auto"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  id="v_twitter"
                >
                  <path
                    d="M19.953 7.983c.012.174.012.347.012.523C19.965 13.844 15.837 20 8.29 20v-.003A11.75 11.75 0 012 18.186a8.322 8.322 0 006.073-1.674c-1.756-.033-3.296-1.16-3.834-2.806a4.152 4.152 0 001.853-.07C4.178 13.256 2.8 11.6 2.8 9.676v-.05c.57.312 1.21.486 1.863.505a4.007 4.007 0 01-1.27-5.394 11.708 11.708 0 008.456 4.22 4.002 4.002 0 011.187-3.86 4.153 4.153 0 015.806.176c.919-.178 1.8-.51 2.606-.98a4.067 4.067 0 01-1.804 2.233A8.26 8.26 0 0022 5.89a8.267 8.267 0 01-2.047 2.093z"
                    fill="#1D9BF0"
                  ></path>
                </svg>
              </button>
              <button
                class="
                  p-2
                  shadow-md
                  rounded-lg
                  flex
                  text-center
                  font-medium
                  w-1/3
                "
              >
                <svg
                  class="mx-auto"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  id="v_apple"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.874 2.547c.726-.869 1.94-1.505 2.952-1.547a.163.163 0 01.166.146c.117 1.093-.27 2.313-1.038 3.264-.729.9-1.796 1.46-2.786 1.46a2.84 2.84 0 01-.207-.01.162.162 0 01-.147-.141c-.158-1.226.444-2.443 1.06-3.172zm-6.82 15.892c-1.831-2.7-2.884-7.153-1.228-10.087.87-1.547 2.449-2.523 4.12-2.548h.05c.72 0 1.398.274 1.997.517.448.182.835.339 1.133.339.265 0 .65-.155 1.095-.335.645-.26 1.448-.583 2.286-.583.107 0 .214.005.317.016.714.031 2.486.292 3.643 2.02a.167.167 0 01-.046.23l-.015.01c-.336.213-2.012 1.385-1.99 3.597.023 2.723 2.227 3.722 2.479 3.827l.011.005a.165.165 0 01.086.2l-.006.019a11.134 11.134 0 01-1.348 2.82c-.773 1.154-1.65 2.46-3.076 2.488-.665.013-1.116-.187-1.553-.38l-.004-.001c-.445-.197-.905-.4-1.625-.4-.758 0-1.24.21-1.708.413-.416.181-.846.368-1.44.392L9.158 21c-1.267 0-2.192-1.212-3.106-2.561z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-else-if="step === 1">
          <h4 class="font-medium text-xl">Войти через почту</h4>
          <p>
            или
            <span
              @click="step = 2"
              class="
                text-blue-300
                hover:text-blue-500
                cursor-pointer
                transition
              "
              >зарегистрироваться</span
            >
          </p>
          <div class="mt-5 flex flex-col">
            <input
              class="mt-3 outline-none p-2 border-2 border-blue-200"
              :class="{
                invalid:
                  $v.login.viaEmail.email.$dirty &&
                  $v.login.viaEmail.email.$invalid,
              }"
              type="text"
              placeholder="Почта"
              v-model="login.viaEmail.email"
            />
            <div class="h-4">
              <transition-group name="fade" mode="in-out">
                <div
                  key="first"
                  class="error"
                  v-if="
                    $v.login.viaEmail.email.$dirty &&
                    !$v.login.viaEmail.email.required
                  "
                >
                  Почта обязательное поле
                </div>
              </transition-group>
            </div>

            <input
              class="mt-3 outline-none p-2 border-2 border-blue-200"
              :class="{
                invalid:
                  $v.login.viaEmail.password.$dirty &&
                  $v.login.viaEmail.password.$invalid,
              }"
              type="password"
              placeholder="Пароль"
              v-model="login.viaEmail.password"
            />
            <div class="h-4">
              <transition-group name="fade" mode="in-out">
                <div
                  key="first"
                  class="error"
                  v-if="
                    !$v.login.viaEmail.password.required &&
                    $v.login.viaEmail.password.$dirty
                  "
                >
                  Пароль обязательное поле
                </div>
                <div
                  key="second"
                  class="error"
                  v-if="
                    !$v.login.viaEmail.password.minLength &&
                    $v.login.viaEmail.password.$dirty
                  "
                >
                  Пароль должен быть не менее
                  {{ $v.login.viaEmail.password.$params.minLength.min }}
                  символов.
                </div>
              </transition-group>
            </div>

            <div class="flex items-center justify-between mt-6">
              <button
                :disabled="loading"
                @click="authorize('email')"
                class="
                  py-2
                  px-3
                  w-max
                  text-white
                  bg-blue-300
                  hover:bg-blue-500
                  transition
                  rounded-lg
                "
                :class="{'bg-blue-500': !$v.login.viaEmail.$invalid}"
              >
                <span class="mr-2"> Войти </span>
                <v-icon
                  :name="loading ? 'fa-spinner' : 'fa-user'"
                  :animation="loading ? 'spin' : null"
                />
              </button>
              <span class="text-sm cursor-pointer text-gray-600"
                >Я забыл пароль</span
              >
            </div>
          </div>
        </div>
        <div v-else-if="step === 2">
          <h4 class="font-medium text-xl">Регистрация через почту</h4>
          <p>
            или
            <span
              class="
                text-blue-300
                hover:text-blue-500
                cursor-pointer
                transition
              "
              @click="step = 1"
              >войти в аккаунт</span
            >
          </p>
          <div class="mt-5 flex flex-col">
            <input
              v-model="registration.viaEmail.login"
              class="mt-3 outline-none p-2 border-2 border-blue-200"
              :class="{
                invalid:
                  $v.registration.viaEmail.login.$dirty &&
                  $v.registration.viaEmail.login.$invalid,
              }"
              type="text"
              placeholder="Имя и фамилия"
            />
            <div class="h-4">
              <transition-group name="fade" mode="in-out">
                <div
                  key="first"
                  class="error"
                  v-if="
                    !$v.registration.viaEmail.login.required &&
                    $v.registration.viaEmail.login.$dirty
                  "
                >
                  Имя обязательное поле
                </div>
                <div
                  key="second"
                  class="error"
                  v-if="
                    !$v.registration.viaEmail.login.minLength &&
                    $v.registration.viaEmail.login.$dirty
                  "
                >
                  Имя должно быть не менее
                  {{ $v.registration.viaEmail.login.$params.minLength.min }}
                  символов.
                </div>
              </transition-group>
            </div>

            <input
              v-model="registration.viaEmail.email"
              class="mt-3 outline-none border-2 border-blue-200 p-2"
              :class="{
                invalid:
                  $v.registration.viaEmail.email.$dirty &&
                  $v.registration.viaEmail.email.$invalid,
              }"
              type="email"
              placeholder="Почта"
            />
            <div class="h-4">
              <transition name="fade">
                <div
                  class="error"
                  v-if="
                    !$v.registration.viaEmail.email.required &&
                    $v.registration.viaEmail.email.$dirty
                  "
                >
                  Почта обязательное поле
                </div>
              </transition>
            </div>

            <input
              v-model="registration.viaEmail.password"
              class="mt-3 border-2 border-blue-200 outline-none p-2"
              :class="{
                invalid:
                  $v.registration.viaEmail.password.$dirty &&
                  $v.registration.viaEmail.password.$invalid,
              }"
              type="password"
              placeholder="Пароль"
            />
            <div class="h-4">
              <transition-group name="fade">
                <div
                  key="first"
                  class="error"
                  v-if="
                    !$v.registration.viaEmail.password.required &&
                    $v.registration.viaEmail.password.$dirty
                  "
                >
                  Пароль обязательное поле
                </div>
                <div
                  key="second"
                  class="error"
                  v-if="!$v.registration.viaEmail.password.minLength"
                >
                  Пароль должен быть не менее
                  {{ $v.registration.viaEmail.password.$params.minLength.min }}
                  символов.
                </div>
              </transition-group>
            </div>

            <button
              :disabled="loading"
              @click="register('email')"
              class="
                py-2
                px-3
                mt-6
                w-max
                text-white
                bg-blue-300
                hover:bg-blue-500
                transition
                rounded-lg
              "
            >
              <span class="mr-2"> Зарегистрироваться </span>
              <v-icon
                :name="loading ? 'fa-spinner' : 'fa-user'"
                :animation="loading ? 'spin' : null"
              />
            </button>
          </div>
        </div>

        <p class="mt-24 text-sm">
          Авторизуясь, вы соглашаетесь с правилами пользования сайтом и даёте
          согласие на обработку персональных данных.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data: () => ({
    loading: false,
    step: 0,
    login: {
      viaEmail: {
        email: "",
        password: "",
      },
    },
    registration: {
      viaEmail: {
        login: "",
        email: "",
        password: "",
      },
    },
  }),
  validations: {
    login: {
      viaEmail: {
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
      },
    },
    registration: {
      viaEmail: {
        login: {
          required,
          minLength: minLength(4),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
        },
      },
    },
  },
  methods: {
    ...mapMutations(["toggleRegistrationModal", "setUser"]),
    closeModal(e, flag = false) {
      if (e.target.classList.contains("overlay") || flag) {
        this.toggleRegistrationModal({ show: false });
      }
    },
    loginViaEmail() {
      this.step = 1;
    },
    register(type) {
      if (this.$v.registration.viaEmail.$invalid) {
        this.$v.$touch();
        return;
      }
      this.loading = true;
      setTimeout(() => {
        if (type === "email") {
          this.$axios
            .post("user/create", {
              name: this.registration.viaEmail.login,
              secondName: this.registration.viaEmail.login,
              password: this.registration.viaEmail.password,
              email: this.registration.viaEmail.email,
            })
            .then((res) => {
              this.setUser(res.data);
              this.toggleRegistrationModal({ show: false });
            })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }, 600);
    },
    authorize(type) {
      if (this.$v.login.viaEmail.$invalid) {
        this.$v.$touch();
        return;
      }
      this.loading = true;
      setTimeout(() => {
        if (type === "email") {
          this.$axios
            .post("user/login", {
              email: this.login.viaEmail.email,
              password: this.login.viaEmail.password,
            })
            .then((res) => {
              this.setUser(res.data);
              this.toggleRegistrationModal({ show: false });
            })
            .catch((e) => {
              console.log(e);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }, 600);
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 0);
  },
};
</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
.modal {
  @apply transition;
  min-width: 620px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
}
.invalid {
  border: 2px solid red;
}
.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
