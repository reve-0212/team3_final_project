import {useState} from "react";
import TabContent from "./TabContent.jsx";

function TabPage() {

    const tabs = ['맞춤 추천', '찜한 맛집', '리뷰 맛집', '최신 맛집'];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div>
            <ul className="nav nav-tabs mb-3 justify-content-center d-flex gap-5" style={{ fontSize: '0.7rem' }}>
                {tabs.map((tab, idx) => (
                    <li className="nav-item text-center" key={idx}>
                        <button
                            className={`nav-link py-2 px-3 tabsBtn ${activeTab === tab ? 'active-tab' : ''}`}
                            style={{
                                fontSize: '0.65rem',
                                background: 'none',
                                border: 'none',
                                borderBottom: activeTab === tab ? '2px solid #0d6efd' : '2px solid transparent',
                                color: activeTab === tab ? '#0d6efd' : '#6c757d',
                            }}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>


            {/* 자식에게 activeTab 전달 */}
            <TabContent activeTab={activeTab} />
        </div>
    );
}

export default TabPage