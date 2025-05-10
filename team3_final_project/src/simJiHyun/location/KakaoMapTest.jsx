import {CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader} from "react-kakao-maps-sdk";
import {useEffect, useState} from "react";
import useGeolocation from "../../stores/useGeolocation.jsx";

function KakaoMapTest() {
  const {currentMyLocation} = useGeolocation();
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})

  const [state, setState] = useState({
    center: {lat: 33.450701, lng: 126.570667},
    isPanto: false
  })


  return (
    <Map id="map" center={state.center}
         isPanto={state.isPanto}
         style={{width: "100%", height: "350px",}}
         level={3}>
      <p>
        <button onClick={() => {
          setState({
            center: {lat: 33.452613, lng: 126.570888},
            isPanto: false,
          })
        }}> 지도 중심좌표 이동
        </button>
        {" "}

        <button onClick={() => {
          setState({
            center: {lat: 33.45058, lng: 126.574942},
            isPanto: true,
          })
        }}>지도 중심좌표 부드럽게 이동
        </button>
      </p>
    </Map>
  )
}

export default KakaoMapTest;
