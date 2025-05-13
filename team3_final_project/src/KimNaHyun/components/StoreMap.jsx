import {Map, MapMarker, useKakaoLoader} from "react-kakao-maps-sdk";
import useGeolocation from "../../stores/useGeolocation.jsx";

function StoreMap(props) {
  const {currentMyLocation} = useGeolocation();
  useKakaoLoader({appkey: import.meta.env.VITE_REACT_APP_KAKAO_MAP_API_KEY})

  console.log("currentMyLocation")
  console.log(currentMyLocation.lat)
  console.log(currentMyLocation.lng)

  console.log("storeLocation")
  console.log(props.resLat)
  console.log(props.resLng)

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






