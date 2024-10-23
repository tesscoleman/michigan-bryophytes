// Module for GBIF API requests

import axios from 'axios';

export { fetchGbifOccurrences };

const usageKey = 35; // Bryophyta taxon/usage key
const countryCode = 'US'; // Bryophytes in US
const basisOfRecord = 'PRESERVED_SPECIMEN'; // Preserved specimen only/ no fossil records
const taxonomicStatus = 'ACCEPTED'; // Accepted occurrences
const hasCoordinate = 'true'; // Limits to records with coordinate values

const limit = 300;
//const offset = 300; //  Move the window of results up by 300, page through API results up to max

// https://api.gbif.org/v1/occurrence/search?taxonomicStatus=ACCEPTED&basisOfRecord=PRESERVED_SPECIMEN&country=US&hasCoordinate=true&taxonKey=35

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


async function fetchGbifOccurrences(offset = 0, occurrences = []) {
    const url = `https://api.gbif.org/v1/occurrence/search?taxonomicStatus=${taxonomicStatus}&basisOfRecord=${basisOfRecord}&country=${countryCode}&hasCoordinate=${hasCoordinate}&taxonKey=${usageKey}&limit=${limit}&offset=${offset}`;

    // if (offset >= 90000) {
    //     console.log('Reached maximum offset limit. Stopping fetch.');
    //     return occurrences; // Stop fetching
    // }
    try {
        const result = await axios.get(url);
        const data = result.data.results;

        if (data.length > 0) { 
            occurrences.push(...data);


            // // We've reached the end if the data is less than the limit
            // if (data.length < limit) {
            //     return occurrences; // No more data to fetch
            // }

            // return fetchOccurrences(offset + limit, occurrences);
            return occurrences;
        } else {
                return occurrences;
        }

    } catch (e) {
        console.error('Error fetching data from gbif API: ', e);
        throw e;
    }
}



// Call the function and log the results
// fetchGbifOccurrences()
//     .then(occurrences => {

//         //console.log(occurrences); // Log the occurrences if needed
//         console.log(`Fetched ${occurrences.length} occurrences.`);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });