/**
 * @file Flow Templates Tree-Sitter parser
 * @author @flowtemplates
 * @license MIT
 */
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
module.exports = grammar({
	name: 'flow',
	rules: {
		source_file: $ => repeat($._node),
		_node: $ => choice($._expression, $._operators),

		_operators: $ =>
			choice(
				$.comparison_operators,
				$.logical_operators,
				$.identity_operators,
				$.arithmetic_operators,
			),
		comparison_operators: _ => choice('==', '!=', '>', '<', '>=', '<='),
		logical_operators: _ => choice('and', '&&', 'or', '||'),
		identity_operators: _ => choice('is not', 'is', 'not'),
		arithmetic_operators: _ => choice('+', '-', '*', '/', '//', '%', '**'),

		_expression: $ =>
			choice(
				$.binary_expression,
				$.comparison_expression,
				$.equality_expression,
				$.logical_expression,
				$.identity_expression,
				$.unary_expression,
				$._primary_expression,
				$.parenthesized_expression,
			),

		_primary_expression: $ =>
			choice($._identifier, $._number_literal, $.string_literal),

		binary_expression: $ =>
			choice(
				prec.right(8, seq($._expression, '**', $._expression)),
				prec.left(
					7,
					seq($._expression, choice('*', '/', '//', '%'), $._expression),
				),
				prec.left(6, seq($._expression, choice('+', '-'), $._expression)),
			),
		comparison_expression: $ =>
			prec.left(5, seq($._expression, $.comparison_operators, $._expression)),
		equality_expression: $ =>
			prec.left(4, seq($._expression, choice('==', '!='), $._expression)),
		identity_expression: $ =>
			prec.left(4, seq($._expression, choice('is not', 'is'), $._expression)),
		logical_expression: $ =>
			choice(
				prec.left(3, seq($._expression, choice('and', '&&'), $._expression)),
				prec.left(2, seq($._expression, choice('or', '||'), $._expression)),
			),

		unary_expression: $ =>
			choice(
				prec(9, seq('!', $._expression)),
				prec(9, seq('not', $._expression)),
				prec(9, seq('-', $._expression)),
				prec(9, seq('+', $._expression)),
			),

		parenthesized_expression: $ => seq('(', $._expression, ')'),
		string_literal: _ =>
			token(
				choice(
					seq('"', repeat(choice(/[^"\\\n]/, /\\./)), '"'),
					seq("'", repeat(choice(/[^'\\\n]/, /\\./)), "'"),
				),
			),

		_number_literal: $ => choice($.float_literal, $.integer_literal),
		integer_literal: _ => /[0-9]+/,
		float_literal: _ => /[0-9]+\.[0-9]+/,

		_identifier: $ => choice($.namespace_identifier, $.user_identifier),
		_identifier_regexp: _ => /[a-zA-Z_][a-zA-Z_0-9]*/,
		user_identifier: $ => $._identifier_regexp,
		namespace_name: $ => seq('@', $._identifier_regexp),
		namespace_value: $ => seq('::', $._identifier_regexp),
		namespace_identifier: $ =>
			seq($.namespace_name, optional($.namespace_value)),
	},
});
