import {defineType, type SchemaTypeDefinition} from 'sanity'
import {landParcel} from './landParcel'
import {investment} from './investment'
import {teamMember} from './teamMember'
import {service} from './service'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [landParcel, investment, teamMember, service],
}
