<script>
  import { replace } from "svelte-spa-router";
  import Router from "svelte-spa-router";
  import { routes } from "./routes.js";
  import Footer from "./components/Footer.svelte";

  const conditionsFailed = (event) => {
    console.log(
      "🚀 ~ file: App.svelte ~ line 17 ~ conditionsFailed ~ event",
      event
    );
    if (event.detail.location === "/login") replace("/");
  };
</script>

<main>
  <Router {routes} on:conditionsFailed={conditionsFailed} />
  <!-- <Footer /> -->
</main>
