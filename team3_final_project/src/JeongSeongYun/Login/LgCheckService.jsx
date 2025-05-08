import axios from "axios";

const OwnerLoginCheck = (OwnerId, OwnerPw) => {
    axios.get(`http://localhost:8080/jsy/ownerLogin`, {
        params: {
            ownerId: OwnerId,
            ownerPw: OwnerPw
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            alert('로그인');
            localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
            sessionStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
            window.location.href = '/pre/info';
        })
        .catch(err => {
            alert(`로그인 중 오류가 발생했습니다.\n 오류 내용 : ${err}`);
        })
}

export {OwnerLoginCheck}