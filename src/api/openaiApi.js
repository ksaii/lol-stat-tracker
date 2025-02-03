const apiUrl = import.meta.env.VITE_API_URL;

const promptGPT = async (prompt) => {

    try {
        const res = await fetch(`${apiUrl}/api/openai/generate/report`, {
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