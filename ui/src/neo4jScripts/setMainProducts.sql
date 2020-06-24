:param products
=> [{name:'картоф', orderPostiion: "1"}, {name:'морков', orderPostiion: "1"}];

FOREACH
(product IN $products |
MERGE  (n:Ingredient { name: product.name, orderPosition: product.orderPostiion}) SET n:MainProduct
);
