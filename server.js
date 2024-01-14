import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import csvtojson from "csvtojson";
import "dotenv/config";
import occurenceModel from "./models/occurenceModel.js";
import speciesModel from "./models/speciesModel.js";
import gbifModel from "./models/gbifModel.js";
import nsModel from "./models/nsMIMossModel.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Listening!"); // Log when listen success
});


// GET ALL MOSS FROM DATABASE
app.get("/moss", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 24;
    const search = req.query.search || "";
    let sort = req.query.sort || "scientificName";
    let className = req.query.className || "all";
    let occurrenceMin = req.query.occurrenceMin || 0;
    // let taxonomicStatus = req.query.taxonomicStatus || "all";

    // TODO: Save in db:
    const classes = [
      "Takakiopsida",
      "Sphagnopsida",
      "Andreaeopsida",
      "Andreaeobryopsida",
      "Oedipodiopsida",
      "Polytrichopsida",
      "Tetraphidopsida",
      "Bryopsida",
    ];

    const statuses = ["SYNONYM", "ACCEPTED"];

    className === "all"
      ? (className = [...classes])
      : (className = req.query.className.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    // taxonomicStatus === "all"
    //   ? (taxonomicStatus = [...statuses]) : (taxonomicStatus = "ACCEPTED");

    if (sort[0] === "class") {
      sort[0] = "speciesGlobal.taxclass";
    }
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1] === "asc" ? 1 : -1;
    } else {
      sortBy[sort[0]] = 1;
    }
    
    const speciesResult = await speciesModel
      .find({ scientificName: { $regex: search, $options: "i" }, occurrenceCount: { $gte: occurrenceMin } })
      .where("speciesGlobal.taxclass")
      .in([...className])
      .sort(sortBy)
      .sort({scientificName: 1})
      .skip(page * limit)
      .limit(limit);

    const total = await speciesModel.countDocuments({
      "speciesGlobal.taxclass": { $in: [...className] },
      scientificName: { $regex: search, $options: "i" },
      occurrenceCount: { $gte : occurrenceMin }
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      classOptions: classes,
      speciesResult,
      sortBy
    };

    // const species = await gbifModel
    //   .find({ taxonomicStatus: {$in:["ACCEPTED", "SYNONYM"]}, taxonRank: "SPECIES" })
    //   .sort({ numberOfOccurrences: -1 });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// FILTER MOSS BY CLASS
app.get("/moss/class/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const species = await gbifModel
      .find({ class: name, taxonomicStatus: { $in: ["ACCEPTED", "SYNONYM"] } })
      .sort({ species: 1 });
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET OCCURENCES FROM DATABASE BY ID
app.get("/occurrences", async (req, res) => {
  try {
    const filter = {};
    if (req.query.search) {
      filter.species = req.query.search;
    }
    const occurrenceResult = await occurenceModel
      .find(filter)
      .sort({ species: 1 });

    const total = await occurenceModel.countDocuments(filter);

    const response = {
      error: false,
      total,
      occurrenceResult,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET CONSERVATION STATUS FROM NATURESERVE.ORG REST API
app.get("/conservation/:species", async (req, res) => {
  const { species } = req.params;
  const data = {
    criteriaType: "species",
    textCriteria: [
      {
        paramType: "textSearch",
        searchToken: `${species}`,
        matchAgainst: "allScientificNames",
        operator: "equals",
      },
    ],
    statusCriteria: [],
    locationCriteria: [
      {
        paramType: "nation",
        nation: "US",
      },
    ],
    pagingOptions: {
      page: null,
      recordsPerPage: null,
    },
    recordSubtypeCriteria: [],
    modifiedSince: null,
    locationOptions: null,
    classificationOptions: null,
    speciesTaxonomyCriteria: [],
  };
  const customHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const uri = `https://explorer.natureserve.org/api/data/speciesSearch`;
  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: customHeaders,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

export default app;
