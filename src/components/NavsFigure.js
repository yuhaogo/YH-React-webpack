import React from 'react';


class NavsFigure extends React.Component{
    handleClick=(e)=>{
        const {isCenter}=this.props.arrange;
        if(isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }
    render(){
        const {isCenter,inverse}=this.props.arrange;
        var navsClassName='small-dot';
        navsClassName+=isCenter?' is-center tmfont tm-icon-refresh2':'';
        navsClassName+=inverse?' is-inverse tmfont tm-icon-refresh2':'';
        return(
            <div className={navsClassName} onClick={this.handleClick}></div>
        )
    }
}
export default NavsFigure;