import mongoose from "mongoose";

const speciesSchema = mongoose.Schema(
  {
    species: {
      type: String,
      required: false,
      default: "",
    },
    genus: {
      type: String,
      required: true,
      default: "",
    },
    family: {
      type: String,
      required: false,
    },
    order: {
      type: String,
      required: false,
    },
    class: {
      type: String,
      required: false,
    },
    phylum: {
      type: String,
      required: true,
    },
    speciesKey: {
      type: Number,
      required: false,
    },
    genusKey: {
      type: Number,
      required: true,
    },
    scientificName: {
      type: String,
      required: false,
    },
    taxonRank: {
      type: String,
      required: false,
    },
    taxonomicStatus: {
      type: String,
      required: true,
    },
    numberOfOccurrences: {
      type: Number,
      required: true,
    },
    acceptedTaxonKey: {
      type: Number,
      required: true
    },
    taxonKey: {
      type: Number,
      required: true
    },
    commonName: {
      type: String,
      required: false,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Species", speciesSchema);

export default model;
