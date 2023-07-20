import React from "react";
import {Tabs} from "antd-mobile";
import {DemoBlock} from "../components/demoBlock";
import IdCardForm from "../components/idCardForm";


const Main = () => {
  return (
  <>
    <DemoBlock
        title=''
        padding='10'
    >
      <Tabs
          style={{
              '--active-title-color': 'black',
              '--active-line-color': 'orange'
          }}
      >
          <Tabs.Tab
              title="Hanwha Life 고객정보등록"
              key="customer"
          >
              <IdCardForm></IdCardForm>
          </Tabs.Tab>
      </Tabs>
    </DemoBlock>
  </>
  );
};

export default Main;
