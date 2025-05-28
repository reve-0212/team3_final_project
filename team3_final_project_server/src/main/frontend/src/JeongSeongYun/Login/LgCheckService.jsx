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
            window.location.href = '/pre/reg';
        })
        .catch(err => {
            alert(`로그인 중 오류가 발생했습니다.\n 오류 내용 : ${err}`);
        })
}


const apiRefreshToken = async () => {
    try {
        const res = await axios.post(`http://localhost:8080/pre/refresh`, {
            refreshToken: sessionStorage.getItem('REFRESH_TOKEN')
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("리프레시 토큰 리턴값 :: " + res.data);

        return res;
    } catch (err) {
        return err;
    }
}

export {OwnerLoginCheck, apiRefreshToken}