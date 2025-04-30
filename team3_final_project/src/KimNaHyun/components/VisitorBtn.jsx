import {useState} from "react";

function VisitorBtn(props) {
    const [quantity, setQuantity] = useState(0);

    const increase = () => {
        setQuantity(prev => prev + 1);
    };

    const decrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };
    const {gender} = props;

    return (
        <div className={'d-flex justify-content-between mb-2'}>
            <div>{gender}</div>
            <div style={{border: '1px solid #dddddd', padding: '0 10px', borderRadius: '10px'}}>
                <button className={'prev-btn'} onClick={decrease}>-</button>
                <span>{quantity}</span>
                <button className={'next-btn'} onClick={increase}>+</button>
            </div>
        </div>
    );
}

export default VisitorBtn






