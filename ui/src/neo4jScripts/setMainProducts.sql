:param products
=> [{name:'картоф', orderPostiion: "1"}, {name:'морков', orderPostiion: "1"}];

FOREACH
(product IN $products |
MERGE  (n:Ingredient { name: product.name, orderPosition: product.orderPostiion}) SET n:MainProduct
);


-----------
search without TERM

:param ingredients
=> ["броколи", "моркови"];
:param preparationTimeRange
=> ["15"];
:param cookingTimeRange
=> ["15"];
:param skillLevel
=> ["Easy"];


MATCH (node:Recipe)
WITH node
WHERE any(i in $ingredients WHERE exists((node)-[:CONTAINS_INGREDIENT]->(:Ingredient {name: i})))
OPTIONAL MATCH (node)
WHERE node.preparationTime in $preparationTimeRange
OPTIONAL MATCH (node)
WHERE node.cookingTime in $cookingTimeRange
OPTIONAL MATCH (node)
WHERE node.skillLevel in $skillLevel
RETURN node

-----------