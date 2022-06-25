<script>
  import { logout } from "./../api/auth.js";
  import { link, push } from "svelte-spa-router";
  import logo from "./../assets/svelte.png";
  import { userStorage } from "./../store.js";
  import { onMount } from "svelte";
  import * as spa from "svelte-spa-router";

  let viewCenterTabs = false;
  let getLocation = spa.location;

  viewCenterTabs = $getLocation.split("/")[1] === "courses" ? true : false;

  let userSession = null;

  onMount(async () => {
    userSession = JSON.parse(localStorage.getItem("userStorage"));
    console.log("userSession Header", userSession);
  });

  const closeSession = async () => {
    try {
      await logout();
      $userStorage = null;
      await push("/");
      location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };
</script>

<header class="p-3 bg-dark text-white">
  <div class="container">
    <div
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
    >
      <div class="d-flex align-items-center col-md-3 mb-2 mb-md-0">
        <a href="/" class="text-white text-decoration-none me-2" use:link>
          <img src={logo} alt="" width="40" height="32" />
          <span class="fs-4">Fisibot</span>
        </a>
        <ul class="nav">
          <li>
            <a href="/" class="nav-link px-2 text-white active" use:link
              >Inicio</a
            >
          </li>
        </ul>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        {#if viewCenterTabs}
          <li class="nav-item">
            <a class="nav-link text-white active" aria-current="page" href="#"
              >Dashboard</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Sesiones</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Estudiantes</a>
          </li>
        {/if}
      </ul>

      {#if !userSession}
        <div class="col-md-3 text-end">
          <a class="btn btn-outline-light me-2" href="/login" use:link
            >Iniciar sesión</a
          >
        </div>
      {:else}
        <div class="flex-shrink-0 dropdown col-md-3 text-end">
          <a
            href="#"
            class="d-block link-light text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
              loading="lazy"
            />
          </a>
          <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">Mi perfil</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button class="dropdown-item" on:click={closeSession}
                >Cerrar sesión</button
              >
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
</style>
