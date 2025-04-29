function TabContentUi({ title, description, storeName }) {
    return (
        <div className="mb-5">
            <h5 className="fw-bold mb-1 fs-5 fs-sm-4">{title}</h5>
            <p className="text-muted small fs-7">{description}</p>

            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong className="fs-6">{storeName}</strong>
                    <small className="text-muted">전체보기</small>
                </div>
                <div className="d-flex overflow-auto gap-3">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="bg-light rounded" style={{ width: '128px', height: '128px', flex: '0 0 auto' }}></div>
                    ))}
                </div>
            </div>

            <div>
                <strong className="mb-2 d-block fs-6">{storeName}</strong>
                <div className="bg-light rounded" style={{ width: '100%', height: '160px' }}></div>
            </div>
        </div>
    );
}

export default TabContentUi