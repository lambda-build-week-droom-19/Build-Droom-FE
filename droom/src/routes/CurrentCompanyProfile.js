import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getCurrentUser } from '../actions/index';

class CurrentCompanyProfile extends Component {

    componentWillMount() {
        this.props.getCurrentUser();
    }

    render() {
        return (
            <>
                <div className="company-head">
                    <div className="profile-pic"></div>
                    <div className="key-info">
                        <div className="company-name">{this.props.company.name}</div>
                    </div>
                </div>
                <div className="description">
                    <div className="bio">{this.props.company.bio}</div>
                    <div className="info">Basic Info</div>
                    {/* <div className="contact">{this.props.company.contact_info}</div> */}
                    {/* <div className="social-media">{this.props.company.social_media}</div> */}
                    <div className="website">{this.props.company.website}</div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		company: state.getUser.currentUser
	};
};

export default connect(
    mapStateToProps,
    { getCurrentUser }
)(CurrentCompanyProfile);