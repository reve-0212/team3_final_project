import {useState} from "react";

function VisitorBtn(props) {
    const [quantity, setQuantity] = useState(0);

    const increase = () => {
        setQuantity(prev => {
            const newQuantity = prev + 1;
            props.onChange(props.gender, newQuantity); // 부모에게 전달
            return newQuantity;
        });


    };

    const decrease = () => {
        setQuantity(prev => {
            const newQuantity = prev > 0 ? prev - 1 : 0;
            props.onChange(props.gender, newQuantity); // 부모에게 전달
            return newQuantity;
        });
    };



    const {gender} = props;

    return (
        <div className={'d-flex justify-content-between mb-2'}>
            {gender === 'man' ? '남성' : gender === 'woman' ? '여성' : '유아'}
            <div style={{border: '1px solid #dddddd', padding: '0 10px', borderRadius: '10px'}}>
                <button className={'prev-btn'} onClick={decrease}>-</button>
                <span>{quantity}</span>
                <button className={'next-btn'} onClick={increase}>+</button>
            </div>
        </div>
    );
}

export default VisitorBtn






