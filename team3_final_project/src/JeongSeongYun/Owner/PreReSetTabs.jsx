import {useState} from "react";
import PreReSet from "../../KimSangMin/PreReSet.jsx";
import PreTimeSet from "../../KimSangMin/PreTimeSet.jsx";
import PreFunction from "../../KimSangMin/PreFunction.jsx";
import PreTime from "../../KimSangMin/PreTime.jsx";

const PreReSetTabs = () => {
    const [activeTab, setActiveTab] = useState("info");
    const [subTab, setSubTab] = useState("view");

    const renderTabs = () => {
        switch (activeTab) {
            case "info":
                return <PreReSet/>;
            case "time":
                return subTab === "view" ? (
                    <PreTimeSet onEditClick={() => setSubTab("edit")} />
                ) : (
                    <PreTime onClose={() => setSubTab("view")} />
                );
            case "func":
                return <PreFunction/>;
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
            }} className={'container'}
        >
            {/* 상단 탭 */}
            <div style={{display: "flex"}}>
                {[
                    {key: "info", label: "가게정보"},
                    {key: "time", label: "운영정보"},
                    {key: "func", label: "부가기능"},
                ].map((tab) => (
                    <div
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            cursor: "pointer",
                            padding: "10px 20px",
                            fontWeight: activeTab === tab.key ? "bold" : "normal",
                            borderBottom: activeTab === tab.key ? "2px solid #007bff" : "2px solid transparent",
                            color: activeTab === tab.key ? "#007bff" : "black",
                            transition: "border-bottom 0.3s ease",
                        }}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            <br/>

            {/* 아래에 탭별 내용 표시 */}
            {renderTabs()}
        </div>
    );

}

export default PreReSetTabs;