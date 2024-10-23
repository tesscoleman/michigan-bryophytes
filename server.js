import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import csvtojson from "csvtojson";
import "dotenv/config";
import occurenceModel from "./models/occurenceModel.js";
import speciesModel from "./models/speciesModel.js";
import gbifModel from "./models/gbifModel.js";
import nsModel from "./models/nsMIMossModel.js";

import { fetchGbifOccurrences } from "./gbifService.js";

const app = express();

const backend_url = process.env.BACKEND_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", backend_url);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});
const port = process.env.Port || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // Log when listen success
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
      .find({
        scientificName: { $regex: search, $options: "i" },
        occurrenceCount: { $gte: occurrenceMin },
      })
      .where("speciesGlobal.taxclass")
      .in([...className])
      .sort(sortBy)
      .sort({ scientificName: 1 })
      .skip(page * limit)
      .limit(limit);

    const total = await speciesModel.countDocuments({
      "speciesGlobal.taxclass": { $in: [...className] },
      scientificName: { $regex: search, $options: "i" },
      occurrenceCount: { $gte: occurrenceMin },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      classOptions: classes,
      speciesResult,
      sortBy,
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

//GET OCCURRENCES FROM DATABASE BY ID
//NOT IN USE - USING GBIF API FOR OCCURRENCES

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

// app.get("/occurrences", async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.search) {
//       filter.species = req.query.search;
//     }
//     const occurrenceResult = await occurenceModel
//       .find(filter)
//       .sort({ species: 1 });
//     const data = await fetchGbifOccurrences(0, []);
//     res.json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to fetch moss occurrences from GBIF API" });
//   }
// });

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
