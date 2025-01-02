import { UrlWithStringQuery } from "url";

export interface Student{
    _id?: string,
    userName: string,
    sid?: string,
    name: string,
    department: string,
    grade: string,
    class:string,
    email: string,
    absences?: number|undefined
}