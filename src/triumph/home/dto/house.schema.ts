import * as mongoose from 'mongoose';

export const HouseSchema = new mongoose.Schema({
  image: [{ ima: { type: String } }],  // Corrected the type for 'ima'
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'triumphuser',
  },
  categorie: { type: String },
  type: { type: String },
  ville: { type: String },
  address: { type: String },
  prix: { type: Number },
  meusure: { type: String },
  description: { type: String },
  Property_details: {
    meusure: { type: String },
    Bedrooms: { type: Number },
    Bathrooms: { type: Number },
    Floor: { type: String },
    Additional_Space: { type: String },
    Furnishing: { type: String },
    CeilingHeight: { type: String },
    ConstructionYear: { type: String },
    Renovation: { type: String }
  },

  Outdoor_features: {
    Garage: { type: String },
    Garden: { type: String },
    SwimmingPool: { type: String },
    Security: { type: String },
    Parking: { type: String },
    DisabledAccess: { type: String },
    Fence: { type: String },
    Pet_Friendly: { type: String }

  },
  Floorplans: [
    {
      ima: { type: String }
    }
  ],
  Property_utility: {
    Heating: { type: String },
    Air_Condition: { type: String },
    Fireplace: { type: String },
    Elevator: { type: String },
    Ventilation: { type: String },
    Intercom: { type: String },
    WindowType: { type: String },
    CableTV: { type: String },
    WiFi: { type: String }
  },
  What_nearby: {
    School: { type: String },
    Hospital: { type: String },
    Phamacy: { type: String },
    University: { type: String },
    Metro_station: { type: String },
    Grocery_center: { type: String },
    Gym_wellness: { type: String },
    Market: { type: String },
    River: { type: String },
  },
  availability: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
});
