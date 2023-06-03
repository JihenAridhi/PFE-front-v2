import {Autorisation} from "./Autorisation";
import {Theme} from "./Theme";

export class Person
{
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  profession?: string
  team?: string
  interest?: string
  photo?: string
  status?: boolean
  coAuthor?: boolean
  phone?: string
  bio?: string
  researchGate?: string
  orcid?: string
  scholar?: string
  linkedin?: string
  dblp?: string
  autorisations?: Autorisation[]
  themes?: Theme[]
}
