const promptGPT = async (prompt) => {

    try {
        const res = await fetch("http://127.0.0.1:3001/openai/generate/report", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({prompt}),
        });
        const data = await res.json();
       
        return { data };
    } catch (err) {
        console.log(err);
        return { error: "Error fetching data from OpenAI API"};
    }

}


export default promptGPT;