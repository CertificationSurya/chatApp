/**
 * @typedef {import('../../js_docs/contextType.js').GlobalContextType GlobalContextType}
 * @typedef {import('../../js_docs/contextType.js').ProfileData ProfileData}
 * @typedef {import('../../js_docs/contextType.js').SetProfileData SetProfileData}
 * @typedef {import('../../js_docs/contextType.js').ProfileDataState ProfileDataState}
 */

import PropTypes from "prop-types";

import {useEffect, useState, createContext, useContext} from "react";
import {loadProfile, setProfile} from "../lib.js";

/** @type {GlobalContextType} */
const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
	const [noEscape, setNoEscape] = useState(false);

	/** @type {ProfileDataState} */
	const [profileData, updateProfileData] = useState({
		name: "Bandree Topiwala",
		age: 18,
		profilePicSrc: "/assets/default.png",
	});

	useEffect(() => {
		const loadedProfile = loadProfile();
		if (loadedProfile) {
			// load from localStorage
			updateProfileData(loadedProfile);
		} else {
			// set in localStorage
			setProfile(profileData);
		}
	}, []);

	/** @param {ProfileData} updatedProfileData */
	const setProfileData = (updatedProfileData) => {
		updateProfileData(updatedProfileData)
		setProfile(updatedProfileData)
	}

	return (
		<GlobalContext.Provider
			value={{profileData, setProfileData, noEscape, setNoEscape}}>
			{children}
		</GlobalContext.Provider>
	);
};

GlobalProvider.propTypes = {
	children: PropTypes.element,
};

export default GlobalProvider;

export const useGlobalContext = () => {
	/**@type {GlobalContextType} */
	const content = useContext(GlobalContext);

	return content;
};
