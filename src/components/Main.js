require('styles/iconfont.css');
require('styles/main.less');

import React from 'react';
import ReactDOM from 'react-dom';
import ImagesFigure from './ImagesFigure';
import NavsFigure from './NavsFigure';

//获取图片相关信息数据
var imagesDatasArr=require('../sources/imagesData.json');

//通过自运行函数获得图片URL
imagesDatasArr=(function addsImagesUrl(arr){
  for(var i=0;i<arr.length;i++){
    var imagesDataItem=arr[i];
    imagesDataItem.imageUrl=require('../images/' +imagesDataItem.fileName);
    arr[i]=imagesDataItem;
  }
  return arr;
})(imagesDatasArr)

//默认位置参数
 var constant = {
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
//获取特定范围随机位置
function getRangePostion(max,min){
  return Math.ceil(Math.random()*(max-min)+min);
}
//获取随机旋转角度
function get36range(){
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}
class AppComponent extends React.Component {

  constructor(props){
    super(props);
    this.state={
      positions:[]
    }

  }
  componentDidMount(){
    var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
        stageWidth=stageDOM.scrollWidth,
        stageHeight=stageDOM.scrollHeight,
        figureDOM=ReactDOM.findDOMNode(this.refs.figures0),
        figureWidth=figureDOM.scrollWidth,
        figureHeight=figureDOM.scrollHeight,
        halfStageW=stageWidth/2,
        halfStageH=stageHeight/2,
        halfFigureW=figureWidth/2,
        halfFigureH=figureHeight/2;

        //constant=AppComponent.constant;
        constant.centerPos.left= halfStageW-halfFigureW;
        constant.centerPos.top= halfStageH-halfFigureH;
        //左右两边图片位置极限值
        constant.hPostion.rightSecX[0]=stageWidth-halfFigureW;
        constant.hPostion.rightSecX[1]=halfStageW+halfFigureW;
        constant.hPostion.leftSecX[0]=-halfFigureW;
        constant.hPostion.leftSecX[1]=halfStageW-figureWidth*1.5;
        constant.hPostion.y[0]=-halfFigureH;
        constant.hPostion.y[1]=stageHeight-halfFigureH;
        //上方图片位置极限值
        constant.tPostion.y=halfStageH-figureHeight*1.5;
        
        this.rangePostion(0);

  }
  //获取随机位置
  rangePostion=(centertIndex)=>{
      var positions=this.state.positions,
          imageCenterItem=positions.splice(centertIndex,1),
          imageTopArr=[],
          imageTopNum=Math.floor(Math.random()*2);
          imageCenterItem[0].pos=constant.centerPos;
          imageCenterItem[0].isCenter=true;
          imageCenterItem[0].rotate=0;

          var imageTopItemIndex=Math.ceil(Math.random()*(positions.length-imageTopNum));
          imageTopArr=positions.splice(imageTopItemIndex,imageTopNum);

          imageTopArr.forEach(function(value,index){
            imageTopArr[index]={
              pos:{
                top:getRangePostion(constant.hPostion.y[0],constant.tPostion.y),
                left:constant.centerPos.left
              },
              rotate:get36range(),
              isCenter:false,
              inverse:false
            }
          })

          for (var i = 0,j=positions.length,k=j/2;i < j; i++) {
                var imagesPosLeftOrRight=null;

                if(i<k){
                  imagesPosLeftOrRight=constant.hPostion.leftSecX
                }else{
                  imagesPosLeftOrRight=constant.hPostion.rightSecX
                }
                positions[i].pos={
                  left:getRangePostion(imagesPosLeftOrRight[0],imagesPosLeftOrRight[1]),
                  top:getRangePostion(constant.hPostion.y[0],constant.hPostion.y[1])
                }
                
                positions[i].rotate=get36range();
                positions[i].inverse=false;
                positions[i].isCenter=false;
          }
          if(imageTopArr&&imageTopArr[0]){
            positions.splice(imageTopItemIndex,0,imageTopArr[0]);
          }
          positions.splice(centertIndex,0,imageCenterItem[0]);

          console.log(positions);
          this.setState({
            positions:positions
          })
  }
  //点击图片翻转
  inverse=(index)=>{
    return function(){
      var positions=this.state.positions;
      positions[index].inverse=!positions[index].inverse;
      this.setState({
        positions:positions
      })
    }.bind(this)
  }
  //点击图片居中
  center=(index)=>{
    return function(){
      this.rangePostion(index);
    }.bind(this)
  }
  render() {
    var imagesArr=[];
    var navsArr=[];
    for(var i=0;i<imagesDatasArr.length;i++){
      var item=imagesDatasArr[i];
      if(!this.state.positions[i]){
        this.state.positions[i]={
          pos:{
            left:0,
            right:0
          },
          rotate:0,
          isCenter:false,
          inverse:false
        }
      }

      imagesArr.push(<ImagesFigure arrange={this.state.positions[i]} datas={item} key={'figures'+i}  ref={'figures'+i} inverse={this.inverse(i)} center={this.center(i)} />);
      navsArr.push(<NavsFigure arrange={this.state.positions[i]} key={'navs'+i} ref={'navs'+i} inverse={this.inverse(i)} center={this.center(i)} />);
    }
    return (
      <div className="stage" ref="stage">
          <section className="img-sec">
            {imagesArr}
          </section>
          <nav className="controller-nav">
            {navsArr}
          </nav>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
