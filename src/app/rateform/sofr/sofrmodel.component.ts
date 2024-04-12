export interface Sofr {
   
    description:string , // Ensure this field is correctly populated before sending the request
    indexNumber: number,
    spread: number,
    floor:number,
    rateId: number,
    isa:number,
    term: number
    }