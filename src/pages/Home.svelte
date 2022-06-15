<script>
  import { link, push } from "svelte-spa-router";
  import chatbotHome from './../assets/chatbot-telegram.png';
</script>

<div class="container col-xxl-8 px-4 py-5">
  <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
    <div class="col-10 col-sm-8 col-lg-6">
      <img src={chatbotHome} class="d-block mx-lg-auto img-fluid rounded" alt="Bootstrap Themes" width="1000" height="1000" loading="lazy">
    </div>
    <div class="col-lg-6">
      <h1 class="display-5 fw-bold lh-1 mb-3">Sistema gestor de Chatbot y Cursos</h1>
      <p class="lead">Sistema web educativo destinado como soporte tecnológico para el profesor(a) en gestionar su material didáctico como archivos Words, PDFs, Power Points, etc. de su(s) curso(s) segun el semestre académico y gestionar el conocimiento o información educativa a su asistente virtual.</p>
      <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="/login" class="btn btn-primary btn-lg px-4 me-md-2" use:link>Ingresar</a>
      </div>
    </div>
  </div>
</div>
