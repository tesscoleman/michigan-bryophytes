import { ObjectId } from "mongodb"

// interface SpeciesAPI {
//     api_id: number,
//     family: string,
//     genus: string,
//     species: string,
//     order: string,
//     speciesKey: number,
//     class: string,
//     phylum: string,
//     numberOfOccurrences: number,
//     scientificName: string,
//     taxonKey: number,
//     acceptedTaxonKey: number,
//     commonName: string,
//     taxonomicStatus: string
// }

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