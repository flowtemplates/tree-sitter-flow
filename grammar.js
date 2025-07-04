/**
 * @file Flow grammar for tree-sitter
 * @author FlowTemplates Authors
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
	name: "flow",

	rules: {
		source_file: ($) => repeat(choice($.expression, $.text)),

		expression: ($) => seq("{{", $.identifier, "}}"),

		text: ($) => /[^{}]+/,

		identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
	},
});
