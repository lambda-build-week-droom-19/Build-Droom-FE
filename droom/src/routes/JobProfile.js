import React from "react";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {getJob,getNiches} from "../actions";

class JobProfile extends React.Component
{
    componentWillMount()
    {
        console.log(this.props.match.params.id);
        this.props.getJob(this.props.match.params.id);
    }
/*     { 
        user_id: integer(references employer id), 
        job_title: string, 
        location: string, 
        requirements: string, 
        niche: integer(references niche id), 
        seen: boolean 
    } */
    render()
    {
        let obj = this.props.currentJob;
        console.log(this.props.gettingJob);
        if(this.props.gettingJob) return <div></div>;
        if(this.props.error==!"" || obj.job_title === "" || Object.keys(obj).length <= 0 || obj === {} || obj === undefined) return <Redirect to="/" />;
        return(
        <div>
            <h2>{obj.job_title}</h2>
            <div>{obj.location}</div>
            <h5>Staring Pay</h5>
            <div>{obj.starting_pay}</div>
            <div></div> {/* Horizontal line */}
            <h5>Description</h5>
            <div>{obj.description}</div>
            <div></div> {/* Horizontal line */}
            <h5>Responsibilities</h5>
            <ul>
                {   
                obj.responsibilites && obj.responsibilites.length ? obj.responsibilites.map(x=>
                    <li>
                        {x}
                    </li>    
                ) : 
                    <div>None</div>
                }
            </ul>
            <div></div> {/* Horizontal line */}
            <h5>Required Skills</h5>
            {   
                 obj.required_skills && obj.required_skills.length ? obj.required_skills.map(x=>
                    <div>{x}</div>
                ) : 
                <div>None</div>
            }

        </div>
        );
    }
}

const mapStateToProps = state =>
{
    return {...state.getJob, ...state.getNiches}
}

export default connect(mapStateToProps, {getJob, getNiches})(JobProfile);