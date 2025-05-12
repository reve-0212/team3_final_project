import {useEffect, useMemo} from "react";
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

  // 좌표 두개 가지고 km 구하기
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180)
    }

    const earthMeter = 6378
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lng2 - lng1)
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthMeter * c;
  }

  const distance = useMemo(() =>
      getDistance(currentMyLocation.lat, currentMyLocation.lng,
        props.resLat, props.resLng),
    [currentMyLocation.lat, currentMyLocation.lng,
      props.resLat, props.resLng])

  console.log("distance : " + distance.toFixed(2) + "km")


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






