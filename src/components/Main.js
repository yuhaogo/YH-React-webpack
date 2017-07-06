require('styles/main.less');

import React from 'react';

//获取图片相关信息数据
const imagesDatasArr=require('../sources/imagesData.json');

//通过自运行函数获得图片URL
imagesDatasArr=(function (imagesDatasArr){
  for(var i=0;i<imagesDatasArr.length;i++){
    var imagesDataItem=imagesDatasArr[i];
    imagesDataItem.imageUrl=require("../images/" +imagesDataItem.fileName);
    imagesDatasArr[i]=imagesDataItem;
  }
  return imagesDatasArr;
})

class AppComponent extends React.Component {
  render() {
    return (
      <div className="stage">
          <section className="img-sec">
          </section>
          <nav className="controller-nav"></nav>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
