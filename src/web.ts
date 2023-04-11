import { resolveName, validateComponent } from "./index";
import { defineCustomElement } from "vue";

export const registerWeb = (glob, namespace = "") => {
	namespace = namespace.toLowerCase();
	for (const component in glob) {
		const name = resolveName(component.replace(".ce.vue", ".vue"), true);
		const isValid = validateComponent(name);
		if (!isValid) continue;

		const customElement = defineCustomElement(glob[component].default);
		window.customElements.define(namespace + "-" + name, customElement);
	}
};
