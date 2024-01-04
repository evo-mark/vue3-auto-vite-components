import { registerSync } from "./sync.js";
import { registerAsync } from "./async.js";
import { registerWeb } from "./web.js";
import type { VueAutoViteComponents, AutoComponentsConfig } from "./types";
import { kebabCase, camelCase, upperFirst } from "lodash-es";

const pascalCase = (str: string): string => [camelCase, upperFirst].reduce((acc, fn) => fn(acc), str);

export const validateComponent = (name: string): boolean => {
	if (!name) return false;
	else if (/loading$/i.test(name) === true) return false;
	else return true;
};

export const resolveName = (
	component: string,
	useKebab: boolean = false,
	resolveIndex: boolean = false
): string | null => {
	const nameMatches = component.match(/(?:^.*?(?:a?sync|web)\/)(.*?)(?:\.(vue|js|ts|jsx|tsx)$)/i);
	if (!nameMatches || !nameMatches[1]) return null;
	let name = nameMatches[1]
		.replace(/\/index$/i, (value) => {
			if (resolveIndex !== true) return value;
			else return "";
		})
		.replace(/(^[a-z]|\/[a-z])/g, (value) => {
			return value.toUpperCase();
		})
		.replaceAll("/", "");

	if (useKebab) return kebabCase(name);
	else return pascalCase(name);
};

export const registerComponents: VueAutoViteComponents = {
	install: (Vue, options: AutoComponentsConfig) => {
		Vue.use(registerSync, {
			glob: options.sync,
			namespace: options.namespace,
			resolveIndex: options.resolveIndex,
		});
		Vue.use(registerAsync, {
			glob: options.async,
			loadingGlob: options.asyncLoading,
			namespace: options.namespace,
			resolveIndex: options.resolveIndex,
		});
		registerWeb(options.web, options.namespace, options.resolveIndex);
	},
};
