import { ImportGlobFunction, ImportGlobEagerFunction } from "vite";
import type { App, AsyncComponentLoader, Component } from "vue";

export interface AutoComponentsConfig {
	sync?: Record<string, Component>;
	async?: Record<string, AsyncComponentLoader>;
	asyncLoading?: Record<string, Component>;
	web?: Record<string, unknown>;
	namespace?: string;
}

export type InstallFunction = (vue: App, options: AutoComponentsConfig) => void;

export type RegisterFunction = (
	vue: App,
	options: {
		glob: Record<string, Component>;
		namespace: string;
	}
) => void;

export type RegisterAsyncFunction = (
	vue: App,
	options: {
		glob: Record<string, AsyncComponentLoader>;
		loadingGlob: Record<string, Component>;
		namespace: string;
	}
) => void;

export interface VueAutoViteComponents {
	install: InstallFunction;
}
