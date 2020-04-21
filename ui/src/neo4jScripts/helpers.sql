match (r:Recipe)
set r.name = replace(r.name, "&amp;", "&")
return r


