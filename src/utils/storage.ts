const storage = {
	get(key: string) {
		const value = localStorage.getItem(key);
	
		if (!value) {
			return null;
		}
		return JSON.parse(value);
	},
  
	set(key: string, value: string) {
	  	localStorage.setItem(key, JSON.stringify(value));
	},
  
	remove(key: string) {
	  	localStorage.removeItem(key);
	},
  
	clear() {
	  	localStorage.clear();
	},
};
  
export default storage;
  