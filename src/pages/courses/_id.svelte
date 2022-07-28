<script>
  import { getCourse } from "./../../api/course";
  import Loading from "./../../components/Loading.svelte";
  import { onMount } from "svelte";
  import Header from "./../../components/Header.svelte";
  import { authStore } from "./../../store.js";

  export let params = {};
  console.log("params", params);
  let loading = false;
  let userSession = null;
  let course = {};

  onMount(async () => {
    const id = Number(params.id);
    userSession = authStore.getUserSession();
    if (userSession) {
      loading = true;
      course = await getCourse(id);
      loading = false;
    }
  });
</script>

<Header />
{#if loading}
  <Loading />
{:else}
  <div class="container mt-4 text-center">
    <img src={course.image} class="img-fluid" alt="...">
    <h2 class="text-uppercase mt-2">{course.name}</h2>
  </div>
{/if}

<style>
</style>
