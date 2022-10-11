async function callApi(url) {
    let response = await fetch(url);
    if (response.status == 404) {
        return null;
    }
    let data = await response.json();
    return data;
}
async function randomWord(length) {
    let api = "https://random-word-api.herokuapp.com/word?length=" + length;
    return await callApi(api);
}
async function wordDefinition(word) {
    let api = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    return await callApi(api);
}

async function fetchWordAndDefinition(length) {
    // randomWord(length).then((word) => {
    //   wordDefinition(word)
    //     .then((data) => {
    //       if (!Array.isArray(data)) {
    //         throw new Error("No response");
    //       } else return data[0];
    //     })
    //     .catch((err) => {
    //       fetchWordAndDefinition(length);
    //     });
    // });
    for (let i = 0; i < 10; i++) {
        let word = await randomWord(length);

        let data = await wordDefinition(word);
        if (data) {
            return data;
        }
        console.log("retry...");
    }
    return null;
}
