# Calendar Component
**!! This project is still in process !!**

To run this project:
```bash
#npm
npm install # install dependencies
npm run dev # set up a hot-dev-server on localhost:8080 

#yarn
yarn install # install dependencies
yarn run dev # set up a hot-dev-server on localhost:8080 
```

Build static minified Javascript file( bundle.js) for production, and run it:
```bash
npm build # build file
npm start # set up a server which serves the build file on localhost: 5000

```
----
Props
------

|Name |Type  |Default   |Description   |
|---|---|---|---|
|date   |string   |null   |Date selected in calendar. This value Should be in ISO format "YYYY-MM-DD".   |
|containerStyle   |object   |{}   |Customized calendar conatiner style   |
|weekdaysContainerStyle   |object   |{}   |Customized weekdays conatiner style   |
|toolbarContainerStyle   |object   |{}   |Customized toolbar conatiner style   |
|onYearChange   |function   |()=>{}   |Callback of user selecting a year, for more details see "OnChange Callbacks" section.   |
|onMonthChange   |function   |()=>{}   |Callback of user selecting a month, for more details see "OnChange Callbacks" section.   |
|onDateChange   |function   |()=>{}   |Callback of user selecting a date, for more details see "OnChange Callbacks" section.   |
|lang   |string   |null   |Language of calendar. For details see "i18" section below.   |

----
OnChange Callbacks
------
An object is passed as an argument to callback functions, an instance of this object would be like:
```javascript
{
    year: 1994,
    month: 12,
    date: 15,
    ISOString: '1994-12-15'
}

```
When user selects a month and a specific date is not selected, the "month" value would be ```null```, and the "ISOString" value would be ```'1994-12-00'```. 

Like wise, when user selects a year and a specific month and date is not selected, the object argument would be like below:
```javascript
// the callback function
function onYearChange(obj){
    console.log(obj);
}

// output
{
    year: 1994,
    month: null,
    date: null,
    ISOString: '1994-00-00'
}
```

----
i18n
------

lang props valid values:
|Name |Description   |
|---|---|---|---|
|zh-TW   |Traditional Chinese  |
|zh-CN   |Simplified Chinese  |
|ja   |Japanse   |
|en   |English   |

If lang props is not provided, language would be decided by user's browser settings, or if an invalid value is provided, the fallback value would be "en".