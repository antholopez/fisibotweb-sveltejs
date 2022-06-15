<script>
  import { logout } from "./../api/auth.js";
  import { link, push, replace } from "svelte-spa-router";
  import logo from "./../assets/svelte.png";
  import { userStorage } from "./../store.js";
  export let userSession;

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
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
      >
        <img src={logo} alt="" width="40" height="32" />
        <span class="fs-4">Fisibot</span>
      </a>

      <ul
        class="nav col-12 col-lg-auto me-lg-auto mb-2 ms-2 justify-content-center mb-md-0"
      >
        <li>
          <a href="/" class="nav-link px-2 text-white active">Inicio</a>
        </li>
      </ul>

      <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
				<input
					type="search"
					class="form-control form-control-dark text-white bg-dark"
					placeholder="Search..."
					aria-label="Search"
				/>
			</form> -->

      {#if !userSession}
        <div class="text-end">
          <a class="btn btn-outline-light me-2" href="/login" use:link
            >Iniciar sesión</a
          >
        </div>
      {:else}
        <div class="flex-shrink-0 dropdown">
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
            />
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li><a class="dropdown-item" href="#">Mi perfil</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button
                class="dropdown-item"
                on:click={closeSession}>Cerrar sesión</button
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
