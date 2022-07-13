<script>
  import Header from "./../components/Header.svelte";
  import { Modal, ModalBody, ModalHeader } from "sveltestrap";
  import { notify } from "./../utils/notification.js";

  let open = false;
  const toggle = () => (open = !open);

  let student = {
    code: "",
    email: "",
    names: "",
    lastNames: "",
  };
  let loadingForm = false;
  let disabledForm = true;

  $: student.code && student.email && student.names && student.lastNames
    ? (disabledForm = false)
    : (disabledForm = true);

  const createNewStudent = () => {
    console.log("student: ", student);
  };

  const clearCourse = () => {
    student.code = "";
    student.email = "";
    student.names = "";
    student.lastNames = "";

    disabledForm = true
  };

  const closeModal = () => {
    clearCourse();
    open = false;
  };
</script>

<Header />
<div class="container">
  <div class="row g3 mt-4 mb-2">
    <div class="col-sm-8">
      <input
        type="text"
        class="form-control text-dark rounded-0"
        placeholder="Nombre del estudiante"
      />
    </div>
    <div class="col-4 d-md-flex justify-content-md-end">
      <button class="btn btn-dark me-md-2" on:click={toggle}
        >Agregar Estudiante</button
      >
    </div>
  </div>

  <table class="table table-striped table-dark table-hover mt-4">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Código</th>
        <th scope="col">Email</th>
        <th scope="col">Nombres</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Imagen</th>
        <th scope="col" />
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>14200195</td>
        <td>anthony.lopez@unmsm.edu.pe</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td class="text-center">
          <button class="btn btn-success">Editar</button>
          <button class="btn btn-danger">Eliminar</button>
        </td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>14200195</td>
        <td>anthony.lopez@unmsm.edu.pe</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td class="text-center">
          <button class="btn btn-success">Editar</button>
          <button class="btn btn-danger">Eliminar</button>
        </td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>14200195</td>
        <td>anthony.lopez@unmsm.edu.pe</td>
        <td>Larry the Bird</td>
        <td>Larry the Bird</td>
        <td>@twitter</td>
        <td class="text-center">
          <button class="btn btn-success">Editar</button>
          <button class="btn btn-danger">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<Modal
  isOpen={open}
  backdrop="static"
  {toggle}
  class="modal-dialog modal-dialog-centered"
  on:close={closeModal}
>
  <ModalHeader {toggle}>Agregar Estudiante</ModalHeader>
  <ModalBody>
    <form on:submit|preventDefault={createNewStudent}>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          bind:value={student.code}
        />
        <label for="floatingInput">Código</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          bind:value={student.email}
        />
        <label for="floatingInput">Correo</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          bind:value={student.names}
        />
        <label for="floatingInput">Nombres</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          bind:value={student.lastNames}
        />
        <label for="floatingInput">Apellidos</label>
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
          >{#if !loadingForm}Agregar{:else}Agregando...{/if}</button
        >
      </div>
    </form>
  </ModalBody>
</Modal>

<style>
</style>
