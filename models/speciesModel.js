import mongoose from "mongoose";

const speciesSchema = mongoose.Schema(
  {
    scientificName: {
      type: String,
      required: true,
    },
    primaryCommonName: {
      type: String,
      required: false,
    },
    roundedGRank: {
      type: String,
      required: true,
    },
    lastModified: {
      type: String,
      required: true,
    },
    speciesGlobal: {
      type: Object,
      required: true,
    },
    gRank: {
      type: String,
      required: true,
    },
    occurrenceCount: {
      type: Number,
      required: true,
      default: 0,
    },
    habitat: {
      type: Array,
      required: true,
      default: [],
    },
    appearance: {
      type: Array,
      required: true,
      default: []
    },
    images: {
      type: Array,
      required: false,
      default: []
    }
  },
  {
    collection: "species",
    timestamps: true,
    minimize: false
  }
);

const model = mongoose.model("species", speciesSchema);

export default model;
