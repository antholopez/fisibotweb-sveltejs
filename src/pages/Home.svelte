<script>
  import { onMount } from "svelte";
  import { link, push } from "svelte-spa-router";
  import chatbotHome from "./../assets/chatbot-telegram.png";

  let user = null;
  onMount(() => {
    user = localStorage.getItem("userStorage");
  });
</script>

{#if !user}
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
{:else}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4 mt-4">
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
