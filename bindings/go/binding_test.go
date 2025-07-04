package tree_sitter_flow_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_flow "github.com/flowtemplates/tree-sitter-flow/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_flow.Language())
	if language == nil {
		t.Errorf("Error loading Flow grammar")
	}
}
