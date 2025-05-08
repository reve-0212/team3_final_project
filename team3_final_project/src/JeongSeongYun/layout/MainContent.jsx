import React from 'react';
import SlideBanner from "../library/SlideBanner.jsx";
import MainCategory from "../components/MainCategory.jsx";
import {Link} from "react-router-dom";
import TabPage from "../components/TabPage.jsx";
import useUserStore from "../../stores/useUserStore.jsx";


const MainContent = () => {
  const user = useUserStore((state) => state.user)
  console.log(user)

  return (
    <div>
      <SlideBanner/>
      <div className="container py-4">
        <MainCategory/>
      </div>

      <hr className={'border border-5 m-0 p-0'}/>

      <div className={'container py-4'}>
        <TabPage/>
      </div>

    </div>
  );
};

export default MainContent;
