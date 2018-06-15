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

        let slug = match.url;
        if(slug[slug.length-1] == '/'){
            slug = slug.substring(0, slug.length-1);
        } 


        if(/^\/polls/.test(match.path)){
            this.model = new Cards({getIds: Api.getCardByIds(`${slug}/v1`), cardSlug: `${slug}/v1`,tryAgainIsCleanPrevious: false});
        }

        if(/^\/quizzes/.test(match.path)){

            this.model = new Cards({getIds: Api.getCardByIds(`${slug}/v1`), cardSlug: `${slug}/v1`,
             tryAgainIsCleanPrevious: true});
        }

        if(/^\/embed/.test(match.path)){

            slug = `/${match.params.cardtype}/${match.params.id}/v1`;

            if(match.params.cardtype == 'polls'){
                this.model = new Cards({getIds: Api.getCardByIds(slug), cardSlug: slug, tryAgainIsCleanPrevious: false, embed: true});
            }

            if(match.params.cardtype == 'quizzes'){

                this.model = new Cards({getIds: Api.getCardByIds(slug), cardSlug: slug, tryAgainIsCleanPrevious: true, embed: true});
            }
        }

        Auth.stores.push(this.model)
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
