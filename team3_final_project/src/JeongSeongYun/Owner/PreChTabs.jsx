import {useState} from "react";
import PreCh from "../../KimSangMin/PreCh.jsx";
import PreDayCh from "../../KimSangMin/PreDayCh.jsx";

const PreReSetTabs = () => {
    const [activeTab, setActiveTab] = useState("Ch");

    const renderTabs = () => {
        switch (activeTab) {
            case "Ch":
                return <PreCh/>
            case "dayCh":
                return <PreDayCh/>
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
                // maxWidth: "1000px",
                minHeight: "100vh",
            }} className={'container'}
        >
            {/* 상단 탭 */}
            <div style={{display: "flex"}}>
                {[
                    {key: "Ch", label: "매출통계"},
                    {key: "dayCh", label: "예약통계"},
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