import mongoose from "mongoose";

const speciesSchema = mongoose.Schema(
  {
    scientificName: {
        type: String,
        required: true
    },
    primaryCommonName: {
        type: String,
        required: false
    },
    roundedGRank: {
        type: String,
        required: true
    },
    lastModified: {
        type: String,
        required: true
    },
    speciesGlobal: {
        type: Object,
        required: true
    },
    gRank: {
        type: String,
        required: true
    },
    numberOfOccurrences: {
        type: Number,
        required: true,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Michigan Moss", speciesSchema);

export default model;
