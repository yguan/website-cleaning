# website-cleaning
This repository contains JavaScript snippets that allow you to clean up the websites you care.

## LinkedIn Cleaner
linkedIn-cleaner.js allow you to remove ads and people's posts from you LinkedIn home page.

#### Usage
* Copy this JavaScript from [linkedIn-cleaner.js](https://raw.githubusercontent.com/yguan/website-cleaning/master/linkedIn-cleaner.js).
* Navigate to your LinkedIn home page.
* Paste it to the Chrome browser's console.
* Press the entery key.
* Wait for "Cleaning is done." message from the console.

#### Customization
You can change the configuration of the *clean* method to remove posts differently.

``` javascript
	clean({
	    scrollDownToPixels: 20000, // 20,000
		nDaysAgo: 5,
		namesToRemove: ['name 1', 'name 2']
	});
```
