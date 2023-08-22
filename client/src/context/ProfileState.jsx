import PropTypes from 'prop-types'

import ProfileContext from "./ProfileContext";

const ProfileState = ({children}) =>{
    const profileData = {name: 'Bandree Topiwala', age: 18}

    return(
        <ProfileContext.Provider value={profileData}>
            {children}
        </ProfileContext.Provider>
    )
}

ProfileState.propTypes = {
    children: PropTypes.element
}

export default ProfileState;