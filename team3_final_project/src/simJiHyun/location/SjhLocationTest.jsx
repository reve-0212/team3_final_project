import {useEffect, useRef} from "react";
import useGeolocation from "../../stores/useGeolocation.jsx";


function SjhLocationTest() {
  const mapRef = useRef(null);
  const {naver} = window;
  const {currentMyLocation} = useGeolocation();
  const script = document.createElement("script")
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_REACT_APP_NAVER_MAP_API_KEY}`
  script.async = true;
  document.head.appendChild(script);

  useEffect(() => {
    if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
      // 네이버 지도 옵션 선택
      const mapOptions = {
        // 지도의 초기 중심 좌표
        center: new naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
        logoControl: false, // 네이버 로고 표시 X
        mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
        scaleControl: true, // 지도 축척 컨트롤의 표시 여부
        tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
        zoom: 14, // 지도의 초기 줌 레벨
        zoomControl: true, // 줌 컨트롤 표시
        zoomControlOptions: {position: 9},
      };

      // map 이라는 아이디를 가진 div 에 mapOptions 출력
      mapRef.current = new naver.maps.Map(
        'map',
        mapOptions
      );

      // 마커 리스트와 정보창 리스트 선언
      const markers = [];
      const infoWindows = [];

      const samples = [
        {lat: currentMyLocation.lat, lng: currentMyLocation.lng},
        // {lat: 37.5666103, lng: 126.9783882},
        // {lat: 37.5796103, lng: 126.9772882},
      ];  // 좌표 샘플

      for (let i = 0; i < samples.length; i++) {
        // console.log(samples[i])
        //   현재 내 위치 마커
        const marker = new naver.maps.Marker({
          //   생성될 마커 위치
          position: new naver.maps.LatLng(samples[i].lat, samples[i].lng),
          //   마커 표시 Map 객체
          map: mapRef.current
        });

        //   정보창 객체
        const infoWindow = new naver.maps.InfoWindow({
          content: [
            `<div style="padding:10px; box-shadow: rgba(0,0,0,0.1) 0px 4px 16px 0px;">`,
            `<div style="font-weight:bold; margin-bottom:5px;">제목${i + 1}</div>`,
            `<div style="font-size:13px;"><p>내용${i + 1}</p></div>`,
            `</div>`
          ].join(""),
          maxWidth: 300,
          anchorSize: {
            width: 12,
            height: 14,
          },
          borderColor: "#cecdc7"
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
      }

      // 각 마커에 이벤트 발생 시 기능 설정
      // const getClickHandler = (index) => {
      //   if (infoWindows[index].getMap()) {
      //     infoWindows[index].close();
      //   } else if (mapRef.current !== null) {
      //     infoWindows[index].open(mapRef.current, markers[index]);
      //   }
      // };

      //   각 마커에 이벤트 핸들러 설정
      for (let i = 0; i < markers.length; i++) {
        naver.maps.Event.addListener(markers[i], "click", () => {
          if (infoWindows[i].getMap()) {
            infoWindows[i].close();
          } else if (mapRef.current !== null) {
            infoWindows[i].open(mapRef.current, markers[i])
          }
        })
      }
    }
  }, [currentMyLocation]);

  return (
    <div>
      <h1>locationTest</h1>
      <div id="map" style={{width: "400px", height: "400px"}}></div>
    </div>)
}

export default SjhLocationTest