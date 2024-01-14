interface Species {
    phylum?: string,
    className?: string,
    order?: string,
    family?: string,
    genus?: string,
    name: string,
    id?: number,
    occurrences?: number,
    scientificName: string,
    taxonKey?: number,
    acceptedTaxonKey?: number,
    commonName: string,
    taxonomicStatus?: string,
    habitat: [{type?: string, description?: string}],
    appearance: [{type?: string, description?: string}],
    images?: [{}],
    thumbnail?: {source?: string, credit?: any},
    roundedGRank : string
}

export default Species;