import Species from "../interfaces/Species";

interface Props {
  classification: Species,
  count: number
}

export default function SpeciesItem({classification, count} : Props) {
  return (
    <>
      <p>{classification.taxonomicStatus === "SYNONYM" && "SYNONYM"}</p>
      <p>{classification.commonName && ("Common name: " + classification.commonName)}</p>
      <p>{classification.order && ("Order: "+ classification.order)}</p>
      <p>{classification.family && ("Family: "+ classification.family)}</p>
      <p>{classification.occurrences !== null && ("Occurrences: "+ count)}</p>
    </>
  );
}
