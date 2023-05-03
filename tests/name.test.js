import { describe, it, expect } from "vitest";
import { resolveName } from "../src";

// The two tests marked with concurrent will be run in parallel
describe("sync name resolution", () => {
	it("resolves a standard sync component", async () => {
		const resolved = resolveName("./components/sync/Testing.vue");
		expect(resolved).toBe("Testing");
	});

	it("resolves a nested sync component", async () => {
		const resolved = resolveName("./components/sync/one/two/three/Testing.vue");
		expect(resolved).toBe("OneTwoThreeTesting");
	});

	it("resolves a sync component with a kebab-case subdirectory", async () => {
		const resolved = resolveName("./components/sync/one-two/three/Testing.vue");
		expect(resolved).toBe("OneTwoThreeTesting");
	});

	it("resolves a sync component with a snake case subdirectory", async () => {
		const resolved = resolveName("./components/sync/snake_case/Testing.vue");
		expect(resolved).toBe("SnakeCaseTesting");
	});

	it("resolves a sync component with a space in the subdirectory", async () => {
		const resolved = resolveName("./components/sync/some space/Testing.vue");
		expect(resolved).toBe("SomeSpaceTesting");
	});
});

describe("web component name resolution", () => {
	it("resolves a standard web component", async () => {
		const resolved = resolveName("./components/sync/Testing.vue", true);
		expect(resolved).toBe("testing");
	});

	it("resolves a nested web component", async () => {
		const resolved = resolveName("./components/sync/one/two/three/Testing.vue", true);
		expect(resolved).toBe("one-two-three-testing");
	});

	it("resolves a web component with a kebab-case subdirectory", async () => {
		const resolved = resolveName("./components/sync/one-two/three/Testing.vue", true);
		expect(resolved).toBe("one-two-three-testing");
	});

	it("resolves a web component with a snake case subdirectory", async () => {
		const resolved = resolveName("./components/sync/snake_case/Testing.vue", true);
		expect(resolved).toBe("snake-case-testing");
	});

	it("resolves a web component with a space in the subdirectory", async () => {
		const resolved = resolveName("./components/sync/some space/Testing.vue", true);
		expect(resolved).toBe("some-space-testing");
	});
});

describe("component file types", () => {
	it("resolves a JS file", () => {
		const resolved = resolveName("./components/sync/Testing.js");
		expect(resolved).toBe("Testing");
	});

	it("resolves a TS file", () => {
		const resolved = resolveName("./components/async/ts/Testing.ts");
		expect(resolved).toBe("TsTesting");
	});

	it("resolves a JSX file", () => {
		const resolved = resolveName("./components/sync/extended/Testing.jsx");
		expect(resolved).toBe("ExtendedTesting");
	});

	it("resolves a TSX file", () => {
		const resolved = resolveName("./components/sync/ts/extended/Testing.tsx");
		expect(resolved).toBe("TsExtendedTesting");
	});
});
