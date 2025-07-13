const mongoose = require('mongoose');

// Schemat danych produktu – zgodny z BC, z odpowiednimi ograniczeniami
const ProductSchema = new mongoose.Schema({

  // Nazwa produktu, np. "Frez walcowy 50mm"
  // Typ tekstowy, bez ograniczeń jak w BC
  name: {
    type: String,
    required: true,
    trim: true
  },

  // SKU = Item No. (w BC typ Code[20])
  itemNo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,         // BC przechowuje wszystko wielkimi literami
    trim: true,
    maxlength: 20            // jak Code[20] w BC
  },

  // Główna kategoria – mapowana na Item Category Code (BC: Code[10])
  mainCategoryCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 10            // jak Code[10] w BC
  },

  // Podkategoria – mapowana na Product Group Code (BC: Code[10])
  productGroupCode: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    maxlength: 10            // jak Code[10] w BC
  },

  // Producent – np. "Meetyou", "ZCC"
  // Jeśli będzie synchronizacja z Vendor No., to dajemy uppercase i maxlen
  manufacturer: {
    type: String,
    trim: true,
    equired: true,
    uppercase: true,
    maxlength: 20            // zgodność z Vendor No. = Code[20] w BC
  },

  // Seria produktu – np. "ProLine", "ExBlackLine"
  series: {
    type: String,
    trim: true,
    maxlength: 30            // nieobowiązkowe, ale trzymamy porządek
  },

  // Atrybuty techniczne – zagnieżdżony obiekt
  attributes: {
    diameter: Number,              // Średnica frezu (mm)
    fluteCount: Number,           // Liczba ostrzy (Z)
    toolMaterial: String,         // Materiał (np. Węglik, PCD)
    coating: String,              // Powłoka (np. AlTiN)
    application: [String],        // Tablica materiałów (np. ["Aluminium", "Stal"])
    coolingType: String,          // Przez wrzeciono / Zewnętrzne

    // Dla frezów indeksowalnych
    bodyType: String,
    insertType: String,
    insertSize: String,
    clampingType: String,
    rakeAngle: String,

    // Dla ceramicznych / PCD
    machiningMaterial: String,
    rpmRange: String,
    surfaceFinish: String,

    // Dla kulistych / grawerujących
    tipRadius: Number,
    coneAngle: String
  },

  // Czy to dane testowe (np. do dev seeda)
  isSample: { type: Boolean, default: false },

  // Daty utworzenia i aktualizacji
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware – upewniamy się, że pola typu CODE będą zawsze uppercase
ProductSchema.pre('save', function (next) {
  this.mainCategoryCode = this.mainCategoryCode?.toUpperCase();
  this.productGroupCode = this.productGroupCode?.toUpperCase();
  this.itemNo = this.itemNo?.toUpperCase();
  if (this.manufacturer) this.manufacturer = this.manufacturer.toUpperCase();
  next();
});

// Eksportujemy model jako "Product", żeby można było go używać w innych plikach
module.exports = mongoose.model('Product', ProductSchema);
