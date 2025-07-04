import XCTest
import SwiftTreeSitter
import TreeSitterFlow

final class TreeSitterFlowTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_flow())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Flow grammar")
    }
}
