const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  ip: { type: String },
  userAgent: { type: String },
  platform: { type: String, default: 'android' },
  appVersion: { type: String }, // e.g. "1.4.2" - pass as ?v=1.4.2 if you tag builds
  referrer: { type: String },   // where they came from (whatsapp, website, direct)

  // City-level geolocation derived from IP via geoip-lite (offline lookup, no external API)
  country: { type: String },
  region: { type: String },     // e.g. "30" (Nakuru county code) - geoip-lite returns region codes, not names
  city: { type: String },
  lat: { type: Number },
  lon: { type: Number },

  downloadedAt: { type: Date, default: Date.now }
});

// Index for fast counting/date-range queries on the stats endpoint
downloadSchema.index({ downloadedAt: -1 });

module.exports = mongoose.model('Download', downloadSchema);
