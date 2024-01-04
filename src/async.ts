import { resolveName, validateComponent } from "./index.js";
import { RegisterAsyncFunction } from "./types.js";
import { defineAsyncComponent } from "vue";

const resolveLoadingComponent = (component: string, loadingComponents: Record<string, unknown>) => {
	const path = component.replace(/\.vue$/, "Loading.vue");
	return loadingComponents[path];
};

export const registerAsync: RegisterAsyncFunction = (Vue, { glob, loadingGlob, namespace, resolveIndex = false }) => {
	for (const component in glob) {
		const name = resolveName(component, false, resolveIndex);
		const isValid = validateComponent(name);
		if (!isValid) continue;

		const loadingComponent = loadingGlob ? resolveLoadingComponent(component, loadingGlob) : null;

		if (loadingComponent) {
			Vue.component(
				`${namespace}${name}`,
				defineAsyncComponent({
					loader: glob[component],
					/* @ts-expect-error */
					loadingComponent: loadingComponent.default,
					delay: 200,
				})
			);
		} else {
			Vue.component(`${namespace}${name}`, defineAsyncComponent(glob[component]));
		}
	}
};
