import fs from "node:fs";
import path from "node:path";

const seedDir = __dirname;

async function runSeedFiles() {
  const files = fs
    .readdirSync(seedDir)
    .filter((file) => file.match(/^\d+\..*\.seed\.ts$/))
    .sort();

  for (const file of files) {
    const filePath = path.join(seedDir, file);
    console.info(`\n🌱 Running seed file: ${file}`);
    const seedModule = await require(filePath);

    if (typeof seedModule.default === "function") {
      await seedModule.default();
    } else {
      console.warn(`⚠️ No default export found in ${file}`);
    }
  }

  console.info("\n✅ All seed files executed in order.");
}

runSeedFiles().catch((err) => {
  console.error("Error while seeding:", err);
  process.exit(1);
});
