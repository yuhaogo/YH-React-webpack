require('styles/main.less');

import React from 'react';
import ImagesFigure from './ImagesFigure';

//获取图片相关信息数据
var imagesDatasArr=require('../sources/imagesData.json');

//通过自运行函数获得图片URL
imagesDatasArr=(function addsImagesUrl(arr){
  for(var i=0;i<arr.length;i++){
    var imagesDataItem=arr[i];
    imagesDataItem.imageUrl=require("../images/" +imagesDataItem.fileName);
    arr[i]=imagesDataItem;
  }
  return arr;
})(imagesDatasArr)



class AppComponent extends React.Component {
 static constant = {
            centerPos: {
              left: 0,
              top: 0
            },
            hPostion: {
              rightSecX: [0, 0],
              leftSecX:[0,0],
              y: [0, 0]
            },
            tPostion: {
              y: 0
            }
          }
  constructor(props){
    super(props);
    this.state={
      positions:[]
    }

  }
  componentDidMount(){
    var stageDOM=React.findDOMNode(this.refs.stage),
        stageWidth=stageDOM.scrollWidth,
        stageHeight=stageDOM.scrollHeight,
        figureDOM=React.findDOMNode(this.refs.figure0),
        figureWidth=figureDOM.scrollWidth,
        figureHeight=figureDOM.scrollHeight;

        constant=this.constant;
        constant.centerPos.left= stageWidth/2-figureWidth/2;
        constant.centerPos.top= stageHeight/2-figureHeight/2;
        //左右两边图片位置极限值
        constant.hPostion.rightSecX[0]=stageWidth-figureWidth/2;
        constant.hPostion.rightSecX[1]=stageWidth/2+figureWidth/2;
        constant.hPostion.leftSecX[0]=-figureWidth/2;
        constant.hPostion.leftSecX[1]=stageWidth/2-figureWidth;
        constant.hPostion.y[0]=-figureHeight/2;
        constant.hPostion.y[1]=stageHeight-figureHeight/2;
        //上方图片位置极限值
        constant.tPostion.y=stageHeight/2-figureHeight*1.5;

        this.rangePostion(0);

  }
  rangePostion=(centertIndex)=>{
    var constant=this.constant,
        postions=this.state.positions,
        imageCenterItem=postions[centertIndex];
        
        imageCenterItem.pos=constant.centerPos;


    // imageCenterItem.postion={
    //   left:
    // }

  }
  render() {
    var imagesArr=[];
    
          
    console.log(imagesDatasArr);
    for(var i=0;i<imagesDatasArr.length;i++){
      var item=imagesDatasArr[i];
      if(!this.state.positions[i]){
        this.state.positions[i]={
          pos:{
            left:0,
            right:0
          }
        }
      }

      imagesArr.push(<ImagesFigure datas={item} key={"figures"+i} />);
    }
    return (
      <div className="stage" ref="stage">
          <section className="img-sec">
            {imagesArr}
          </section>
          <nav className="controller-nav"></nav>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
