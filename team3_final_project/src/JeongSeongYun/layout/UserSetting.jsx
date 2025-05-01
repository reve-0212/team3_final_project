import React, { useState, useRef } from "react";
import useUserStore from "../../stores/useUserStore.jsx";
import { useNavigate } from "react-router-dom";

function UserSetting() {
    const { clearUser } = useUserStore();
    const Nv = useNavigate();

    const [editField, setEditField] = useState(null);
    const [formData, setFormData] = useState({
        nickname: "",
        email: "",
        phone: "",
        password: "",
    });

    const inputRefs = {
        nickname: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        password: useRef(null),
    };

    const handleLogout = () => {
        const confirmed = window.confirm("로그아웃 하시겠습니까?");
        if (confirmed) {
            clearUser();
            Nv("/user");
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const toggleEdit = (field) => {
        if (editField === field) {
            // api 호출부분
            console.log(`${field} 저장됨:`, formData[field]);
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
                    style={{ backgroundColor: "transparent" }}
                    value={formData[id]}
                    onChange={handleInputChange}
                    readOnly={editField !== id}
                />
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm ms-3"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={() => toggleEdit(id)}
                >
                    {editField === id ? "저장" : "수정"}
                </button>
            </div>
        </div>
    );

    return (
        <div className={"container py-4"}>
            {renderInputRow("닉네임", "nickname")}
            {renderInputRow("이메일", "email", "email")}
            {renderInputRow("휴대폰번호", "phone", "tel")}
            {renderInputRow("비밀번호", "password", "password")}

            <div className={"mt-5"}>
                <button
                    type="button"
                    className="btn btn-warning w-100 py-3 fw-bold"
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default UserSetting;
