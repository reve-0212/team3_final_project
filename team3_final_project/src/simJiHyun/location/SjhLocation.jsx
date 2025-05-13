import {Map, MapMarker, useKakaoLoader, useMap} from "react-kakao-maps-sdk";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import storeMarker from '/public/images/storeMarker.png'
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";

function SjhLocation() {
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})

  // 지도 중심좌표
  const [myLocation, setCenter] = useState({
    lat: 0,
    lng: 0
  })

  // 현재 위치
  const [myPosition, setPosition] = useState({
    lat: 0,
    lng: 0
  })

  // 가게 위치
  const [storePositions, setStorePositions] = useState([])

  const [selectedMarkerId, setSelectedMarkerId] = useState(null)

  // 지도가 처음 렌더링 되면 중심좌표를 현재위치로 설정하고 위치 변화 감지
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCenter({lat: pos.coords.latitude, lng: pos.coords.longitude})
    })

    navigator.geolocation.watchPosition((pos) => {
      setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude})
    })

    // 가게 번호, 이름, lat, lng 가져오기
    axios.get("http://localhost:8080/getStoreLocation")
      .then((res) => {
        console.log("res.data")
        console.log(res.data)
        setStorePositions(res.data)
      }).catch((err) => {
      console.log(err)
    })
  }, []);

  const EventMarkerContainer = ({markerId, position, content, selectedMarkerId}) => {
    const map = useMap()
    const isOpen = selectedMarkerId === markerId
    // const [isOpen, setIsOpen] = useState(false)

    return (
      <MapMarker
        position={position}
        onClick={(marker) => {
          setSelectedMarkerId(markerId)

          // 카메라 이동 조금 있다가 실행
          setTimeout(() => {
            map.panTo(marker.getPosition())
          }, 0)
        }}
        image={{
          src: "public/images/markerWithShadow.png",
          size: {
            width: 30, height: 35
          }
        }}
      >{isOpen && content}</MapMarker>
    )
  }

  return (
    <Map id="map"
         center={myLocation}
         style={{width: "100%", height: "50rem"}}
         level={3}
    >
      {/* 내 위치 마커 */}
      <MapMarker position={myPosition}/>

      {/* 가게 위치 마커들 */}
      {storePositions.map((value) => (
        <EventMarkerContainer
          key={value.resIdx}
          markerId={value.resIdx}
          position={{lat: value.resLat, lng: value.resLng}}
          content={value.resName}
          selectedMarkerId={selectedMarkerId}
          setSelectedMarkerId={setSelectedMarkerId}/>
      ))}
    </Map>

  );
}

export default SjhLocation