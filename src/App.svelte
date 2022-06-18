<script>
  import { replace } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import { onMount } from "svelte";
  import { getSchools } from "./api/schools.js";

  let userSession = null;
  let schools = [];

  onMount(async () => {
    userSession = JSON.parse(localStorage.getItem("userStorage"));
    if (userSession) {
      schools = !schools.length ? await getSchools() : schools;
    }
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
  <Header userSession={userSession} schools={schools}/>
  <Router {routes} on:conditionsFailed={conditionsFailed} />
  <Footer />
</main>
