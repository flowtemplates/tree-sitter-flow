/**
 * @file Flow Templates Tree-Sitter parser
 * @author @flowtemplates
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "flow",

  rules: {
    source_file: $ => repeat(choice($.expression, $.text)),

    expression: $ => seq("{{", $.identifier, "}}"),

    text: $ => /[^{}]+/,

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  }
});
