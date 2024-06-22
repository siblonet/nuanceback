import { Document } from 'mongoose';
import { TriumphUser } from 'src/triumph/users/person.entity';

export interface House extends Document {
  _id?: string;
  person: TriumphUser;
  image: [
    {
      ima: string
    }
  ];
  categorie: string;
  type: string;
  ville: string;
  address: string;
  prix: number;
  meusure: string;
  description: string;
  Property_details: {
    meusure: string;
    Bedrooms: number;
    Bathrooms: number;
    Floor: string;
    Additional_Space: string;
    Furnishing: string;
    CeilingHeight: string;
    ConstructionYear: string;
    Renovation: string
  };

  Outdoor_features: {
    Garage: string;
    Garden: string;
    SwimmingPool: string;
    Security: string;
    Parking: string;
    DisabledAccess: string;
    Fence: string;
    Pet_Friendly: string
  };
  Floorplans: [
    {
      ima: string
    }
  ];
  Property_utility: {
    Heating: string;
    Air_Condition: string;
    Fireplace: string;
    Elevator: string;
    Ventilation: string;
    Intercom: string;
    WindowType: string;
    CableTV: string;
    WiFi: string
  };
  What_nearby: {
    School: string;
    Hospital: string;
    Phamacy: string;
    University: string;
    Metro_station: string;
    Grocery_center: string;
    Gym_wellness: string;
    Market: string;
    River: string;
  };
  availability: boolean;
  created?: Date;
};
