import axios from "axios";

<<<<<<< HEAD
const baseURL = "http://192.168.100.99:5000/api";
// Paula's Macbook Air is 192.168.100.99
=======
const baseURL = "http://192.168.100.140:5000/api";
// http://192.168.100.140:5000/api   = dougs laptop

>>>>>>> 7767ec1f3ee703fdbc092929bff1eb49f4aee414
export const getSessions = signedInUser => {
  return axios.get(`${baseURL}/${signedInUser}`).then(({ data: { data } }) => {
    // console.log(data);
    return data.sessions;
  });
};

export const getSingleSession = (signedInUser, sessionName) => {
  // console.log(
  //   `making api request for ${baseURL}/${signedInUser}/${sessionName}`
  // );
  return axios
    .get(`${baseURL}/${signedInUser}/${sessionName}`)
    .then(({ data }) => {
      // console.log(data.sessions[0]);
      return data.sessions[0];
    });
};

export const postNewUser = username => {
  // console.log("attemping post w");
  return axios.post(`${baseURL}`, { user_name: username }).then(({ data }) => {
    // console.log(data);
    return data;
  });
};

export const postNewSession = (signedInUser, session_name, questions) => {
  // console.log(session_name, questions);
  return axios
    .post(`${baseURL}/${signedInUser}`, { session_name, questions })
    .then(({ data }) => {
      return data;
    });
};
