import axios from "axios";

const api = axios.create({
    timeout: 30000,
});

api.interceptors.request.use((conf) => {
    conf.baseURL = "https://demo.legendtrading.com/api/v1";
    return conf;
});

const _postLogin = async () => {
    const resp = await api.post("/login", {
        email: "jiyaoapp+demo1@gmail.com",
        environment: "otcsb",
        exchangeName: "Demo",
    });
    return resp.data;
};

const _getSign = async (token: String) => {
    const resp = await api.get("/sign", {
        headers: {
            Authorization: "Bearer " + token,
        }
    });
    return resp.data;
};

export const getSignFromExchange = async () => {
    const resp = await _postLogin();
    const sign = await _getSign(resp.data.token);
    return sign;
};
