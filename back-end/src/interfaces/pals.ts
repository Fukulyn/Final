import { UrlWithStringQuery } from "url";

export interface pals{
    _id?: string,
    id: string,
    name: string,
    image: string,
    attribute: string,
    workCompatibility: string,
    url: UrlWithStringQuery
}