import {useEffect} from "react";
import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";

function StoreMap(props) {
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})

  useEffect(() => {
    console.log("lat : " + props.resLat)
    console.log("lng : " + props.resLng)
  }, []);

  return (
    <Map id="map"
         center={{lat: props.resLat, lng: props.resLng}}
         style={{width: "100%", height: "350px",}}
         level={3}>
      <MapMarker position={{lat: props.resLat, lng: props.resLng}}/>
    </Map>
  );
}

export default StoreMap






