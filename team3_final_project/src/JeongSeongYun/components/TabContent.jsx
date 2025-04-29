import TabContentUi from "./TabContentUi.jsx";

const tabData = {
    '맞춤 추천': {
        title: '맞춤형 추천',
        description: '우리 동네의 인기 맛집을 추천해드려요!',
        storeName: '블랙업 커피 서면점',
    },
    '찜한 맛집': {
        title: '찜한 맛집',
        description: '내가 찜한 맛집 리스트예요!',
        storeName: '양산 대게찜',
    },
    '리뷰 맛집': {
        title: '리뷰 Pick!',
        description: '리뷰 점수가 높은 인기 맛집이에요!',
        storeName: '부산 명란파스타',
    },
    '최신 맛집': {
        title: '최근 본 맛집',
        description: '최근에 둘러본 맛집이에요!',
        storeName: '센텀 고기집',
    },
};

function TabContent({ activeTab }) {
    const tabProps = tabData[activeTab];

    // 없는 탭이면 null 리턴
    if (!tabProps) return null;

    // 오브젝트 통째로 넘기기
    return <TabContentUi {...tabProps} />;
}

export default TabContent;
