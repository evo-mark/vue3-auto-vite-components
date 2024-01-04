import { resolveName, validateComponent } from "./index.js";
import { defineCustomElement } from "vue";
import { RegisterWeb } from "./types";

export const registerWeb: RegisterWeb = (glob, namespace = "", resolveIndex = false) => {
	namespace = namespace.toLowerCase();
	for (const component in glob) {
		const name = resolveName(component.replace(".ce.vue", ".vue"), true, resolveIndex);
		const isValid = validateComponent(name);
		if (!isValid) continue;

		/* @ts-ignore */
		const resolved = glob[component]?.default ? glob[component].default : glob[component];

		const customElement = defineCustomElement(resolved);
		window.customElements.define(namespace + "-" + name, customElement);
	}
};
