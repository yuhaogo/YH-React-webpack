import React from 'react'

class ImagesFigure extends React.Component{

    handleClick=(e)=>{
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    render(){
        const {pos,rotate,isCenter,inverse}=this.props.arrange;
        if(rotate){
          (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
            pos[value] = 'rotate(' + rotate + 'deg)';
          }.bind(this));
        }
        if(isCenter){
            pos.zIndex=111;
        }
        var imageItemClassName='imageItem';
        imageItemClassName+=inverse?' is-inverse':'';
        
        return(
        <figure className={imageItemClassName} style={pos} >
            <img src={this.props.datas.imageUrl} onClick={this.handleClick} />
            <figcaption>
                <h2 className="imageTitle">{this.props.datas.Title}</h2>
                <div className="img-back" onClick={this.handleClick} >
                    <h2>{this.props.datas.Descraption}</h2>
                </div>
            </figcaption>
        </figure>
        )
    }
}
export default ImagesFigure;