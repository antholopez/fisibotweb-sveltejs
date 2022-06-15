<script>
  import { push, pop, replace } from "svelte-spa-router";
  import logoChatbot from "./../assets/chatbot.png";
  import { userStorage } from "./../store.js";
  import { login } from "./../api/auth.js";

  let user = {
    emailOrCode: "",
    password: "",
  };
  let loading = false;

  const onSubmitHandler = async () => {
    try {
      loading = true;
      let response = await login(user);
      response.accessToken = undefined;

      $userStorage = response;
      await push("/");
      loading = false;
      location.reload();
    } catch (error) {
      console.log("error", error);
      loading = false;
    }
  };
</script>

<div class="container form-signin w-100">
  <form on:submit|preventDefault={onSubmitHandler}>
    <img
      class="mb-3 center"
      src={logoChatbot}
      alt=""
      width="100"
      height="100"
    />
    <h1 class="h3 mb-3 fw-normal text-center">Iniciar sesión</h1>

    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        bind:value={user.emailOrCode}
      />
      <label for="floatingInput">Código o dirección de correo electrónico</label
      >
    </div>
    <div class="form-floating mb-3">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        bind:value={user.password}
      />
      <label for="floatingPassword">Contraseña</label>
    </div>

    <button
      class="w-100 btn btn-lg btn-primary mb-3"
      type="submit"
      disabled={loading}
    >
      {#if loading}
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      {/if}
      Iniciar sesión
    </button>
    <p class="text-center">
      <a href="/">¿Olvidaste tu contraseña?</a>
    </p>
  </form>
</div>

<style>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin-top: 70px;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  label {
    font-size: 14px;
  }

  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
