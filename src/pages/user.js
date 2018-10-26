import React, { PropTypes } from 'react';
import Api from './../services/Api';
import {observable, action, when} from 'mobx';
import { observer }  from 'mobx-react';

@observer
class User extends React.Component {

    constructor(p){
        super(p);
        let that= this;
        let ref = Api.getUserById();
        ref.get().then(col => {
            console.log(col)
           col.docs.map(d => {
              that.data.push( d.data() );
           })
        }).then( _ =>{
            console.log(that.data)
        })
    }

    @observable data = [];

    render(){

        return(<div style={{'background': 'white', 'height': '100%', 'width': '100%', 'overflow': 'auto', 'padding': '33px'}} >
                {this.data.map((d, idx) => {
                    return (<div style={{'line-height': '1.4em', 'display': 'flex'}} >
                     <span style={{'padding': '0 1.4em', 'userSelect': 'auto'}}>{d.wallet}</span>  <span style={{'padding': '0 1.4em'}}>{idx}</span> 
                        <div style={{'line-height': '1.4em', 'width': '100%', padding: '0 0 0 30px'}}>  {d.withdrawDetailed &&
                            Object.values(d.withdraw).map(w => {
                                return(<span style={{display: 'inline-block', 'padding': '0 1.4em', 'userSelect': 'auto'}}>{Number(w.amount) ? Number(w.amount) : ''}</span> )
                            })} 
                        </div>
                        <div style={{'line-height': '1.4em', 'width': '100%', padding: '0 0 0 30px'}}>  {d.withdrawDetailed &&
                            Object.values(d.withdrawDetailed).map(w => {
                                return(<span style={{display: 'inline-block', 'padding': '0 1.4em', 'userSelect': 'auto'}}>{Number(w.amount) ? Number(w.amount) : ''}</span> )
                            })} 
                        </div>
                        <div style={{'line-height': '1.4em', 'width': '100%', padding: '0 0 0 30px'}}>  {d.withdrawDetailed &&
                            Object.values(d.withdraw).map(w => {
                                return (<span style={{display: 'inline-block', 'padding': '0 1.4em'}}>{w.responce && w.responce.sent &&
                                    Object.values(w.responce.sent).map(({main}) => {
                                        return(<span style={{display: 'inline-block', 'padding': '0 1.4em', 'userSelect': 'auto', border: '1px solid red'}}>{main}</span> )
                                    })} </span> )
                            })} 
                        </div>
                        <div style={{'line-height': '1.4em', 'width': '100%', padding: '0 0 0 30px'}}>  {d.withdrawDetailed &&
                            Object.values(d.withdraw).map(w => {
                                return (<span style={{display: 'inline-block', 'padding': '0 1.4em', border: '1px solid black'}}>{w.responce && w.responce.ip } </span>)
                            })} 
                        </div>
                    </div>
                    )
                })}
            </div>)
    }
}
export default User