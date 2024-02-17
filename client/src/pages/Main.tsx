import Grid from "../components/SpeciesGrid/Grid";
import Card from "../components/SpeciesCard/Card";
import FilterBox from "../components/FilterBox";
import SpeciesCounter from "../components/SpeciesCounter";
import { useEffect, useState } from "react";
import SpeciesPage from "./SpeciesInfoPage/SpeciesPage";
import SpeciesAPI from "../interfaces/SpeciesAPI";
import Species from "../interfaces/Species";
import Occurrence from "../interfaces/Occurrence";
import { DotLoader } from "react-spinners";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";
import axios from "axios";

export default function Home() {
  const defaultSpecies: Species = {
    name: "name",
    phylum: "Bryophyta",
    className: "class name",
    order: "order name",
    family: "family name",
    genus: "genus name",
    scientificName: "scientific name",
    taxonKey: 0,
    acceptedTaxonKey: 0,
    commonName: "common name",
    taxonomicStatus: "species",
    habitat: [{}],
    appearance: [{}],
    roundedGRank: "",
  };

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

  let defaultOccurrences: Occurrence[] = [
    {
      decimalLatitude: 25,
      decimalLongitude: 25,
      stateProvince: "Michigan",
      occurrenceID: "32142413ffdsf",
      recordNumber: "fsdjfsdfs",
      scientificName: "scientificname",
      datasetKey: "fsdfsdkf",
      acceptedTaxonKey: 3123213,
    },
  ];

  interface SpeciesObj {
    error?: boolean;
    total?: number;
    page?: number;
    limit?: number;
    classOptions?: [];
    taxonomicStatus?: [];
  }

  const [species, setSpecies] = useState<Species[] | null>(null); // all species after mapping fetched data
  const [obj, setObj] = useState<SpeciesObj>({}); // rest of fetched data (total, page, sort, etc.)
  const [count, setCount] = useState(0); // data.total, total number of species/ docs returned from fetch
  // const [occurrences, setOccurrences] = useState<Occurrence[] | null>(null);

  // Selected species' states:
  const [selectedSpecies, setSelectedSpecies] = useState(defaultSpecies); //species object: selected card's species information
  const [selectedSpeciesOccurrences, setSelectedSpeciesOccurrences] =
    useState(defaultOccurrences); //list of occurrence objects: selected species' occurrences (with coordinates and data)

  const [isCardActive, setisCardActive] = useState(false); //boolean: is species page active?
  const [isLoading, setIsLoading] = useState(false); //boolean: state used to display spinner

  // Filtering/ Sorting / Pagination states:
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState({ sort: "scientificName", order: "asc" });
  const [filterClass, setFilterClass] = useState("");
  const [page, setPage] = useState(1);
  const [occurrenceMin, setOccurrenceMin] = useState(1);

  // Sizing of species page:
  const sizingClass = isCardActive ? "half-display" : "full-display";
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [sort, filterClass, searchQuery, occurrenceMin]);

  useEffect(() => {
    setIsLoading(true);
    fetchNewPage();
  }, [page]);

  const fetchNewPage = async () => {
    try {
      const url =
        backend_url +
        `/moss?page=${page}&sort=${sort.sort},${sort.order}&className=${filterClass}&search=${searchQuery}&occurrenceMin=${occurrenceMin}`;
      const response = await axios.get(url);
      // const data = await response.json();
      setCount(response.data.total);
      setObj(response.data);
      mapSpeciesAPI(response.data.speciesResult);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      // const synonym = includeSynonym ? "all" : "ACCEPTED";
      const url =
        backend_url +
        `/moss?page=1&sort=${sort.sort},${sort.order}&className=${filterClass}&search=${searchQuery}&occurrenceMin=${occurrenceMin}`;
      setPage(1);
      const response = await axios.get(url);
      const data = await response.data;
      setCount(data.total);
      setObj(data);
      mapSpeciesAPI(data.speciesResult);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterClick = (className: string) => {
    const classes = filterClass.split(",");
    if (classes.includes(className)) {
      let index = classes.indexOf(className);
      classes.splice(index);
      setFilterClass(classes.toString());
    } else {
      setFilterClass(filterClass + "," + className);
    }
    setPage(1);
  };

  const handleSort = (sortValue: { sort: string; order: string }) => {
    setSort(sortValue);
  };

  const fetchOccurrenceData = async (item: Species) => {
    try {
      const response = await axios.get(
        backend_url + `/occurrences?search=${item.scientificName}`
      );
      const json = await response.data;
      setSelectedSpeciesOccurrences(json.occurrenceResult as Occurrence[]);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const onClickCard = async (item: Species) => {
    try {
      setSelectedSpecies(item);
      fetchOccurrenceData(item);
      !isCardActive && setisCardActive(!isCardActive);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    setSearchQuery(e.target.value);
  };

  function mapSpeciesAPI(data: []) {
    const array = data.map((item: SpeciesAPI) => {
      return {
        name: item.scientificName,
        scientificName: item.scientificName,
        commonName: item.primaryCommonName,
        phylum: item.speciesGlobal.phylum,
        className: item.speciesGlobal.taxclass,
        order: item.speciesGlobal.taxorder,
        family: item.speciesGlobal.family,
        genus: item.speciesGlobal.genus,
        occurrences: item.occurrenceCount ? item.occurrenceCount : 0,
        habitat: item.habitat,
        appearance: item.appearance,
        thumbnail: item.images.some((e) => e.thumbnail)
          ? item.images.find((e) => e.thumbnail)
          : item.images[0] || "",
        images: item.images,
        roundedGRank: item.roundedGRank,
      };
    });
    setSpecies(array);
  }

  return (
    <>
      <main className="main-page">
        {isCardActive && (
          <div className="species-info-container">
            <SpeciesPage
              occurrences={selectedSpeciesOccurrences}
              conservation={selectedSpecies.roundedGRank}
              isCardActive={isCardActive}
              classification={selectedSpecies}
              onClick={() => setisCardActive(!isCardActive)}
            />
          </div>
        )}
        <main className={sizingClass + " species-main-page"}>

        <div className="top-wrapper">
              <div className="top-flex">
                <div className="filters-div">
                  <FilterBox
                    onClick={() => {
                      setFilterClass("");
                      setPage(1);
                    }}
                    currentClasses={filterClass}
                    name="All"
                  />

                  {classes.map((className) => (
                    <FilterBox
                      key={className}
                      currentClasses={filterClass}
                      onClick={() => handleFilterClick(className)}
                      name={className}
                    />
                  ))}
                  <SearchBar
                    searchQuery={searchQuery}
                    handleSubmit={handleSubmit}
                  />
                  <div className="sort-div">
                    <Sort sort={sort} setSort={handleSort} />
                    <label>Include Zero Occurrence</label>
                    <input
                      type="checkbox"
                      checked={occurrenceMin === 0}
                      onChange={() =>
                        setOccurrenceMin(occurrenceMin === 0 ? 1 : 0)
                      }
                    />
                  </div>
                </div>
                <SpeciesCounter count={count} />
              </div>
            </div>
          <div className="contents">


            {isLoading ? (
              <div className="dot-loader">
                <DotLoader color="rgb(var(--primary-header-rgb), 0.8)"></DotLoader>
              </div>
            ) : (
              <Grid>
                {species?.map((item) => (
                  <Card
                    onClick={() => {
                      onClickCard(item);
                    }}
                    key={item.taxonKey}
                    name={item.name}
                    classification={item}
                    count={item.occurrences || 0}
                  />
                ))}
              </Grid>
            )}

            {!isLoading && (
              <Pagination
                page={page}
                total={obj.total ? obj.total : 0}
                limit={obj.limit ? obj.limit : 0}
                setPage={(page) => setPage(page)}
              />
            )}
          </div>
        </main>
      </main>
    </>
  );
}
