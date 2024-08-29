// # Profile State
/**
 * @typedef {Object} ProfileData
 * @property {string} name - username
 * @property {number} age - user age
 * @property {string} profilePicSrc - imgSrc of user
 */

/**
 * @typedef {function(ProfileData|function(ProfileData):ProfileData):void} SetProfileData
 */

/**
 * @typedef {[ProfileData, SetProfileData]} ProfileDataState
 */


// ContextState
/**
 * @typedef {Object} GlobalContextType
 * @property {ProfileData} profileData - The profile data of the user
 * @property {SetProfileData} setProfileData - set profile data
 * @property {boolean} noEscape - A boolean flag
 * @property {function(boolean): void} setNoEscape - Function to update the noEscape flag
 */


export {}