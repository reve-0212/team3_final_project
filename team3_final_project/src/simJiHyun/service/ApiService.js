import axios from "axios";

// axios를 사용하는 부분을 모두 자바스크립트 모듈로 따로 만들어 놓고 사용

// 회원 가입
// 매개변수 memberDTO는 해당 함수를 호출 시 매개변수로 object 타입을 사용함
const apiSignup = (memberDTO) => {
  // axios로 가입할 회원 정보를 전달함
  axios.post(`http://localhost:8080/api/auth/signup`, memberDTO, {
    // headers 의 'Content-Type': 'application/json' 은 axios 가 자동으로 설정, 생략 가능
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      alert('회원 가입 완료');
      console.log(res);
      window.location.href = '/user/login';
    })
    .catch(err => {
      alert(`회원 가입 중 오류가 발생했습니다.\n${err}`);
    });
}

// 로그인
const apiLogin = async (userId, userPass) => {
  // axios 로 사용자 id/pw를 전달
  return axios.get(`http://localhost:8080/api/auth/login`, {
    params: {
      userId: userId,
      userPass: userPass
    }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      // 서버에서 받아온 데이터 중 엑세스 토큰은 로컬 스토리지에 저장
      // 로컬 스토리지는 웹 브라우저를 종료해도 데이터가 계속 남아있음
      localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
      // 서버에서 받아온 데이터 중 리프레시 토큰은 세션 스토리지에 저장
      // 세션 스토리지는 웹 브라우저를 완전히 종료하거나 세션이 만료되면 데이터가 삭제됨
      // 리프레시 토큰은 엑세스 토큰을 발급받기 위한 중요한 정보이므로 세션 스토리지에 저장 후 자동 삭제될 수 있도록 함
      sessionStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
      console.log(res.data)
      return res.data
      // 현재 파일은 JSX 문법을 사용하지 않는 순수 자바스크립트이므로 UseNavigate 훅을 사용하지 않음
      // window.location.href = '/';
    })
    .catch(err => {
      alert(`로그인 중 오류가 발생했습니다.\n${err}`);
    });
}

// 로그아웃 시 웹 브라우저에 저장된 모든 토큰 정보를 삭제함
const logout = () => {
  localStorage.setItem("ACCESS_TOKEN", null);
  localStorage.removeItem("ACCESS_TOKEN");
  sessionStorage.setItem("REFRESH_TOKEN", null);
  sessionStorage.removeItem("REFRESH_TOKEN");

  // window.location.href = '/';
}

// 글 목록 페이지
const apiBoardList = () => {
  axios.get(`/api/board`)
    .then(res => {
      alert(`게시물 목록 페이지에 접속\n${res.data}`);
    })
    .catch(err => {
      alert(`게시물 목록 페이지에 접속 중 오류가 발생했습니다.\n${err}`);
    });
}

// 글쓰기 페이지
const apiBoardWrite = () => {
  axios.post(`/api/board/`, null, {
    // 사용자 인증 권한이 필요한 axios 접속 부분에
    // 'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}` 를 사용하여 토큰을 전달함
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
  })
    .then(res => {
      alert(`글쓰기 페이지에 접속\n${res.data}`);
    })
    .catch(async err => {

      // 엑세스 토큰 만료로 인하여 접근 권한이 없을 경우 세션 스토리지에 리프레시 토큰이 있는지 확인
      if (sessionStorage.getItem('REFRESH_TOKEN') != null) {
        // 리프레시 토큰이 있을 경우 서버에 리프레시 토큰을 전달하여 새로운 엑세스 토큰을 발급 받아옴
        const token = await apiRefreshToken(sessionStorage.getItem('REFRESH_TOKEN'));
        // 새로 발급 받은 엑세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("ACCESS_TOKEN", token.data.accessToken);
        // 현재 명령을 다시 실행
        apiBoardWrite();
      } else {
        // 리프레시 토큰이 없으면 그대로 오류 출력
        alert(`글쓰기 페이지에 중 오류가 발생했습니다.\n${err}`);
      }
    });
}

const apiBoardEdit = boardIdx => {
  axios.put(`/api/board/${boardIdx}`, null, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
  })
    .then(res => {
      alert(`글수정 페이지에 접속\n${res.data}`);
    })
    .catch(async err => {

      if (sessionStorage.getItem('REFRESH_TOKEN') != null) {
        const token = await apiRefreshToken(sessionStorage.getItem('REFRESH_TOKEN'));
        localStorage.setItem("ACCESS_TOKEN", token.data.accessToken);
        apiBoardEdit(boardIdx);
      } else {
        alert(`글수정 페이지에 중 오류가 발생했습니다.\n${err}`);
      }
    });
}

const apiBoardDetail = boardIdx => {
  axios.get(`/api/board/${boardIdx}`, {
    params: {
      boardIdx: boardIdx
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    }
  })
    .then(res => {
      alert(`게시글 상세 페이지에 접속\n${res.data}`);
    })
    .catch(async err => {

      if (sessionStorage.getItem('REFRESH_TOKEN') != null) {
        const token = await apiRefreshToken(sessionStorage.getItem('REFRESH_TOKEN'));
        localStorage.setItem("ACCESS_TOKEN", token.data.accessToken);
        apiBoardDetail(boardIdx);
      } else {
        alert(`게시글 상세 페이지에 접속 중 오류가 발생했습니다.\n${err}`);
      }
    });
}

// 리프레시 토큰을 사용하여 엑세스 토큰을 다시 발급 받음
const apiRefreshToken = async () => {
  try {
    const res = await axios.post(`/api/auth/refresh`, null, {
      params: {
        // 세션 스토리지에 저장된 리프레시 토큰을 가져와서 서버로 전송
        refreshToken: sessionStorage.getItem('REFRESH_TOKEN')
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return res;
  } catch (err) {
    return err;
  }
}

// 모듈로 만들어진 함수들을 외부에서 사용할 수 있도록 export
export {logout, apiSignup, apiLogin, apiBoardList, apiBoardWrite, apiBoardDetail, apiBoardEdit};