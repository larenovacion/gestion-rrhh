-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "kids" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "obvs" TEXT NOT NULL,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkData" (
    "personalId" TEXT NOT NULL,
    "ant" TEXT NOT NULL,
    "cond" TEXT NOT NULL,
    "studies" TEXT NOT NULL,
    "studies_grade" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "disp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPassword" (
    "hash" TEXT NOT NULL,
    "adminId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkData_personalId_key" ON "WorkData"("personalId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminPassword_adminId_key" ON "AdminPassword"("adminId");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkData" ADD CONSTRAINT "WorkData_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "PersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminPassword" ADD CONSTRAINT "AdminPassword_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
