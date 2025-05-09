import {useEffect, useRef} from "react";

function StoreMap(props) {
  const mapRef = useRef(null);
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_REACT_APP_NAVER_MAP_API_KEY}`
    script.async = true;

    script.onload = () => {
      if (props.resLat !== 0 && props.resLng !== 0 && window.naver) {
        // 네이버 지도 옵션 선택
        const mapOptions = {
          // 지도의 초기 중심 좌표
          center: new window.naver.maps.LatLng(props.resLat, props.resLng),
          zoom: 14, // 지도의 초기 줌 레벨
          zoomControl: true, // 줌 컨트롤 표시
          zoomControlOptions: {position: 9},
          logoControl: false, // 네이버 로고 표시 X
          mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
          scaleControl: true, // 지도 축척 컨트롤의 표시 여부
          tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
        };

        // map 이라는 아이디를 가진 div 에 mapOptions 출력
        mapRef.current = new window.naver.maps.Map('map', mapOptions);

        // 마커 리스트와 정보창 리스트 선언
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(props.resLat, props.resLng),
          map: mapRef.current
        })
      }
    }
    document.head.appendChild(script);
  }, [props.resLat, props.resLng]);


  return (
    <div id={"map"} style={{width: '100%', height: '500px', margin: '0 auto'}}></div>
  );
}

export default StoreMap






