<script>
  import { replace } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
import { onMount } from "svelte";

  let userSession = null;
  onMount(() => {
    console.log("En el homeeeeee");
    userSession = localStorage.getItem("userStorage");
  });

  const conditionsFailed = (event) => {
    console.log(
      "🚀 ~ file: App.svelte ~ line 17 ~ conditionsFailed ~ event",
      event
    );
    if (event.detail.location === "/login") replace("/");
  };
</script>

<main>
  <Header userSession={userSession}/>
  <Router {routes} on:conditionsFailed={conditionsFailed} />
  <Footer/>
</main>
