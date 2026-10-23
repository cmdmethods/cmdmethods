import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
	globalIgnores(["node_modules/", "public/assets/"]),
	{
		files: ["**/*.js"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: {
			sourceType: "commonjs",
			globals: globals.node,
		},
		rules: {
			"no-unused-vars": "warn",
		},
	},
	{
		files: ["public/js/**/*.js"],
		languageOptions: {
			sourceType: "script",
			globals: globals.browser,
		},
	},
]);
