import {useNavigate} from "react-router-dom";


function TabContentUi({title, engTitle, description, storeName}) {
    const nv = useNavigate();

    return (
        <div className="mb-5">
            <div className={"d-flex flex-row align-items-center justify-content-between"}>
                <div>
                    <h5 className="fw-bold mb-1 fs-5 fs-sm-4">{title}</h5>
                    <p className="text-muted small fs-7">{description}</p>
                </div>
                <small className="text-muted" onClick={() => {
                    nv(`/contentList/${engTitle}`)
                }}>전체보기</small>
            </div>

            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong className="fs-6">{storeName}</strong>
                    {/*<small className="text-muted" onClick={() => {*/}
                    {/*    nv(`/contentList/${engTitle}`)*/}
                    {/*}}>전체보기</small>*/}
                </div>
                <div className="d-flex overflow-auto gap-3">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="bg-light rounded"
                             style={{width: '128px', height: '128px', flex: '0 0 auto'}}
                             onClick={() => {
                                 nv("/resdetail/1")
                             }}></div>
                    ))}
                </div>
            </div>

            <div>
                <strong className="mb-2 d-block fs-6">{storeName}</strong>
                <div className="bg-light rounded" style={{width: '100%', height: '160px'}}
                onClick={()=>{nv("/resdetail/1")}}></div>
            </div>
        </div>
    );
}

export default TabContentUi