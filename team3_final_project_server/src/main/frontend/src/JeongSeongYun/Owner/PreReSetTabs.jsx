import {useEffect, useState} from "react";
import PreReSet from "../../KimSangMin/PreReSet.jsx";
import PreTimeSet from "../../KimSangMin/PreTimeSet.jsx";
import PreFunction from "../../KimSangMin/PreFunction.jsx";
import PreTime from "../../KimSangMin/PreTime.jsx";
import axios from "axios";

const PreReSetTabs = () => {
    const [activeTab, setActiveTab] = useState("info");
    const [subTab, setSubTab] = useState("view");



    const [resIdx, setResIdx] = useState(null);
    const token = localStorage.getItem("ACCESS_TOKEN");

    useEffect(() => {
        axios.get("http://localhost:8080/pre/resIdxByUser", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setResIdx(res.data);
            })
            .catch(() => {
                setResIdx(null);
            })
    }, [])

    const renderTabs = () => {
        switch (activeTab) {
            case "info":
                return <PreReSet />;
            case "time":
                return subTab === "view" ? (
                    <PreTimeSet onEditClick={() => setSubTab("edit")} />
                ) : (
                    <PreTime onClose={() => setSubTab("view")} />
                );
            case "func":
                return <PreFunction />;
            default:
                return null;
        }
    };


    return (
        <div
            style={{
                marginLeft: "250px",
                paddingTop: "8rem",
                paddingLeft: "1rem",
                width: "calc(100% - 200px)",
                maxWidth: "165vh",
                minHeight: "100vh",
            }}
            className={"container"}
        >
            {/* 상단 탭 */}
            <div style={{ display: "flex" }}>
                {[
                    { key: "info", label: "가게정보", disabled: false },
                    { key: "time", label: "운영정보", disabled: !resIdx },
                    { key: "func", label: "부가기능", disabled: !resIdx },
                ].map((tab) => (
                    <div
                        key={tab.key}
                        onClick={() => !tab.disabled && setActiveTab(tab.key)}
                        style={{
                            cursor: tab.disabled ? "not-allowed" : "pointer",
                            padding: "10px 20px",
                            fontWeight: activeTab === tab.key ? "bold" : "normal",
                            borderBottom:
                                activeTab === tab.key
                                    ? "2px solid #007bff"
                                    : "2px solid transparent",
                            color: tab.disabled ? "gray" : activeTab === tab.key ? "#007bff" : "black",
                            transition: "border-bottom 0.3s ease",
                            opacity: tab.disabled ? 0.5 : 1,
                        }}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            <br />

            {/* 탭 내용 */}
            {renderTabs()}
        </div>
    );
};

export default PreReSetTabs;
