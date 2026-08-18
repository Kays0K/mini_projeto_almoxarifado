-- CreateTable
CREATE TABLE "Ferramenta" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'disponivel',

    CONSTRAINT "Ferramenta_pkey" PRIMARY KEY ("id")
);
