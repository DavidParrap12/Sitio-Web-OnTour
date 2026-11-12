import {describe,it,expect} from "vitest";
import {applicableTariffs,validDate,fromPrice,type Tariff} from "./pricing";
const rate:Tariff={label:"Standard",amount:"120",currency:"USD",notes:"",audience:"public",valid_from:"2026-12-01",valid_until:"2026-12-31",min_guests:2,max_guests:8,occupancy:"double",weekdays:[0,1,2,3,4,5,6]};
describe("tariff visibility",()=>{
 it("includes exact validity and group boundaries",()=>{expect(applicableTariffs([rate],"2026-12-01",2)).toHaveLength(1);expect(applicableTariffs([rate],"2026-12-31",8)).toHaveLength(1);});
 it("excludes private, expired and mismatched groups",()=>{expect(applicableTariffs([rate,{...rate,audience:"agency"}],"2027-01-01",2)).toEqual([]);expect(applicableTariffs([rate],"2026-12-01",9)).toEqual([]);expect(applicableTariffs([{...rate,audience:"internal"}],"2026-12-01",2)).toEqual([]);});
 it("rejects impossible dates",()=>{expect(validDate("2026-02-30")).toBe(false);expect(validDate("2028-02-29")).toBe(true);});
 it("returns no invented price",()=>expect(fromPrice([],"es")).toBe(""));
});
