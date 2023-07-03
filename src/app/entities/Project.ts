import {Partner} from "./Partner";

export class Project
{
  id?: number
  title?: string
  type?: string
  description?: string
  photo?: string
  date?: Date;
  partners?: Partner[]
}
