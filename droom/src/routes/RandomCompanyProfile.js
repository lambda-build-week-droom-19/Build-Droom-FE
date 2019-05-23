import React, { Component } from 'react'
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { getCurrentUser, updateCurrentUser, getEmployerJobs, SERVER_BASE_URL } from '../actions/index';

class CurrentCompanyProfile extends Component {
    state = {
        edit: false,
        init: false,
        updatedProfile: {
            name: 'string',
            about: 'string',
            contact_info: {
                phone_number: 'string',
                email: 'string'
            },
            social_media: {},
            website: 'string'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.company.id &&
            !this.state.init &&
            this.props.company !== this.state.updatedProfile) {
            console.log(`IF YOU SEE THIS MORE THAN ONCE OR LESS THAN ONCE, YOU HAVE A PROBLEM`)
            this.setState({
                ...this.state,
                updatedProfile: { ...this.props.company },
                init: true,
            })
            this.props.getEmployerJobs(this.props.company.user_id);
        }
    }

    componentWillMount() {
        this.props.getCurrentUser();
    }

    edit = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: true,
            updatedProfile: { ...this.props.company }
        });
    };

    updateUser = event => {
        event.preventDefault();
        this.props.getCurrentUser();
        this.setState({
            ...this.state,
            updatedProfile: {
                ...this.props.company,
                id: undefined,
                user_id: undefined,
            }
        })
        console.log(this.state.updatedProfile);
        this.props.updateCurrentUser(this.state.updatedProfile);
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.company,
            }
        })
    };

    cancel = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.company,
            }
        });
    };

    handleChanges = e => {
        this.setState({
            updatedProfile: {
                ...this.state.updatedProfile,
                [e.target.name]: e.target.value
            }
        });
    };

    handleContactChanges = e => {
        this.setState({
            updatedProfile: {
                ...this.state.updatedProfile,
                contact_info: {
                    ...this.state.updatedProfile.contact_info,
                    [e.target.name]: e.target.value
                }
            }
        });
    };

    createJob = e => {
        e.preventDefault();
        axiosWithAuth(localStorage.getItem('userID'))
            .post(`${SERVER_BASE_URL}/jobs`)
            .then(res => {
                console.log('CREATE JOB')
                console.log(res)
                this.props.history.push(`jobs/${res.data.id}`)
            })
            .catch(err => {
                console.log('CREATE JOB ERROR')
                console.log(err)
            })
    }

    deleteJob = id => {
        console.log(id);
        axiosWithAuth(localStorage.getItem('userID'))
            .delete(`${SERVER_BASE_URL}/jobs/${id}`)
            .then( res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        this.props.getEmployerJobs(this.props.company.user_id);
    }

    handleSocialMediaChanges = e => {
        this.setState({
            updatedProfile: {
                ...this.state.updatedProfile,
                social_media: {
                    ...this.state.updatedProfile.social_media,
                    [e.target.name]: e.target.value
                }
            }
        });
    };

    render() {
        return (
            <>
                <div className="name">
                    {!this.state.edit ? (<>
                        <h1>{this.props.company.name}</h1>
                    </>) : (
                            <form onSubmit={this.updateUser}>
                                <input
                                    name="name"
                                    type="text"
                                    value={this.state.updatedProfile.name}
                                    onChange={this.handleChanges}
                                />
                                <input type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                </div>
                {/* LOCATION */}
                <div className="about">
                    {!this.state.edit ? (<>
                        <h3>About</h3>
                        <p>{this.props.company.about}</p>
                    </>) : (
                            <form onSubmit={this.updateUser}>
                                <textarea
                                    name="about"
                                    type="text"
                                    value={this.state.updatedProfile.about}
                                    onChange={this.handleChanges}
                                />
                                <input type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                </div>
                {this.props.company.contact_info &&
                    <div className="contact">
                        {!this.state.edit ? (<>
                            <h3>Contact Info</h3>
                            <p>{this.props.company.contact_info.phone}</p>
                            <p>{this.props.company.contact_info.email}</p>
                        </>) : (
                                <form onSubmit={this.updateUser}>
                                    <input
                                        name="phone"
                                        type="text"
                                        value={this.state.updatedProfile.contact_info.phone}
                                        onChange={this.handleContactChanges}
                                    />
                                    <input
                                        name="email"
                                        type="text"
                                        value={this.state.updatedProfile.contact_info.email}
                                        onChange={this.handleContactChanges}
                                    />
                                    <input type="submit" style={{ display: 'none' }} />
                                </form>
                            )}
                    </div>
                }
                <div className="social">
                            {this.props.company.social_media &&(<>
                            {!this.state.edit ? (
                                <>
                                    {this.props.company.social_media.facebook && (
                                        <p>{this.props.company.social_media.facebook}</p>
                                    )}
                                    {this.props.company.social_media.linkedin && (
                                        <p>{this.props.company.social_media.linkedin}</p>
                                    )}
                                    {this.props.company.social_media.twitter && (
                                        <p>{this.props.company.social_media.twitter}</p>
                                    )}
                                    {this.props.company.social_media.github && (
                                        <p>{this.props.company.social_media.github}</p>
                                    )}
                                </>
                            ) : (
                                    <form onSubmit={this.updateUser}>
                                        <input
                                            name="facebook"
                                            value={this.state.updatedProfile.social_media.facebook}
                                            placeholder="Facebook"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input
                                            name="linkedin"
                                            value={this.state.updatedProfile.social_media.linkedin}
                                            placeholder="LinkedIn"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input
                                            name="twitter"
                                            value={this.state.updatedProfile.social_media.twitter}
                                            placeholder="Twitter"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input
                                            name="github"
                                            value={this.state.updatedProfile.social_media.github}
                                            placeholder="GitHub"
                                            onChange={this.handleSocialMediaChanges}
                                        />
                                        <input type="submit" style={{ display: "none" }} />
                                    </form>
                                )}</>)}
                        </div>
                <div className="name">
                    {!this.state.edit ? (<>
                        <p>{this.props.company.website}</p>
                    </>) : (
                            <form onSubmit={this.updateUser}>
                                <input
                                    name="website"
                                    type="text"
                                    value={this.state.updatedProfile.website}
                                    onChange={this.handleChanges}
                                />
                                <input type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                </div>

                {!this.state.edit ? (
                    <input type="button" value="EDIT" onClick={this.edit} />
                ) : (
                        <form onSubmit={this.updateUser}>
                            <input type="submit" value="SUBMIT" />
                            <input type="button" value="CANCEL" onClick={this.cancel} />
                        </form>
                    )}
                <div className="jobs">
                    {!this.state.edit ? (
                        <></>
                    ) : (
                        <button onClick={this.createJob}>Create Job</button>
                    )}
                    {this.props.jobs.map(job => (
                        <>
                            <h3>{job.job_title}</h3>
                            <p>{job.location}</p>
                            {!this.state.edit ?(
                                <></>
                            ) : (
                                <button onClick={() => this.deleteJob(job.id)}>X</button>
                            )}
                        </>
                    ))}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        company: state.userReducer.currentUser,
        jobs: state.employerJobReducer.jobs
    };
};

export default connect(
    mapStateToProps,
    {
        getCurrentUser,
        updateCurrentUser,
        getEmployerJobs,
    }
)(CurrentCompanyProfile);