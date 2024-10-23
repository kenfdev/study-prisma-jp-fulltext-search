-- CreateIndex
CREATE INDEX "body_fulltext_idx" ON "Article" USING GIN ("body" gin_bigm_ops);
