import mongoose from "mongoose";

const occurrenceSchema = mongoose.Schema(
  {
    datasetID: {
        type: String,
        required: false
    },
    basisOfRecord: {
        type: String,
        required: true
    },
    occurrenceStatus: {
        type: String,
        required: false
    },
    organismID: {
        type: Number,
        required: false
    },
    decimalLatitude: {
        type: Number,
        required: false,
    },
    decimalLongitude: {
        type: Number,
        required: false,
    },
    coordinateUncertaintyInMeters: {
        type: Number,
        required: false
    },
    stateProvince: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: false
    },
    recordedBy: {
        type: String,
        required: false
    },
    identifiedBy: {
        type: String,
        required: false
    },
    occurrenceID: {
        type: String,
        required: true
    },
    recordNumber: {
        type: String,
        required: false
    },
    scientificName: {
        type: String,
        required: true
    },
    verbatimScientificName: {
        type: String,
        required: false
    },
    higherClassification: {
        type: String,
        required: false
    },
    kingdom: {
        type: String,
        required: false
    },
    phylum: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: false
    },
    order: {
        type: String,
        required: false
    },
    family: {
        type: String,
        required: false
    },
    subfamily: {
        type: String,
        required: false
    },
    genus: {
        type: String,
        required: false
    },
    genericName: {
        type: String,
        required: false
    },
    subgenus: {
        type: String,
        required: false
    },
    taxonRank: {
        type: String,
        required: false
    },
    taxonomicStatus: {
        type: String,
        required: false
    },
    datasetKey: {
        type: String,
        required: true
    },
    lastInterpreted: {
        type: String,
        required: false
    },
    taxonKey: {
        type: Number,
        required: true
    },
    acceptedTaxonKey: {
        type: Number,
        required: false
    },
    genusKey: {
        type: Number,
        required: false
    },
    speciesKey: {
        type: Number,
        required: false
    },
    species: {
        type: String,
        required: false
    },
    acceptedScientificName: {
        type: String,
        required: false
    },
    georeferencedBy: {
        type: String,
        required: false
    },
    eventDate: {
        required: true,
        type: String
    },
    dataSet: {
        type: String,
    },
    rightsHolder: {
        required: false,
        type: String
    },
    publishingOrgKey: {
        type: String,
        required: false
    },
    locality: {
        type: String,
        required: false
    }

  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("occurences", occurrenceSchema);

export default model;
