<script>
  import Header from "./../components/Header.svelte";
  import Loading from "./../components/Loading.svelte";
  import { Modal, ModalBody, ModalHeader } from "sveltestrap";
  import { notify } from "./../utils/notification.js";
  import { createStudent, getStudentsByCourse } from "./../api/student";
  import { onMount } from "svelte";
  import { authStore } from "./../store.js";

  export let params = {};

  let open = false;
  const toggle = () => (open = !open);

  let loading = false;
  let userSession = null;
  let students = [];
  let textSearch = "";
  let filteredStudents = [];

  onMount(async () => {
    const id = Number(params.id);
    userSession = authStore.getUserSession();
    if (userSession) {
      loading = true;
      const data = await getStudentsByCourse(id);
      console.log("data students", data);
      students = data;
      filteredStudents = data;
      loading = false;
    }
  });

  let student = {
    code: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    courseId: Number(params.id),
  };
  let loadingForm = false;
  let disabledForm = true;

  $: student.code && student.email && student.firstName && student.lastName
    ? (disabledForm = false)
    : (disabledForm = true);

  const createNewStudent = async () => {
    loadingForm = true;

    try {
      student.image = `https://ui-avatars.com/api/?name=${
        student.firstName.split(" ")[0]
      } ${student.lastName.split(" ")[0]}&background=random&rounded=true`;
      const newStudent = await createStudent(student);
      closeModal();
      notify("success", "Se agregó el estudiante correctamente");
    } catch (error) {
      console.log("error", error);
      open = !open;
    }
    disabledForm = false;
    loadingForm = false;
  };

  const clearCourse = () => {
    student.code = "";
    student.email = "";
    student.firstName = "";
    student.lastName = "";

    disabledForm = true;
  };

  const closeModal = () => {
    clearCourse();
    open = false;
  };
</script>

<Header />
{#if loading}
  <Loading />
{:else}
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
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            bind:value={student.email}
          />
          <label for="floatingInput">Correo</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            bind:value={student.firstName}
          />
          <label for="floatingInput">Nombres</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            bind:value={student.lastName}
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
{/if}

<style>
</style>
