import 'dotenv/config'
console.log("\n--- 🔍 DIAGNOSTIC DATABASE ---")
const url = process.env.DATABASE_URL
if (url) {
  console.log("✅ DATABASE_URL est bien détectée.")
  console.log("Type :", url.split(':')[0])
  console.log("Host :", url.split('@')[1]?.split('/')[0] || "Inconnu")
} else {
  console.log("❌ DATABASE_URL est INTROUVABLE dans process.env")
  console.log("Vérifiez que le fichier .env est à la racine du projet.")
}
console.log("------------------------------\n")
