import { registerComponents } from "../dist";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(registerComponents, {
	sync: import.meta.glob("./components/sync/**/*.vue", { eager: true }),
	async: import.meta.glob(["./components/async/**/*.vue", "!../../components/async/**/*Loading.vue"]),
	asyncLoading: import.meta.glob("./components/async/**/*Loading.vue", {
		eager: true,
	}),
	web: import.meta.glob("./components/web/**/*.vue", { eager: true }),
	namespace: "Scw",
});

app.mount("#app");
