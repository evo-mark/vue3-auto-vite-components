import { resolveName, validateComponent } from "./index";
import { defineCustomElement } from "vue";
import { RegisterWeb } from "./types";

export const registerWeb: RegisterWeb = (glob, namespace = "") => {
	namespace = namespace.toLowerCase();
	for (const component in glob) {
		const name = resolveName(component.replace(".ce.vue", ".vue"), true);
		const isValid = validateComponent(name);
		if (!isValid) continue;

		/* @ts-ignore */
		const resolved = glob[component]?.default ? glob[component].default : glob[component];

		const customElement = defineCustomElement(resolved);
		window.customElements.define(namespace + "-" + name, customElement);
	}
};
