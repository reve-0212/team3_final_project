import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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
import axios from "axios";

function SortableItem({ item, onCheck, checked }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.menuIdx });

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
                onChange={() => onCheck(item.menuIdx)}
                style={{ margin: "0 10px" }}
            />

            {/*    메뉴 정보*/}
            <div
                className={"flex-grow-1"}
                style={{ minWidth: "150px" }}
            >
                <h5 className={"mb-1"}>
                    {item.menuName}{" "}
                    {item.menuSoldOut && <span style={{ color: "red", fontSize: "0.8rem" }}>(품절)</span>}
                    {item.menuHidden && <span style={{ color: "red", fontSize: "0.8rem" }}>(숨김)</span>}
                </h5>
                <small className={"text-muted"}>{item.price}원</small>
            </div>

            <div
                className={"flex-grow-2 text-start text-muted"}
                style={{ minWidth: "200px" }}
            >
                {item.menuExplanation}
            </div>
            <div
                className={"flex-grow-1 text-end"}
                style={{ minWidth: "100px" }}
            >
                <img
                    src={item.menuImage}
                    alt={item.menuName}
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
    const [menuList, setMenuList] = useState([]);
    // 체크된 메뉴 ID들 (숨김/품절)
    const [selectedIds, setSelectedIds] = useState([]);

    // const resIdx = useUserStore(state => state.user.resIdx); // 예시
    const resIdx = 1; // 현재는 하드코딩된 테스트용 값

    // 데이터 받아오기
    useEffect(() => {
        if (!resIdx) return;

        axios.get('http://localhost:8080/menu/list', {
            params: {resIdx: resIdx}
        })
            .then(response => {
                setMenuList(response.data);
            })
            .catch(err => {
                console.error("메뉴 불러오기 실패", err);
            });
    }, [resIdx]);

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
            const oldIndex = menuList.findIndex(item => item.menuIdx === active.id);
            const newIndex = menuList.findIndex(item => item.menuIdx === over.id);

            const newMenuList = arrayMove(menuList, oldIndex, newIndex);
            setMenuList(newMenuList);
        }
    };

    // 체크박스 선택/해제 (숨김/품절)
    const handleCheck = (menuIdx) => {
        setSelectedIds(prev =>
            prev.includes(menuIdx) ? prev.filter(id => id !== menuIdx) : [...prev, menuIdx]
        );
    };

    // 숨기기 임시 처리 (숨기기 버튼 클릭했을때)
    const handleHideSelected = () => {
        setMenuList(prevList =>
            prevList.map(menu =>
                selectedIds.includes(menu.menuIdx)
                    ? { ...menu, menuHidden: true }  // 임시로 hidden 처리
                    : menu
            )
        );
        setSelectedIds([]); // 체크박스 해제
    };

    // 품절하기
    const handleSoldOut = () => {
        setMenuList((prev) =>
            prev.map((item) =>
                selectedIds.includes(item.menuIdx) ? { ...item, menuSoldOut: true } : item
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
        const updatedList = menuList.map((menu, index) => ({
            ...menu,
            menuSort: index  // 드래그된 순서대로 인덱스를 menuSort로
        }));

        axios.post('http://localhost:8080/menu/listEdit', updatedList)
            .then(() => {
                alert("저장 완료!");
                navigate("/pre/MenuList");
            })
            .catch((err) => {
                console.error("메뉴 저장 실패:", err);
                alert("저장 실패");
            });
    };

    return (
        <>
            <ReBanner />
            <div className={'ceo-menu-main'}>
                <div style={{marginTop: '10vh', marginLeft: '200px', position: 'relative'}}>
                    <h2 className={'new-menu-title mb-4'}>가게 메뉴</h2>
                    <hr/>
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
                                            key={menu.menuIdx}
                                            item={{ ...menu, id: menu.menuIdx }}
                                            checked={selectedIds.includes(menu.menuIdx)}
                                            onCheck={handleCheck}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </>
    );
}

export default CeoMenuListEdit