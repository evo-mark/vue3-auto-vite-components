import { resolveName, validateComponent } from "./index.js";
import type { RegisterFunction } from "./types";

export const registerSync: RegisterFunction = (Vue, { glob, namespace = "", resolveIndex = false }) => {
	for (const component in glob) {
		const name = resolveName(component, false, resolveIndex);
		const isValid = validateComponent(name);
		if (!isValid || !glob[component] || typeof glob[component] !== "object") continue;

		/* @ts-expect-error */
		Vue.component(`${namespace}${name}`, glob[component].default);
	}
};
