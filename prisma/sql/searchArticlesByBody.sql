SELECT title, body
FROM "Article"
WHERE body LIKE likequery($1) AND body LIKE likequery($2) AND body LIKE likequery($3) AND body LIKE likequery($4) AND body LIKE likequery($5);