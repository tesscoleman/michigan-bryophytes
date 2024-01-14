interface Props {
  name: string;
  taxon: string;
}

const TaxonText = ({ name, taxon }: Props) => {
  return (
    <>
      <div className="taxonomy">
        {" "}
        <p>
          {name}{" "}
          <span style={{ color: "#b0b0b0", fontSize: "0.7rem" }}>
            ({taxon})
          </span>
        </p>
      </div>
    </>
  );
};

export default TaxonText;
