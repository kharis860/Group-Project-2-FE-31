import axios from "axios";
export const FETCH = "FETCH";
export const SENDDATA = "SENDDATA";
export const SENDDATAOK = "SENDDATAOK";

export function fetch() {
  return {
    type: FETCH,
  };
}

export function sendDataOk(data) {
  return {
    type: SENDDATAOK,
    payload: data,
  };
}

export function sendData() {
  return async (dispatch) => {
    dispatch(fetch());

    const dataPasien = await axios.get("https://groupproject2-production.up.railway.app/konsultasi");
    // const pick = await axios.get("https://6350e03cdfe45bbd55b074ed.mockapi.io/medTechAPI/pasien/3");
    console.log(dataPasien.data.data);
    // console.log(pick.data);
    dispatch(sendDataOk(dataPasien.data.data));
  };
}
