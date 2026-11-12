import {it,expect} from "vitest";
import {matchesMediaType,limitedBody} from "./mediaValidation";
it("rejects scripts disguised as images",()=>expect(matchesMediaType(new TextEncoder().encode("<script>alert(1)</script>"),"image/png")).toBe(false));
it("recognizes PNG signatures",()=>expect(matchesMediaType(new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,0]),"image/png")).toBe(true));
it("enforces streaming body limits",async()=>{await expect(limitedBody(new Request("https://local.test",{method:"POST",body:"12345"}),4)).rejects.toThrow("too_large");});
