export const MAX_MEDIA_BYTES=12*1024*1024;
export const MEDIA_EXTENSIONS:Record<string,string>={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/avif":"avif","video/mp4":"mp4","video/webm":"webm"};
export function matchesMediaType(bytes:Uint8Array,type:string){
 const ascii=(start:number,end:number)=>String.fromCharCode(...bytes.slice(start,end));
 if(bytes.length<12)return false;
 switch(type){
 case "image/jpeg":return bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
 case "image/png":return [137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b);
 case "image/webp":return ascii(0,4)==="RIFF"&&ascii(8,12)==="WEBP";
 case "image/avif":return ascii(4,8)==="ftyp"&&["avif","avis"].includes(ascii(8,12));
 case "video/mp4":return ascii(4,8)==="ftyp"&&["isom","iso2","mp41","mp42","avc1","M4V "].includes(ascii(8,12));
 case "video/webm":return [26,69,223,163].every((b,i)=>bytes[i]===b)&&ascii(0,64).includes("webm");
 default:return false;
 }
}
export async function limitedBody(request:Request,limit:number){
 if(!request.body)throw new Error("empty");
 const reader=request.body.getReader();const chunks:Uint8Array[]=[];let size=0;
 try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();throw new Error("too_large");}chunks.push(value);}}finally{reader.releaseLock();}
 const body=new Uint8Array(size);let offset=0;for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.length;}return body;
}
