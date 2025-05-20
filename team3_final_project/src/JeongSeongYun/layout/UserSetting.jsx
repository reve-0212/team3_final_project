import React, {useState, useRef} from "react";
import useUserStore from "../../stores/useUserStore.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../../api/axios.js"

function UserSetting() {
  const user = useUserStore((state) => state.user)
  const {clearUser, setUser} = useUserStore();
  const Nv = useNavigate();

  // 로그아웃 시 웹 브라우저에 저장된 모든 토큰 정보를 삭제함
  const logout = () => {
    localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.setItem("REFRESH_TOKEN", null);
    sessionStorage.removeItem("REFRESH_TOKEN");
  }

  const [editField, setEditField] = useState(null);
  // 필드가 이름, 이메일, 전화번호 정보를 다 가지고 있음
  const [formData, setFormData] = useState({
    user_id: user.userId,
    user_nick: user.userNick,
    user_email: user.userEmail,
    user_call: user.userCall,
    user_pass: ""
  });

  const inputRefs = {
    user_id: useRef(null),
    user_nick: useRef(null),
    user_email: useRef(null),
    user_call: useRef(null),
    user_pass: useRef(null)
  };

  const handleLogout = () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      logout()
      clearUser();
      Nv("/user");
    }
  };

  // prev 를 사용해서 모든 id 와 value 를 각각에 할당한다
  const handleInputChange = (e) => {
    const {id, value} = e.target;
    setFormData((prev) => ({...prev, [id]: value}));
  };

  const toggleEdit = async (field) => {
    if (editField === field) {
      try {
        if (field === "user_pass") {
          await api.put(
            `/api/auth/updatePassword`, {
              user_id: user.user_id,
              newPass: formData.user_pass
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
              }
            }
          )
          alert("비밀번호 변경 완료")
        } else {
          await api.put(
            `/api/user/updateInfo`,
            {user_id: user.user_id, field, value: formData[field],},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
              }
            }
          )
          setUser({...user, [field]: formData[field]})
          alert(`${field} 변경 완료`)
        }
      } catch (err) {
        console.log(err)
        alert(`${field} 변경 실패`)
      }
      setEditField(null);
    } else {
      setEditField(field);
      setTimeout(() => {
        inputRefs[field]?.current?.focus();
      }, 0);
    }
  };

  const renderInputRow = (label, id, type = "text") => (
    <div className="mt-5">
      <p className="fw-bold small fs-7 mb-0 pb-1">{label}</p>
      <div className="d-flex align-items-center">
        <input
          ref={inputRefs[id]}
          type={type}
          id={id}
          className={`form-control border-0 border-bottom rounded-0 shadow-none ps-0 flex-grow-1 ${editField === id ? "border-primary" : ""}`}
          style={{backgroundColor: "transparent"}}
          value={formData[id]}
          onChange={handleInputChange}
          readOnly={editField !== id}
        />
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm ms-3"
          style={{whiteSpace: "nowrap"}}
          onClick={() => toggleEdit(id)}
        >
          {editField === id ? "저장" : "수정"}
        </button>
      </div>
    </div>
  );

  return (
    <div className={"container py-4"}>
      {renderInputRow("아이디", "user_id")}
      {renderInputRow("닉네임", "user_nick")}
      {renderInputRow("이메일", "user_email", "user_email")}
      {renderInputRow("휴대폰번호", "user_call", "tel")}
      {renderInputRow("비밀번호", "user_pass", "password")}

      <div className={"mt-5"}>
        <button
          type="button"
          className="btn common-btn w-100 py-3 fw-bold"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default UserSetting;