<script>
  import Header from "./../components/Header.svelte";
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
      <button class="btn btn-dark me-md-2">Agregar Estudiante</button>
    </div>
  </div>

  <table class="table table-striped table-dark table-hover mt-4">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombres</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Imagen</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
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

<style>
</style>
