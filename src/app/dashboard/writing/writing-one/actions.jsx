
import axios from "axios";


export async function getQuestion () {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}