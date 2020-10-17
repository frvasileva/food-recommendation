CALL db.index.fulltext.createNodeIndex("RecipeTitleAndDescription",["Recipe"],["name", "description"],{ analyzer: "bulgarian", eventually_consistent: "true" })
