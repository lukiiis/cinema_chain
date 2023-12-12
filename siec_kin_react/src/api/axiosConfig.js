import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8090/api/v1',
    headers: {"ngrok-skip-browser-warning": "true"}
});