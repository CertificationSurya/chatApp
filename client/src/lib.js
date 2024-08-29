const storageKey = "chat_profile"

export const loadProfile = () => {
	const profileData = localStorage.getItem(storageKey);
	// console.log(profileData);
    return JSON.parse(profileData)

};

export const setProfile = (data) => {
    localStorage.setItem(storageKey, JSON.stringify(data))
};
