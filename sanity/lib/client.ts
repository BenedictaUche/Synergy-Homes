import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
/*************  ✨ Windsurf Command ⭐  *************/
/*******  5fe85189-8c59-4a0c-bcd5-789cd8eef145  *******//**

 * Migrate existing content to Sanity.
 *

 * This function reads existing data from somewhere, e.g. a database or a file,

 * and writes it to Sanity.
 *

 * You will need to implement the `readExistingData` and `writeDataToSanity` functions
 * to make this work.
 */
