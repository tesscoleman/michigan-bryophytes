
interface SpeciesAPI {
    scientificName: string,
    primaryCommonName: string,
    roundedGRank: string,
    speciesGlobal:{
        phylum: string,
        taxclass: string,
        taxorder: string,
        family: string,
        genus: string,
    },
    occurrenceCount: number,
    habitat: [{}],
    appearance: [{}],
    images: [{source?: string, credit?: string, thumbnail?: boolean}]

}

export default SpeciesAPI