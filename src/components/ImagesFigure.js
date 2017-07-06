import React from 'react'

class ImagesFigure extends React.Component{
    render(){
        return(
        <figure className="imageItem" >
            <img src={this.props.datas.imageUrl} />
            <figcaption>
                <h2 className="imageTitle">{this.props.datas.Title}</h2>
            </figcaption>
        </figure>
        )
    }
}
export default ImagesFigure;