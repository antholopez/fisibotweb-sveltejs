<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import chatbotHome from "./../assets/chatbot-telegram.png";
  import { getCourses, createCourse } from "./../api/course.js";
  import { getSchools } from "./../api/schools.js";
  import Loading from "./../components/Loading.svelte";
  import Header from "./../components/Header.svelte";
  import { Modal, ModalBody, ModalHeader } from "sveltestrap";
  import { notify } from "./../utils/notification.js";

  let open = false;
  const toggle = () => (open = !open);

  let loading = false;
  let userSession = null;
  let courses = [];
  let textSearch = "";
  let filteredCourses = [];
  let schools = [];
  const defaultImage =
    "https://inlogiq.com/wp-content/uploads/2021/06/blog-4.png";

  onMount(async () => {
    userSession = JSON.parse(localStorage.getItem("userStorage"));
    console.log("userSession Home", userSession);
    if (userSession) {
      loading = true;
      const data = await getCourses();
      schools = await getSchools();
      courses = data;
      filteredCourses = data;
      loading = false;
    }
  });

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
  let loadingForm = false;
  let disabledForm = true;

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
    ? (disabledForm = false)
    : (disabledForm = true);

  $: if (filteredCourses.length && !courses.length) courses = filteredCourses;

  const searchCourses = (event) => {
    const value = event.target.value;
    filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(value)
    );
  };

  const clearCourse = () => {
    course.name = null;
    course.description = null;
    course.image = null;
    course.academicSemester = defaultAcademicSemester;
    course.cycle = defaultCycle;
    course.group = defaultGroup;
    course.idSchool = defaultSchool;
  };

  const closeModal = () => {
    clearCourse();
    open = false;
  }

  const createNewCourse = async () => {
    try {
      loadingForm = true;
      disabledForm = true;

      course.description = course.name;
      course.image = defaultImage;
      const newCourse = await createCourse(course);
      closeModal();
      notify("success", "Creación del curso exitoso");

      filteredCourses = [...filteredCourses, newCourse];

      disabledForm = false;
      loadingForm = false;
    } catch (error) {
      console.log("error", error);
      open = !open;
      disabledForm = false;
      loadingForm = false;
    }
  };
</script>

<Header />
{#if loading}
  <Loading />
{:else if !userSession}
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img
          src={chatbotHome}
          class="d-block mx-lg-auto img-fluid rounded"
          alt="Bootstrap Themes"
          width="1000"
          height="1000"
          loading="lazy"
        />
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-1 mb-3">
          Sistema gestor de Chatbot y Cursos
        </h1>
        <p class="lead">
          Sistema web educativo destinado como soporte tecnológico para el
          profesor(a) en gestionar su material didáctico como archivos Words,
          PDFs, Power Points, etc. de su(s) curso(s) segun el semestre académico
          y gestionar el conocimiento o información educativa a su asistente
          virtual.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a href="/login" class="btn btn-primary btn-lg px-4 me-md-2" use:link
            >Ingresar</a
          >
        </div>
      </div>
    </div>
  </div>
{:else if !courses.length && userSession}
  <div class="container mt-5">
    <div>
      <h1 class="text-center">
        Hola {userSession.firstName}
        {userSession.lastName}
      </h1>
      <div class="lead text-center center-paragraph">
        <p>
          Puedes crear una clase para subir tu material didáctico y publicar
          anuncios para los alumnos.
        </p>
        <button class="btn btn-dark me-md-2" on:click={toggle}
          >Crear curso</button
        >
      </div>
    </div>
  </div>
{:else if courses.length && userSession}
  <div class="container">
    <div class="row g3 mt-4 mb-2">
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control text-dark rounded-0"
          bind:value={textSearch}
          on:keyup={searchCourses}
          placeholder="Buscar un curso"
        />
      </div>
      <div class="col-4 d-md-flex justify-content-md-end">
        <button class="btn btn-dark me-md-2" on:click={toggle}
          >Crear curso</button
        >
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3 g-4 mt-0 mb-5">
      {#each filteredCourses as course}
        <div class="col">
          <div class="card h-100">
            <a href="/courses/1">
              <img
                src={course.image}
                class="card-img-top"
                alt="..."
                loading="lazy"
              />
            </a>
            <div class="card-body">
              <a class="set-href" href="/courses/1">
                <h5 class="card-title text-uppercase">{course.name}</h5>
              </a>
              <p class="card-text">
                {course.academicSemester} - G{course.group} - {course.school
                  .name} - {course.cycle} Ciclo
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
<Modal
  isOpen={open}
  backdrop="static"
  {toggle}
  class="modal-dialog modal-dialog-centered"
  on:close={closeModal}
>
  <ModalHeader {toggle}>Crear clase</ModalHeader>
  <ModalBody>
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
          disabled={loadingForm}
          on:click={closeModal}>Cancelar</button
        >
        <button type="submit" class="btn btn-success" disabled={disabledForm}
          >{#if !loadingForm}Crear{:else}Creando...{/if}</button
        >
      </div>
    </form>
  </ModalBody>
</Modal>

<style>
  .set-href {
    text-decoration: none;
    color: inherit;
  }

  .center-paragraph {
    padding-left: 300px;
    padding-right: 300px;
  }
</style>
