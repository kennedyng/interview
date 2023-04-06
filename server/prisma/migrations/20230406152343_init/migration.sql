/*
  Warnings:

  - You are about to drop the `selectortype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "selectortype";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,
    CONSTRAINT "department_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "departmentId" INTEGER,
    CONSTRAINT "product_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
