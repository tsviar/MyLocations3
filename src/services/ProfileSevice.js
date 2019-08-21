//const data_url = "https://api.myjson.com/bins/yt3d9";
//const data_url = "https://api.myjson.com/bins/wzf3c";

const fetchAllProfiles1 = data_url => {
  console.log(`in Api fetchAllProfiles1`);

  console.log(`Api fetchAllProfiles1 calling fetch`);
  fetch(data_url)
    .then(res => {
      console.log(`Api fetchAllProfiles1 after fetch`);
      if (res.ok) {
        console.log(`Api fetchAllProfiles1 json OK`);
        console.log(res);
        // here we return a promise with json format
        return res.json();
      }
      throw new Error(
        `Api fetchAllProfiles1 Network Fetch response was not ok ${
          res.error.message
        }`
      );
    })
    // .then(data => {
    //   console.log(`2nd then fetchDataFromNetwork dataK`);
    //   console.table(data);
    //   return data;
    // })
    .catch(error => {
      console.error(`Api fetchAllProfiles1 failed: ${error.message}`);
      throw new Error(`Api fetchAllProfiles1 failed: ${error.message}`);
    });

  // Note: it's important to handle errors here
  // instead of a catch() block so that we don't swallow
  // exceptions from actual bugs in components
};

// a general promises API simulating network communication
const fetchAllProfiles2 = async data_url => {
  try {
    const res = await fetch(data_url);
    console.log(`Api fetchAllProfiles2 after fetch res`);
    console.log(res);

    console.log(`Api fetchAllProfiles2 BEFORE fetch json`);
    const json = await res.json();
    console.log(`Api fetchAllProfiles2 AFTER fetch json`);

    if (json) {
      console.log(`Api fetchAllProfiles2 after fetch json`);
      console.table(json);
      return json;
    } else {
      throw new Error(
        `Api fetchAllProfiles2 Network Fetch response was not ok : ${
          res.error.message
        }`
      );
    }
  } catch (error) {
    console.error(`Api fetchDataFromNetwork fetch op failed: ${error.message}`);
    throw new Error(
      `Api fetchDataFromNetwork fetch op failed: ${error.message}`
    );
  }
};

//export async function fetchAllProfiles3() {
async function fetchAllProfiles3(data_url) {
  const response = await fetch(data_url);
  if (!response.ok)
    throw new Error(`Api fetchAllProfiles3 failed: ${response.error.message}`);
  return await response.json();
}

export { fetchAllProfiles1, fetchAllProfiles2, fetchAllProfiles3 };
