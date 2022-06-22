<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import chatbotHome from "./../assets/chatbot-telegram.png";
  import { getCourses } from "./../api/course.js";
  import Loading from "./../components/Loading.svelte";

  let loading = false;
  let userSession = null;
  let courses = [];

  onMount(async () => {
    userSession = JSON.parse(localStorage.getItem("userStorage"));
    console.log("🚀 ~ file: Home.svelte ~ line 14 ~ onMount ~ userSession", userSession);
    if (userSession) {
      loading = true;
      courses = await getCourses();
      loading = false;
    }
  });
</script>

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
          PDFs, Power Points, etc. de su(s) curso(s) segun el semestre
          académico y gestionar el conocimiento o información educativa a su
          asistente virtual.
        </p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <a
            href="/login"
            class="btn btn-primary btn-lg px-4 me-md-2"
            use:link>Ingresar</a
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
        <p>
          Haz click en el botón
          <span class="fw-bold">"Crear curso"</span>.
        </p>
      </div>
    </div>
  </div>
{:else if courses.length && userSession}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
      {#each courses as c}
        <div class="col">
          <div class="card h-100">
            <a href="/courses/1">
              <img
                src={c.course.image}
                class="card-img-top"
                alt="..."
                loading="lazy"
              />
            </a>
            <div class="card-body">
              <a class="set-href" href="/courses/1">
                <h5 class="card-title text-uppercase">{c.course.name}</h5>
              </a>
              <p class="card-text">
                {c.course.academicSemester} - G{c.course.group} - {c.course
                  .school.name} - {c.course.cycle} Ciclo
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

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
