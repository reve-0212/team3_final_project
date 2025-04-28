import Banner from "./Banner.jsx";

function PreTime() {












    return (
        <div
            style={{
              marginLeft: '200px',
              marginTop: '10vh',
              paddingTop: '2rem',
              paddingLeft: '1rem',
              width: 'calc(100% - 200px)',
              maxWidth: '1000px'
            }}
        >

          <Banner/>
          <div className="d-flex">
            <h4 className="text-start me-5">가게정보</h4>
            <h4 className="text-start">운영정보</h4>
          </div>
          <hr/>


        </div>
    );
}

export default PreTime

