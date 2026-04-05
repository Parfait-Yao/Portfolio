import { prisma } from "../lib/prisma.js";

async function main() {
  try {
    const projects = await prisma.project.findMany();
    console.log("Success:", projects.length, "projects found");
  } catch (error) {
    console.error("Prisma Error:", error);
  } finally {
    process.exit();
  }
}

main();
