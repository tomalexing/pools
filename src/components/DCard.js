import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {observable, action} from 'mobx';
import { observer }  from 'mobx-react';
import Cards from "./../models/Cards";
import { withRouter } from 'react-router';
import Api from './../services/Api';
import Auth from './../models/Auth';
import CardWrapper from './CardWrapper';

@withRouter
@observer
class DCard extends React.Component {

    constructor(props){
        super(props)
        let {match} = props;
        if(/polls/.test(match.path)){

            let slug = match.url;
            if(slug[slug.length-1] == '/'){
                slug = slug.substring(0, slug.length-1);
            } 

            this.model = new Cards({getIds: Api.getPollsIds(`${slug}/v1`), cardSlug: `${slug}/v1`, dashTitle: 'Poll: Best', dashOutput: 'number', tryAgainIsCleanPrevious: false});
            Auth.stores.push(this.model)
        }

        if(/quizzes/.test(match.path)){

            let slug = match.url;
            if(slug[slug.length-1] == '/'){
                slug = slug.substring(0, slug.length-1);
            }

            this.model = new Cards({getIds: Api.getQuizzesIds(`${slug}/v1`), cardSlug: `${slug}/v1`,
            dashTitle: 'Quiz: IQ test', dashOutput: 'iqValue', tryAgainIsCleanPrevious: true});
            Auth.stores.push(this.model)
        }
    }

    render() {
        if(!this.model){
             return(<div/>)
        }

        return (
            <CardWrapper store={this.model}/>
        )
    }
}

export default DCard;
