import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { getCurrentUser, updateCurrentUser } from "../actions/index";
import { axiosWithAuth } from "../utils/axiosWithAuth";

//Styles
import '../sass/CurrentSeekerProfile.scss';

class CurrentSeekerProfile extends Component {
    state = {
        init: false,
        edit: false,
        newInterest: "",
        newSkill: "",
        newProjects: "",
        newExperience: {
            name: "",
            title: "",
            description: "",
        },
        newEducation: {
            school: "",
            certificate: ""
        },
        newReference: {
            name: "",
            relationship: "",
            phone: "",
            email: "",
        },
        updatedProfile: {
            first_name: "string",
            last_name: "string",
            position: "string",
            location: "string",
            bio: "string",
            job_type: "string",
            contact_info: {
                phone_number: "string",
                email: "string"
            },
            interests: [],
            past_experience: [
                {
                    name: "string",
                    title: "string",
                    description: "string"
                }
            ],
            education: [
                {
                    school: "string",
                    certificate: "string"
                }
            ],
            skills: [],
            references: [
                {
                    name: "string",
                    relationship: "string",
                    phone: "string",
                    email: "string"
                }
            ],
            social_media: {},
            portfolio: "string",
            resume: "string",
            projects: [],
            niche: -1,
            seen: false,
            timestamp: "string"
        }
    };

    // componentWillMount() {
    //     this.props.getCurrentUser();
    // }

    componentWillUpdate(prevProps, prevState) {
        if (
            this.props.seeker.id &&
            !this.state.init &&
            this.props.seeker !== this.state.updatedProfile
        ) {
            console.log(`IF YOU SEE THIS MORE OR LESS THAN ONCE YOU HAVE A PROBLEM`);
            this.setState({
                ...this.state,
                updatedProfile: { ...this.props.seeker },
                init: true
            });
        }
    }

    edit = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: true,
            updatedProfile: { ...this.props.seeker }
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

    handleBaseStateChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    addInterest = e => {
        e.preventDefault();
        const newProfile = {
            ...this.state.updatedProfile,
            interests: [...this.state.updatedProfile.interests, this.state.newInterest]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
            newInterest: ''
        }))
        this.props.updateCurrentUser(newProfile);
    };

    removeInterest = (e, i) => {
        e.preventDefault();
        const newArray = this.state.updatedProfile.interests.filter(
            (interest, index) => {
                if (index === i) {
                    return false;
                } else {
                    return true;
                }
            }
        )
        const newProfile = {
            ...this.state.updatedProfile,
            interests: [...newArray]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    }

    addSkill = e => {
        e.preventDefault();
        const newProfile = {
            ...this.state.updatedProfile,
            skills: [...this.state.updatedProfile.skills, this.state.newSkill]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
            newSkill: ''
        }))
        this.props.updateCurrentUser(newProfile);
    };

    removeSkill = (e, i) => {
        e.preventDefault();
        const newArray = this.state.updatedProfile.skills.filter(
            (skill, index) => {
                if (index === i) {
                    return false;
                } else {
                    return true;
                }
            }
        )
        const newProfile = {
            ...this.state.updatedProfile,
            skills: [...newArray]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    }

    addProject = e => {
        e.preventDefault();
        const projjies = this.state.updatedProfile.projects
        const newProfile = {
            ...this.state.updatedProfile,
            projects: projjies ?
                [...projjies, this.state.newProject]
                :
                [this.state.newProject]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
            newProject: ''
        }))
        this.props.updateCurrentUser(newProfile);
    };

    removeProject = (e, i) => {
        e.preventDefault();
        const newArray = this.state.updatedProfile.projects.filter(
            (skill, index) => {
                if (index === i) {
                    return false;
                } else {
                    return true;
                }
            }
        )
        const newProfile = {
            ...this.state.updatedProfile,
            projects: [...newArray]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    }

    handleExperienceChanges = (e, i) => {
        const saveEventTarget = e.target;
        this.setState(prevState => ({
            ...prevState,
            updatedProfile: {
                ...prevState.updatedProfile,
                past_experience: prevState.updatedProfile.past_experience.map(
                    (experience, index) => {
                        if (index === i) {
                            return {
                                ...experience,
                                [saveEventTarget.name]: saveEventTarget.value
                            };
                        } else {
                            return experience;
                        }
                    }
                )
            }
        }));
    };

    addExperience = e => {
        e.preventDefault();
        const newProfile = {
            ...this.state.updatedProfile,
            past_experience: [...this.state.updatedProfile.past_experience, this.state.newExperience]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    };

    removeExperience = (e, i) => {
        e.preventDefault();
        const newArray = this.state.updatedProfile.past_experience.filter(
            (experience, index) => {
                if (index === i) {
                    return false;
                } else {
                    return true;
                }
            }
        )
        const newProfile = {
            ...this.state.updatedProfile,
            past_experience: [...newArray]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    }

    addEducation = e => {
        e.preventDefault();
        const newProfile = {
            ...this.state.updatedProfile,
            education: [...this.state.updatedProfile.education, this.state.newEducation]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    };

    removeEducation = (e, i) => {
        e.preventDefault();
        const newArray = this.state.updatedProfile.education.filter(
            (experience, index) => {
                if (index === i) {
                    return false;
                } else {
                    return true;
                }
            }
        )
        const newProfile = {
            ...this.state.updatedProfile,
            education: [...newArray]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    }

    handleEducationChanges = (e, i) => {
        const saveEventTarget = e.target;
        this.setState(prevState => ({
            ...prevState,
            updatedProfile: {
                ...prevState.updatedProfile,
                education: prevState.updatedProfile.education.map(
                    (education, index) => {
                        if (index === i) {
                            return {
                                ...education,
                                [saveEventTarget.name]: saveEventTarget.value
                            };
                        } else {
                            return education;
                        }
                    }
                )
            }
        }));
    };

    addReference = e => {
        e.preventDefault();
        const newProfile = {
            ...this.state.updatedProfile,
            references: [...this.state.updatedProfile.references, this.state.newReference]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    };

    removeReference = (e, i) => {
        e.preventDefault();
        const newArray = this.state.updatedProfile.references.filter(
            (reference, index) => {
                if (index === i) {
                    return false;
                } else {
                    return true;
                }
            }
        )
        const newProfile = {
            ...this.state.updatedProfile,
            references: [...newArray]
        }
        this.setState((prevState) => ({
            ...prevState,
            updatedProfile: newProfile,
        }))
        this.props.updateCurrentUser(newProfile);
    }

    handleReferenceChanges = (e, i) => {
        const saveEventTarget = e.target;
        this.setState(prevState => ({
            ...prevState,
            updatedProfile: {
                ...prevState.updatedProfile,
                references: prevState.updatedProfile.references.map(
                    (reference, index) => {
                        if (index === i) {
                            return {
                                ...reference,
                                [saveEventTarget.name]: saveEventTarget.value
                            };
                        } else {
                            return reference;
                        }
                    }
                )
            }
        }));
    };

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

    cancel = event => {
        event.preventDefault();
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.seeker
                // past_experience: [...this.props.seeker.past_experience]
            }
        });
    };

    updateUser = event => {
        event.preventDefault();
        this.props.getCurrentUser();
        this.setState({
            ...this.state,
            updatedProfile: {
                ...this.props.seeker,
                id: undefined,
                user_id: undefined
            }
        });
        console.log(this.state.updatedProfile);
        this.props.updateCurrentUser(this.state.updatedProfile);
        this.setState({
            ...this.state,
            edit: false,
            updatedProfile: {
                ...this.props.seeker
            }
        });
    };

    render() {
        if (this.props.seeker.first_name === undefined) {
            //setTimeout(()=>{if(this.props.seeker.first_name === undefined) this.setState(...this.state)}, 1000)
            console.log(this.props.fetching + "HEOOOOEOEOOE ");
            if(!this.props.fetching && localStorage.getItem('userType'))this.props.getCurrentUser();
            return <div>LOADING</div>
        }
        // if (!this.props.seeker.first_name) {
        //     return <div className="loading">Loading</div>
        // }
        return (
            <div className='Seeker'>
                {this.props.seeker && (<>
                    <div className="seeker-head">
                        <div className="img">
                            <h1>{this.props.seeker.first_name.charAt(0)}</h1>
                        </div>
                        <div className="key-info">
                            <div className="name">
                                {!this.state.edit ? (
                                    <>
                                        {this.props.seeker.first_name}, {this.props.seeker.last_name}
                                    </>
                                ) : (
                                        <form onSubmit={this.updateUser}>
                                            <strong><p>First Name</p></strong>
                                            <input
                                                name="first_name"
                                                type="text"
                                                value={this.state.updatedProfile.first_name}
                                                onChange={this.handleChanges}
                                            />
                                            <strong><p>Second Name</p></strong>
                                            <input
                                                name="last_name"
                                                type="text"
                                                value={this.state.updatedProfile.last_name}
                                                onChange={this.handleChanges}
                                            />
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>
                                    )}
                            </div>
                            <div className="position">
                                {!this.state.edit ? (
                                    <>{this.props.seeker.position}</>
                                ) : (
                                        <form onSubmit={this.updateUser}>
                                            <strong><p>Position</p></strong>
                                            <input
                                                name="position"
                                                type="text"
                                                value={this.state.updatedProfile.position}
                                                onChange={this.handleChanges}
                                            />
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>
                                    )}
                            </div>
                            <div className="location">
                                {!this.state.edit ? (
                                    <>{this.props.seeker.location}</>
                                ) : (
                                        <form onSubmit={this.updateUser}>
                                            <strong><p>Location</p></strong>
                                            <input
                                                name="location"
                                                type="text"
                                                value={this.state.updatedProfile.location}
                                                onChange={this.handleChanges}
                                            />
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>
                                    )}
                            </div>
                        </div>
                    </div>
                    {!this.state.edit ? (
                        <input type="button" value="EDIT" onClick={this.edit} />
                    ) : (
                            <form onSubmit={this.updateUser}>
                                <input type="submit" value="SUBMIT" />
                                <input type="button" value="CANCEL" onClick={this.cancel} />
                            </form>
                        )}
                    <div className="description">
                        <div className="bio">
                            {!this.state.edit ? (
                                <>
                                    <strong><p>Biography</p></strong>
                                    <p>{this.props.seeker.bio}</p>
                                </>
                            ) : (
                                    <form onSubmit={this.updateUser}>
                                        <strong><p>Biography</p></strong>
                                        <textarea
                                            name="bio"
                                            type="text"
                                            value={this.state.updatedProfile.bio}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: "none" }} />
                                    </form>
                                )}
                        </div>
                        {this.props.seeker.contact_info && (
                            <div className="contact">
                                {!this.state.edit ? (
                                    <>
                                        <p>
                                            <strong><p>Phone</p></strong>
                                            {this.props.seeker.contact_info.phone_number}
                                        </p>
                                        <p>
                                            <strong><p>Email</p></strong>
                                            {this.props.seeker.contact_info.email}
                                        </p>
                                    </>
                                ) : (
                                        <form onSubmit={this.updateUser}>
                                            <div>
                                                <strong><p>Phone</p></strong>
                                                <input
                                                    name="phone_number"
                                                    type="text"
                                                    value={this.state.updatedProfile.contact_info.phone_number}
                                                    onChange={this.handleContactChanges}
                                                />
                                            </div>
                                            <div>
                                                <strong><p>Email</p></strong>
                                                <input
                                                    name="email"
                                                    type="text"
                                                    value={this.state.updatedProfile.contact_info.email}
                                                    onChange={this.handleContactChanges}
                                                />
                                                <input type="submit" style={{ display: "none" }} />
                                            </div>
                                        </form>
                                    )}
                            </div>
                        )}
                        <div className="interests">
                            <strong><p>Interests</p></strong>
                            {!this.state.edit ? (<></>) : (
                                <div className="add-interest">
                                    <form onSubmit={this.addInterest}>
                                        <strong><p>Add New Interest</p></strong>
                                        <div>
                                            <input
                                                name="newInterest"
                                                type="text"
                                                value={this.state.newInterest}
                                                onChange={this.handleBaseStateChanges}
                                            />
                                            <input type="submit" value="+" />
                                        </div>
                                    </form>
                                </div>
                            )}
                            {this.props.seeker.interests &&
                                this.props.seeker.interests.map((interest, index) => (
                                    <div>
                                        <div className="interest" key={`interest ${index}`}>
                                            {interest}
                                        </div>
                                        {!this.state.edit ? (
                                            <></>
                                        ) : (
                                                <button onClick={e => this.removeInterest(e, index)}>X</button>
                                            )}
                                    </div>
                                ))}
                        </div>
                        <div className="experiences">
                            <strong><p>Experiences</p></strong>
                            {!this.state.edit ? (
                                <></>
                            ) : (
                                    <>
                                        <button onClick={this.addExperience}>Add Experience</button>
                                    </>
                                )}
                            {this.props.seeker.past_experience &&
                                this.props.seeker.past_experience.map((experience, index) => (
                                    <div className="experience" key={`experience ${index}`}>
                                        {this.state.updatedProfile.past_experience[index] && (<>
                                            {!this.state.edit ? (
                                                <>
                                                    <h3>{experience.name}</h3>
                                                    <h5>{experience.title}</h5>
                                                    <p>{experience.description}</p>
                                                </>
                                            ) : (
                                                    <form onSubmit={this.updateUser}>
                                                        <input onClick={e => this.removeExperience(e, index)} type="button" value="X" />
                                                        <strong><p>Company Name</p></strong>
                                                        <input
                                                            name="name"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Company"
                                                            value={
                                                                this.state.updatedProfile.past_experience[index].name
                                                            }
                                                            onChange={e => this.handleExperienceChanges(e, index)}
                                                        />
                                                        <strong><p>Title</p></strong>
                                                        <input
                                                            name="title"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Job Title"
                                                            value={
                                                                this.state.updatedProfile.past_experience[index].title
                                                            }
                                                            onChange={e => this.handleExperienceChanges(e, index)}
                                                        />
                                                        <strong><p>Description</p></strong>
                                                        <textarea
                                                            name="description"
                                                            id={index}
                                                            type="text"
                                                            placeholder="About"
                                                            value={
                                                                this.state.updatedProfile.past_experience[index]
                                                                    .description
                                                            }
                                                            onChange={e => this.handleExperienceChanges(e, index)}
                                                        />
                                                        <input type="submit" style={{ display: "none" }} />
                                                    </form>
                                                )}</>)}
                                    </div>
                                ))}
                        </div>
                        <div className="educations">
                            <strong><p>Education</p></strong>
                            {!this.state.edit ? (
                                <></>
                            ) : (
                                    <>
                                        <button onClick={this.addEducation}>Add School</button>
                                    </>
                                )}
                            {this.props.seeker.education &&
                                this.props.seeker.education.map((education, index) => (
                                    <div className="education" key={`education-${index}`}>
                                        {this.state.updatedProfile.education[index] && (<>
                                            {!this.state.edit ? (
                                                <>
                                                    <h3>{education.school}</h3>
                                                    <p>{education.certificate}</p>
                                                </>
                                            ) : (
                                                    <form onSubmit={this.updateUser}>
                                                        <input onClick={e => this.removeEducation(e, index)} type="button" value="X" />
                                                        <strong><p>School</p></strong>
                                                        <input
                                                            name="school"
                                                            id={index}
                                                            type="text"
                                                            placeholder="School"
                                                            value={
                                                                this.state.updatedProfile.education[index].school
                                                            }
                                                            onChange={e => this.handleEducationChanges(e, index)}
                                                        />
                                                        <strong><p>Certificate</p></strong>
                                                        <input
                                                            name="certificate"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Degree, Certificate, etc."
                                                            value={
                                                                this.state.updatedProfile.education[index].certificate
                                                            }
                                                            onChange={e => this.handleEducationChanges(e, index)}
                                                        />
                                                        <input type="submit" style={{ display: "none" }} />
                                                    </form>
                                                )}</>)}
                                    </div>
                                ))}
                        </div>
                        <div className="skills">
                            <strong><p>Skills</p></strong>
                            {!this.state.edit ? (<></>) : (
                                <div className="add-skill">
                                    <form onSubmit={this.addSkill}>
                                        <strong><p>Add Skill</p></strong>
                                        <div>
                                            <input
                                                name="newSkill"
                                                type="text"
                                                value={this.state.newSkill}
                                                onChange={this.handleBaseStateChanges}
                                            />
                                            <input type="submit" value="+" />
                                        </div>
                                    </form>
                                </div>
                            )}
                            {this.props.seeker.skills &&
                                this.props.seeker.skills.map((skill, index) => (
                                    <>
                                        <div className="skill" key={`Skill ${index}`}>
                                            {skill}
                                        </div>
                                        {!this.state.edit ? (
                                            <></>
                                        ) : (
                                                <button onClick={e => this.removeSkill(e, index)}>X</button>
                                            )}
                                    </>
                                ))}
                        </div>
                        <div className="references">
                            <strong><p>References</p></strong>
                            {!this.state.edit ? (
                                <></>
                            ) : (
                                    <>
                                        <button onClick={this.addReference}>Add Reference</button>
                                    </>
                                )}
                            {this.props.seeker.references &&
                                this.props.seeker.references.map((reference, index) => (
                                    <div className="reference" key={`reference-${index}`}>
                                        {this.state.updatedProfile.references[index] && (<>
                                            {!this.state.edit ? (
                                                <>
                                                    <h3>{reference.name}</h3>
                                                    <h4>{reference.relationship}</h4>
                                                    <p><strong>Phone: </strong>{reference.phone}</p>
                                                    <p><strong>Email: </strong>{reference.email}</p>
                                                </>
                                            ) : (
                                                    <form onSubmit={this.updateUser}>
                                                        <input onClick={e => this.removeReference(e, index)} type="button" value="X" />
                                                        <strong><p>Reference Name</p></strong>
                                                        <input
                                                            name="name"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Name"
                                                            value={
                                                                this.state.updatedProfile.references[index].name
                                                            }
                                                            onChange={e => this.handleReferenceChanges(e, index)}
                                                        />
                                                        <strong><p>Relationship</p></strong>
                                                        <input
                                                            name="relationship"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Relationship"
                                                            value={
                                                                this.state.updatedProfile.references[index].relationship
                                                            }
                                                            onChange={e => this.handleReferenceChanges(e, index)}
                                                        />
                                                        <strong><p>Phone</p></strong>
                                                        <input
                                                            name="phone"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            value={
                                                                this.state.updatedProfile.references[index].phone
                                                            }
                                                            onChange={e => this.handleReferenceChanges(e, index)}
                                                        />
                                                        <strong><p>Email</p></strong>
                                                        <input
                                                            name="email"
                                                            id={index}
                                                            type="text"
                                                            placeholder="Email"
                                                            value={
                                                                this.state.updatedProfile.references[index].email
                                                            }
                                                            onChange={e => this.handleReferenceChanges(e, index)}
                                                        />
                                                        <input type="submit" style={{ display: "none" }} />
                                                    </form>
                                                )}</>)}
                                    </div>
                                ))}
                        </div>
                        <div className="social">
                            <strong><p>Social Links</p></strong>
                            {this.props.seeker.social_media && (<>
                                {!this.state.edit ? (
                                    <>
                                        {this.props.seeker.social_media.facebook && (
                                            <p>{this.props.seeker.social_media.facebook}</p>
                                        )}
                                        {this.props.seeker.social_media.linkedin && (
                                            <p>{this.props.seeker.social_media.linkedin}</p>
                                        )}
                                        {this.props.seeker.social_media.twitter && (
                                            <p>{this.props.seeker.social_media.twitter}</p>
                                        )}
                                        {this.props.seeker.social_media.github && (
                                            <p>{this.props.seeker.social_media.github}</p>
                                        )}
                                    </>
                                ) : (
                                        <form onSubmit={this.updateUser}>
                                            <strong><p>Facebook</p></strong>
                                            <input
                                                type="text"
                                                name="facebook"
                                                value={this.state.updatedProfile.social_media.facebook}
                                                placeholder="Facebook"
                                                onChange={this.handleSocialMediaChanges}
                                            />
                                            <strong><p>LinkedIn</p></strong>
                                            <input
                                                type="text"
                                                name="linkedin"
                                                value={this.state.updatedProfile.social_media.linkedin}
                                                placeholder="LinkedIn"
                                                onChange={this.handleSocialMediaChanges}
                                            />
                                            <strong><p>Twitter</p></strong>
                                            <input
                                                type="text"
                                                name="twitter"
                                                value={this.state.updatedProfile.social_media.twitter}
                                                placeholder="Twitter"
                                                onChange={this.handleSocialMediaChanges}
                                            />
                                            <strong><p>Github</p></strong>
                                            <input
                                                type="text"
                                                name="github"
                                                value={this.state.updatedProfile.social_media.github}
                                                placeholder="GitHub"
                                                onChange={this.handleSocialMediaChanges}
                                            />
                                            <input type="submit" style={{ display: "none" }} />
                                        </form>
                                    )}</>)}
                        </div>
                        <div className="portfolio">
                            <strong><p>Portfolio</p></strong>
                            {!this.state.edit ? (
                                <>
                                    <p>
                                        {this.props.seeker.portfolio}
                                    </p>
                                </>
                            ) : (
                                    <form onSubmit={this.updateUser}>
                                        <strong><p>Portfolio</p></strong>
                                        <input
                                            name="portfolio"
                                            type="text"
                                            value={this.state.updatedProfile.portfolio}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: "none" }} />
                                    </form>
                                )}
                        </div>
                        <div className="resume">
                            <strong><p>Resume</p></strong>
                            {!this.state.edit ? (
                                <>
                                    <p>
                                        {this.props.seeker.resume}
                                    </p>
                                </>
                            ) : (
                                    <form onSubmit={this.updateUser}>
                                        <strong><p>Resume</p></strong>
                                        <input
                                            name="resume"
                                            type="text"
                                            value={this.state.updatedProfile.resume}
                                            onChange={this.handleChanges}
                                        />
                                        <input type="submit" style={{ display: "none" }} />
                                    </form>
                                )}
                        </div>
                        <div className="projects">
                            <strong><p>Project Links</p></strong>
                            {!this.state.edit ? (<></>) : (
                                <div className="add-project">
                                    <form onSubmit={this.addProject}>
                                        <strong><p>Add Project Link</p></strong>
                                        <input
                                            name="newProject"
                                            type="text"
                                            value={this.state.newProject}
                                            onChange={this.handleBaseStateChanges}
                                        />
                                        <input type="submit" value="+" />
                                    </form>
                                </div>
                            )}
                            {this.props.seeker.projects &&
                                this.props.seeker.projects.map((project, index) => (
                                    <div>
                                        <div className="project" key={`project ${index}`}>
                                            {project}
                                        </div>
                                        {!this.state.edit ? (
                                            <></>
                                        ) : (
                                                <button onClick={e => this.removeProject(e, index)}>X</button>
                                            )}
                                    </div>
                                ))}
                        </div>
                    </div>{this.state.edit &&
                        <form onSubmit={this.updateUser}>
                            <input type="submit" value="SUBMIT" />
                            <input type="button" value="CANCEL" onClick={this.cancel} />
                        </form>
                    }
                </>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        seeker: state.userReducer.currentUser,
        fetching: state.userReducer.gettingUser
    };
};

export default connect(
    mapStateToProps,
    { getCurrentUser, updateCurrentUser }
)(CurrentSeekerProfile);
