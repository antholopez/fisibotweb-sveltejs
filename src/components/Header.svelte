<script>
  import { logout } from "./../api/auth.js";
  import { link, push } from "svelte-spa-router";
  import logo from "./../assets/svelte.png";
  import { userStorage } from "./../store.js";
  import { createCourse } from "./../api/course.js";

  export let userSession;
  export let schools = [];
  const defaultImage =
    "https://inlogiq.com/wp-content/uploads/2021/06/blog-4.png";

  $: if (userSession) userSession = userSession;
  $: if (schools.length) schools = schools;

  const groups = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
  ];
  const academicSemesters = [{ name: "2022-1" }, { name: "2022-2" }];
  const cycles = [
    { name: "I" },
    { name: "II" },
    { name: "III" },
    { name: "IV" },
    { name: "V" },
    { name: "VI" },
    { name: "VII" },
    { name: "VIII" },
    { name: "IX" },
    { name: "X" },
  ];

  let course = {
    name: null,
    description: null,
    image: null,
    academicSemester: null,
    cycle: null,
    group: null,
    idSchool: null,
  };
  let loading = false;
  let disabled = true;

  const defaultAcademicSemester = "Selecciona un semestre";
  course.academicSemester = defaultAcademicSemester;
  const defaultCycle = "Selecciona un ciclo";
  course.cycle = defaultCycle;
  const defaultGroup = "Selecciona un grupo";
  course.group = defaultGroup;
  const defaultSchool = "Seleccion una escuela";
  course.idSchool = defaultSchool;

  $: course.name &&
  course.group > 0 &&
  course.idSchool > 0 &&
  academicSemesters.filter((as) => as.name === course.academicSemester)
    .length &&
  cycles.filter((c) => c.name === course.cycle).length
    ? (disabled = false)
    : (disabled = true);

  const clearCourse = () => {
    course.name = null;
    course.description = null;
    course.image = null;
    course.academicSemester = defaultAcademicSemester;
    course.cycle = defaultCycle;
    course.group = defaultGroup;
    course.idSchool = defaultSchool;
  };

  const createNewCourse = async () => {
    try {
      loading = true;
      disabled = true;

      course.description = course.name;
      course.image = defaultImage;
      await createCourse(course);
      await push("/");
      location.reload();

      disabled = false;
      loading = false;
    } catch (error) {
      console.log("error", error);
      loading = false;
    }
  };

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

      {#if !userSession}
        <div class="text-end">
          <a class="btn btn-outline-light me-2" href="/login" use:link
            >Iniciar sesión</a
          >
        </div>
      {:else}
        <div class="col-12 col-lg-auto me-3">
          <button
            class="btn btn-outline-light"
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">Crear curso</button
          >
        </div>

        <!-- Modal -->
        <div
          class="modal fade text-black"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Crear clase
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  on:click={clearCourse}
                />
              </div>
              <div class="modal-body">
                <form on:submit|preventDefault={createNewCourse}>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      bind:value={course.name}
                    />
                    <label for="floatingInput">Nombre del curso</label>
                  </div>
                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      bind:value={course.academicSemester}
                    >
                      <option selected>{defaultAcademicSemester}</option>
                      {#each academicSemesters as academicSemester}
                        <option value={academicSemester.name}
                          >{academicSemester.name}</option
                        >
                      {/each}
                    </select>
                    <label for="floatingPassword">Semestre académico</label>
                  </div>
                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      bind:value={course.cycle}
                    >
                      <option selected>{defaultCycle}</option>
                      {#each cycles as cycle}
                        <option value={cycle.name}>{cycle.name}</option>
                      {/each}
                    </select>
                    <label for="floatingPassword">Ciclo</label>
                  </div>
                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      bind:value={course.group}
                    >
                      <option selected>{defaultGroup}</option>
                      {#each groups as group}
                        <option value={group.id}>{group.name}</option>
                      {/each}
                    </select>
                    <label for="floatingPassword">Grupo</label>
                  </div>
                  <div class="form-floating mb-3">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      bind:value={course.idSchool}
                    >
                      <option selected>{defaultSchool}</option>
                      {#each schools as school}
                        <option value={school.id}>{school.name}</option>
                      {/each}
                    </select>
                    <label for="floatingPassword">Escuela</label>
                  </div>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      data-bs-dismiss="modal"
                      disabled={loading}
                      on:click={clearCourse}>Cancelar</button
                    >
                    <button
                      type="submit"
                      class="btn btn-outline-success"
                      {disabled}
                      >{#if !loading}Crear{:else}Creando...{/if}</button
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

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
              loading="lazy"
            />
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
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
