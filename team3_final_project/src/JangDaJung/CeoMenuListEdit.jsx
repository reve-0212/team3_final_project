import {useNavigate} from "react-router-dom";
import {useState} from "react";
import WaBanner from "../KimSangMin/WaBanner.jsx";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import ReBanner from "../KimSangMin/ReBanner.jsx";

// 더미
const dumiList = [
    {
        id: 1,
        name: '김치찌개',
        price: 8000,
        description: '진한 국물의 한국 전통 찌개입니다.',
        imageUrl: 'https://i.namu.wiki/i/xL-2HW3J4OiXkmNKUw_W6cdP00Mn82IyUM0Vh7FQtTZLSo-dglgtvr2s0X4f2JyhB-lhI_2Szfe5Rv9KBC6sR3NaTQorLxN8C-tx_IZoufEqsS6AsL3KMwfIMQ_tFzT-P2FXIomZJRMUl7sKhRTN_Q.webp',
        hidden: false,
        soldOut: false
    },
    {
        id: 2,
        name: '불고기',
        price: 12000,
        description: '달콤한 간장 소스에 재운 소고기 요리입니다.',
        imageUrl: 'https://i.namu.wiki/i/9J4ompBW5dVO8tWN6b_FiQom3Zp0MtjVAbXt3RRZkBw0k18x66Mp0kI9YufnaMiK67FMu00n1pkw60GRVQadHtJiS38NOw-ld71BO0MqmphfFoqEVQ0ESwgGgepXy9-7aov7aJS93WJq_MFA4YvpXA.webp',
        hidden: false,
        soldOut: false
    },
];

function SortableItem({ item, onCheck, checked }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : "",
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            className={'border-bottom py-3 mx-3 d-flex align-items-center justify-content-between flex-wrap menu-item'}
        >
            {/* 드래그 핸들 */}
            <div {...attributes} {...listeners} style={{ cursor: "grab" }}>
                <GripVertical />
            </div>
            {/*    체크박스*/}
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onCheck(item.id)}
                style={{ margin: "0 10px" }}
            />

            {/*    메뉴 정보*/}
            <div
                className={"flex-grow-1"}
                style={{ minWidth: "150px" }}
            >
                <h5 className={"mb-1"}>
                    {item.name}{" "}
                    {item.soldOut && <span style={{ color: "red", fontSize: "0.8rem" }}>(품절)</span>}
                    {item.hidden && <span style={{ color: "red", fontSize: "0.8rem" }}>(숨김)</span>}
                </h5>
                <small className={"text-muted"}>{item.price}원</small>
            </div>

            <div
                className={"flex-grow-2 text-start text-muted"}
                style={{ minWidth: "200px" }}
            >
                {item.description}
            </div>
            <div
                className={"flex-grow-1 text-end"}
                style={{ minWidth: "100px" }}
            >
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={"img-fluid rounded"}
                    style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        opacity: item.soldOut ? 0.5 : 1,
                    }}
                />
            </div>
        </li>
    );
}

function CeoMenuListEdit() {
    const navigate = useNavigate();

    const [menuList, setMenuList] = useState(dumiList);

    // 메뉴 순서 수정(드래그)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    // 드래그 종료시 순서 바꾸기
    const handleDragEnd = (event) => {
        const { active, over } = event;

        // over가 null일 수 있으니 먼저 체크해야 함
        if (!over) return;

        if (active.id !== over.id) {
            const oldIndex = menuList.findIndex(item => item.id === active.id);
            const newIndex = menuList.findIndex(item => item.id === over.id);

            const newMenuList = arrayMove(menuList, oldIndex, newIndex);
            setMenuList(newMenuList);
            saveMenuOrder(newMenuList); // 백엔드용 함수
        }
    };

    // 백엔드 연결용(메뉴 순서 변경 된것)
    const saveMenuOrder  = (newOrder) => {
        console.log("순서 저장할 데이터:", newOrder);
        // 나중에 이 부분만 axios.post로 바꾸면 됨
    }

    // 체크된 메뉴 ID들 (숨김/품절)
    const [selectedIds, setSelectedIds] = useState([]);

    // 체크박스 선택/해제 (숨김/품절)
    const handleCheck = (menuId) => {
        setSelectedIds(prev =>
            prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
        );
    };

    // 숨기기 임시 처리 (숨기기 버튼 클릭했을때)
    const handleHideSelected = () => {
        setMenuList(prevList =>
            prevList.map(menu =>
                selectedIds.includes(menu.id)
                    ? { ...menu, hidden: true }  // 임시로 hidden 처리
                    : menu
            )
        );
        setSelectedIds([]); // 체크박스 해제
    };

    // 품절하기
    const handleSoldOut = () => {
        setMenuList((prev) =>
            prev.map((item) =>
                selectedIds.includes(item.id) ? { ...item, soldOut: true } : item
            )
        );
        setSelectedIds([]); // 체크박스 해제
    };

    // 취소 버튼 -> 리스트 페이지로
    const handleCancel = () => {
        navigate("/pre/MenuList");
    };

    // 확인 버튼 -> 저장 후 리스트 페이지로(숨김, 품절, 순서 변경 된 값)
    const handleSave = () => {
        // 실제 서버 저장 로직은 여기서 호출
        console.log("저장된 메뉴:", menuList);
        // 나중에 여기 axios.post 연결
        // axios.post('/api/hide-menus', { ids: selectedHiddenIds });
        navigate("/pre/MenuList");
    };

    return (
        <div className={'ceo-menu-main'}>
            <ReBanner />
            <div style={{ marginTop: '10vh', marginLeft: '200px', position: 'relative' }}>
                <h2 className={'new-menu-title mb-4'}>가게 메뉴</h2>
                <hr />
                <div className={'d-flex gap-3 justify-content-end mt-4 me-5'}>
                    <button className={'btn'} onClick={handleCancel}>취소</button>
                    <button className={'btn btn-menu-edit'} onClick={handleHideSelected}>숨기기</button>
                    <button className={'btn btn-menu-add'} onClick={handleSoldOut}>품절하기</button>
                    <button className={'btn btn-save'} onClick={handleSave}>확인</button>
                </div>

            {/*    리스트*/}
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={menuList} strategy={verticalListSortingStrategy}>
                        <div className={"menu-list-container mt-4"}>
                            <ul className={"list-unstyled"}>
                                {menuList.map((menu) => (
                                    <SortableItem
                                        key={menu.id}
                                        item={menu}
                                        checked={selectedIds.includes(menu.id)}
                                        onCheck={handleCheck}
                                    />
                                ))}
                            </ul>
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

export default CeoMenuListEdit