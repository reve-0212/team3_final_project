import {CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader} from "react-kakao-maps-sdk";
import {useEffect, useMemo, useState} from "react";

function KakaoMapTest() {
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})

  // 지도 중심좌표
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667
  })

  // 현재 위치
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  })

  // 지도가 처음 렌더링 되면 중심좌표를 현재위치로 설정하고 위치 변화 감지
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude})
    })

    navigator.geolocation.watchPosition((pos) => {
      setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude})
    })
  }, []);


  return (
    <div>
      <Map id="map"
           center={center}
           style={{width: "100%", height: "350px",}}
           level={3}>
        <MapMarker position={position}/>
      </Map>
    </div>

  )
}

export default KakaoMapTest;
