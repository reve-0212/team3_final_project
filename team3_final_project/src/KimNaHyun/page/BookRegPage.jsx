import BookReg from "../components/BookReg.jsx";

function BookRegPage() {
    const bookObj = {
        bkName : "런던베이글 뮤지엄",
        bkPerson: 5,
        bkFood: '블루베리 베이글 1개',
        bkNotice: "저희매장 유의사항 입니다.",
        bkDate:"2025-04-30"
    }

    return (
        <div>
            <BookReg bkReg={bookObj}/>
        </div>
    );
}

export default BookRegPage






