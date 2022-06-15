<script>
  import { push, pop, replace } from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes.js";
  import { onMount } from "svelte";

  let user = null;

  onMount(() => {
    user = localStorage.getItem("userStorage");
    console.log("🚀 ~ file: App.svelte ~ line 13 ~ onMount ~ user", user)
  });

  const conditionsFailed = (event) => {
    console.log("🚀 ~ file: App.svelte ~ line 17 ~ conditionsFailed ~ event", event)
    if (event.detail.location === "/login") replace("/");
  };
</script>

<main>
  <Header userSession={user} />
  <Router {routes} on:conditionsFailed={conditionsFailed} />
  <Footer />
</main>

<style>
</style>
