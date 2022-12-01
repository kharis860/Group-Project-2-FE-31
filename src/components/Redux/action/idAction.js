export const ADDID = "ADDID";

export function addId(idKonsul) {
  return {
    type: ADDID,
    idKonsul,
  };
}
