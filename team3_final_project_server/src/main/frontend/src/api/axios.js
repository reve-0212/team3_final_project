import axios from "axios";

// 현재 환경에 따라 baseURL 설정
const baseURL =
    window.location.hostname === "localhost"
        ? "http://localhost:8080"
        : "http://54.180.178.82:8080"; // 실제 Spring 서버 IP

const instance = axios.create({
    baseURL,
    withCredentials: true, // 필요 시 쿠키 등 포함
});

export default instance;

// 1. 아래처럼 import 해준다.
// import api from "../../api/axios.js"

// 2. api.get("/customRec") axios.get 을 api.get 처럼 바꾸고 http://localhost:8080 만 지워준다.