import {Map, MapMarker, useKakaoLoader, useMap} from "react-kakao-maps-sdk";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import useResStoreSjh from "../../stores/useResStoreSjh.jsx";

// 두 좌표 사이 거리 계산 (단위 : km)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  // 지구 반지름
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const MapPanToHandler = ({stores, selectedStoreId}) => {
  const map = useMap()

  useEffect(() => {
    const store = stores.find((s) => s.resIdx === selectedStoreId)
    if (store) {
      const latLng = new window.kakao.maps.LatLng(store.resLat, store.resLng)
      map.panTo(latLng)
    }
  }, [selectedStoreId, stores, map])

  return null
}

function SjhLocation() {
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})
  const Nv = useNavigate()

  const [myLocation, setCenter] = useState({lat: 0, lng: 0})
  const [myPosition, setPosition] = useState({lat: 0, lng: 0})
  const [storePositions, setStorePositions] = useState([])

  const [selectedMarkerId, setSelectedMarkerId] = useState(null)
  const [selectedStoreId, setSelectedStoreId] = useState(null)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [distanceFilter, setDistanceFilter] = useState("1km")

  // const setRes = useResStoreSjh((state) => state.setRes())

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

  // 반경 nkm 이내 가게 필터
  const filteredStoresByDistance = useMemo(() => {
    return storePositions.filter((store) => {
      const distance = getDistanceFromLatLonInKm(
        myPosition.lat,
        myPosition.lng,
        store.resLat,
        store.resLng
      );

      if (distanceFilter === "1km") return distance <= 1
      if (distanceFilter === "5km") return distance > 1 && distance <= 5
      if (distanceFilter === "10km") return distance > 5 && distance <= 10
      if (distanceFilter === "그 외") return distance > 10
      return false
    })
  }, [storePositions, myPosition, distanceFilter]);

  // 마커 누르면 상세 창 나오게
  const EventMarkerContainer = ({markerId, position, content, address}) => {
    const map = useMap()
    const isOpen = selectedMarkerId === markerId

    return (
      <MapMarker
        position={position}
        onClick={(marker) => {
          setSelectedMarkerId(markerId)
          // 카메라 조금 있다가 움직이게 설정함
          setTimeout(() => {
            map.panTo(marker.getPosition())
          }, 0)
        }}
        image={{src: "/images/markerWithShadow.png", size: {width: 30, height: 35}}}
      >
        {isOpen &&
          <div style={{whiteSpace: "nowrap", margin: "10px"}}
               onClick={() => {
                 // setRes(markerId)
                 Nv(`/resdetail/${markerId}`)
               }}>
            <p className={"mb-0 fw-bold"}>{content}</p>
            <p className={"mb-0"}>{address}</p>
          </div>
        }</MapMarker>
    )
  }

  // 밑에 있는 가게 이름 누르면 지도 중심 좌표 바꾸게
  return (
    <div className={"d-flex justify-content-center align-items-center flex-column"}>
      <Map id="map"
           style={{width: "100%", height: isAccordionOpen ? "50vh" : "82vh"}}
           center={myLocation}
           onClick={() => {
             setSelectedMarkerId(null)
           }}
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
            address={value.resAddress1}
            img={value.resImage1}
            selectedMarkerId={selectedMarkerId}
            setSelectedMarkerId={setSelectedMarkerId}/>
        ))}

        <MapPanToHandler
          stores={storePositions}
          selectedStoreId={selectedStoreId}/>
      </Map>

      <div className={"w-100"}>
        <Accordion defaultActiveKey={isAccordionOpen ? "0" : null}>
          <Accordion.Item eventKey={"0"}>

            <Accordion.Header
              onClick={() => setIsAccordionOpen(prev => !prev)}>
              근처 가게 알아보기
            </Accordion.Header>

            <Accordion.Body>
              <div className={"d-flex justify-content-between align-items-center mb-3"}>
                {["1km", "5km", "10km", "그 외"].map((label) => (
                  <button
                    key={label}
                    type={"button"}
                    className={`btn btn-outline-primary flex-fill
                    ${distanceFilter === label ? "active" : ""}`}
                    onClick={() => setDistanceFilter(label)}>{label}</button>
                ))}
              </div>

              {filteredStoresByDistance.length === 0 ? (
                <p>해당 거리 내에 가게가 없어요</p>
              ) : (
                filteredStoresByDistance.map((store) => (
                    <div
                      key={store.resIdx}
                      className={"mb-2 d-flex justify-content-between align-items-center flex-row"}
                      onClick={() => {
                        setSelectedStoreId(store.resIdx)
                        setSelectedMarkerId(store.resIdx)
                      }}>

                      <div className={"me-5 flex-fill"}>
                        <p className="fw-bold mb-1">{store.resName}</p>
                        <p className="text-muted">{store.resAddress1}</p>
                      </div>
                      <img src={store.resImage1}
                           style={{width: "100px", height: "100px", border: "none"}}
                           className={"rounded-3 border-0"}/>
                    </div>
                  )
                ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default SjhLocation