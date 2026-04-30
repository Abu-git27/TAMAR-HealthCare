require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/®/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    category: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const placeholderImage =
  "https://res.cloudinary.com/difivhwwq/image/upload/v1777200373/tamar-products/wcyrck0w8eiyhta66yth.png";

const products = [
  { name: "CARDIOVIT® AT-1 G2", category: "Resting ECG", description: "Compact entry-level ECG device for quick diagnosis." },
  { name: "CARDIOVIT® AT-102", category: "Resting ECG", description: "Advanced ECG system for accurate cardiac analysis." },
  { name: "CARDIOVIT® AT-102 G2", category: "Resting ECG", description: "Improved ECG system with faster processing." },
  { name: "CARDIOVIT® FT-1", category: "Resting ECG", description: "Portable ECG device for bedside use." },
  { name: "CARDIOVIT® FT-2", category: "Resting ECG", description: "Advanced portable ECG with improved workflow." },

  { name: "CARDIOVIT® CS-10 / CS-20", category: "Exercise ECG", description: "Stress ECG systems for treadmill testing." },
  { name: "CARDIOVIT® AT-180", category: "Exercise ECG", description: "High-end ECG system for stress and resting tests." },
  { name: "CARDIOVIT® CS-104", category: "Exercise ECG", description: "Compact stress ECG solution." },
  { name: "CARDIOVIT® CS-200 Office", category: "Exercise ECG", description: "Professional stress ECG system." },
  { name: "CARDIOVIT® CS-200 Excellence", category: "Exercise ECG", description: "Premium stress ECG with full diagnostics." },

  { name: "CARDIOVIT® CS-200 Office ErgoSpiro", category: "CPET", description: "ECG + respiratory testing system." },
  { name: "CARDIOVIT® CS-200 Excellence ErgoSpiro", category: "CPET", description: "Advanced cardiopulmonary testing system." },

  { name: "medilog® DARWIN2 ABPM", category: "Software", description: "Ambulatory BP analysis software." },
  { name: "medilog® DARWIN2", category: "Software", description: "ECG Holter analysis software." },

  { name: "BR-102 plus", category: "Holter & BP", description: "Ambulatory BP monitoring device." },
  { name: "medilog® AR", category: "Holter & BP", description: "Holter ECG recorder." },

  { name: "SPIROVIT® SP-1 G2", category: "Pulmonary", description: "Basic spirometry device." },
  { name: "GANSHORN® SpiroScout", category: "Pulmonary", description: "Ultrasound spirometry system." },
  { name: "GANSHORN® PowerCube Diffusion+", category: "Pulmonary", description: "DLCO gas diffusion system." },
  { name: "GANSHORN® PowerCube Body+", category: "Pulmonary", description: "Lung volume measurement system." },

  { name: "TRUSCOPE® III", category: "Patient Monitor", description: "Multi-parameter patient monitor." },
  { name: "TRUSCOPE® Ultra Series", category: "Patient Monitor", description: "Advanced patient monitoring system." },
  { name: "TRUSCOPE® P Series", category: "Patient Monitor", description: "Mid-range patient monitor." },

  { name: "OXYWAVE®", category: "Pulse Oximeter", description: "Portable oxygen saturation monitor." },

  { name: "MAGLIFE® RT-1", category: "MRI Monitor", description: "MRI-compatible patient monitor." },

  { name: "DEFIGARD® 400", category: "Defibrillator", description: "Basic biphasic defibrillator." },
  { name: "DEFIGARD® 400x", category: "Defibrillator", description: "Advanced defibrillator with monitoring." },
  { name: "DEFIGARD® HD7", category: "Defibrillator", description: "Multi-mode defibrillator." },

  { name: "FRED® easy G2", category: "AED", description: "Automated external defibrillator." },
  { name: "FRED® easyport plus", category: "AED", description: "Ultra-portable AED device." },
  { name: "FRED® PA-1", category: "AED", description: "Fully automatic AED." },

  { name: "EASY PULSE®", category: "CPR Device", description: "Automatic chest compression device." },

  { name: "GRAPHNET Advance", category: "Ventilator", description: "Advanced ICU ventilator." },
  { name: "GRAPHNET TS", category: "Ventilator", description: "Multi-purpose ventilator." },
  { name: "GRAPHNET Neo", category: "Ventilator", description: "Neonatal ventilator." },

  { name: "AQUILON® TS", category: "Ventilator", description: "High-performance ventilator." },

  { name: "SOPHIE", category: "Ventilator", description: "Neonatal ventilator system." },

  { name: "A-mac S23", category: "Anaesthesia", description: "Flexible anesthesia workstation." },
  { name: "A-mac E1", category: "Anaesthesia", description: "Standard anesthesia machine." },
  { name: "A-mac E6", category: "Anaesthesia", description: "Advanced anesthesia workstation." },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "tamar" });

    for (const p of products) {
      const id = slugify(p.name);

      await Product.updateOne(
        { id },
        {
          $set: {
            id,
            name: p.name,
            category: p.category,
            description: p.description,
            image: placeholderImage,
          },
        },
        { upsert: true }
      );
    }

    console.log("✅ All products inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();