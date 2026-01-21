# Notes
## Beginning the Beginner's series [1 of 51]
- general information about the course
- Course goal is to get people running quickly with JS syntax
## What is JavaScript [2 of 51]
- Javascript
    - was created to add interactivity to websites
    - is dynamically typed language
    - JIT compiled

- You can use Node to write JS on server
- Can be used to write native programs
- Many popular programs are written in Javascript
- JS is everywhere and powers the modern web
## Running JavaScript: browser or server [3 of 51]
- client means web browser
- you can write Javascript in JS files (.js)
- You can modify DOM using JavaScript
- You need NodeJS to write on the server
- DOM doesn't exist in NodeJS
- npm contains packages for many things
- Browser JS is for UI while Node JS is for services
## Building your toolbox [4 of 51]
- Need a code editor like VS Code
- extensions help with development
- ESLint: finds bugs
- Prettier: formats code
- Node.js runs JS outside of the browser
- NVM manages different Node versions
- Setup requires an editor and a runtime environment
## Demo: Building your toolbox [5 of 51]
- show how to install VS Code and NVM
- Installing the right tools makes coding easier
## Creating your first application [6 of 51]
- Project is just a folder with code files
- console.log() is used to see output
- Single or double quotes define strings
- Template literals use backticks and ${}
- Use terminal to run files with node command
## Comments [7 of 51]
- Runtime ignores commented lines
- Single-line: //
- Multi-line: /* ... */
- Don't use too many, make code easy to read instead
- Comments provide context or reminders for later
## Demo: Comments [8 of 51]
- toggling comments with keyboard shortcuts
- Use functions to make code self-documenting
## Declaring variables [9 of 51]
- var: function scoped, can be messy
- let: block scoped, mutable
- const: block scoped, cannot be changed
- Recommened to use const most of the time
- modern JS uses let and const over var
## Demo:Declaring variables [10 of 51]
- demo of scope errors and constant errors
- Picking the right keyword prevents bugs
## Working with strings [11 of 51]
- joining strings is called concatenation
- uses the + operator
- Be careful when mixing numbers and strings
- Manual spacing is needed when joining words
## Demo: Working with strings [12 of 51]
- showing concatenation vs adding numbers
- keep data types consistent to avoid issues
## Using template literals to format strings [13 of 51]
- uses backticks instead of quotes
- use ${} placeholders for values
- handles line breaks and special characters easily
- Cleaner way to write strings than concatenation
## Demo: Using template literals to format strings [14 of 51]
- inserting expressions into strings
- backticks allow for complex string formatting
## Data types in JavaScript [15 of 51]
- Weakly typed language
- types: number, string, boolean, date, function, object, array
- typeof gives the primitive type
- instanceof checks the constructor
- coercion can lead to bugs with ==
- numbers are always floating point
## Demo: Data types in JavaScript [16 of 51]
- testing types with typeof and instanceof
- arrays are actually objects in the type system
## Math in JavaScript [17 of 51]
- Arithmetic: +, -, *, /
- Modulo % gives the remainder
- ++ and -- for changing by 1
- Math object has Pi and sqrt()
- division is left number divided by right
## Demo: Math in JavaScript [18 of 51]
- showing basic math and Math object
- built-in Math object handles advanced operations
## Converting strings to numbers [19 of 51]
- parseInt(): string to integer
- parseFloat(): string to float
- toString(): value to string
- Returns NaN if conversion fails
- parseInt ignores text after numbers
## Demo: Converting strings to numbers [20 of 51]
- converting hex numbers and strings
- parseInt and parseFloat are built-in tools
## Handling errors with try/catch/finally [21 of 51]
- Exceptions interrupt the code flow
- throw keyword starts an exception
- try monitors code, catch handles failure
- finally always runs
- can throw strings, booleans, or objects
## Demo: Handling errors with try/catch/finally [22 of 51]
- catching critical code errors
- try catch finally controls the code flow
## Dates [23 of 51]
- Date object handles time
- stores time in ms since 1970
- Months start at 0 (Jan is 0)
- set/get methods for year, month, day
- default output is standardized string
## Demo: Dates [24 of 51]
- creating new dates and setting months
- Date object is the main tool for time
## Boolean logic with if statements [25 of 51]
- uses standard comparison operators
- avoid ==, always use === (triple equals)
- if / else if / else chain logic
- Ternary is shorthand for simple if/else
- single line if statements don't need braces
## Demo: Boolean logic with if statements [26 of 51]
- showing type safety with triple equals
- standard if/else logic works like other languages
## Boolean logic with switch and other syntax [27 of 51]
- 0, empty string, null are false
- && and || are shortcut operators
- Switch checks for equality against cases
- break is required to avoid fall-through
- Switch is cleaner for long equality checks
## Demo: Boolean logic with switch and other syntax [28 of 51]
- mixing cases and adding break statements
- Case sensitivity matters in string comparisons
## Creating arrays [29 of 51]
- collection of different data types
- uses square brackets [ ]
- also can use `new Array(length)`
- items are accessed via index
- .length property tracks item count
## Demo: Creating arrays [30 of 51]
- creating empty and fixed-length arrays
- Arrays are flexible lists for storing data
## Populating arrays [31 of 51]
- add data at creation or later via index
- first index is always 0
- last index is length minus 1
- can have gaps with undefined values
- be careful not to overwrite data
## Demo: Populating arrays [32 of 51]
- adding strings and booleans to lists
- Index and length share a specific relationship
## Array methods [33 of 51]
- push/pop: modify end of array
- shift/unshift: modify front of array
- concat: joins arrays together
- push/unshift return new length
- pop/shift return the removed value
- methods make array manipulation easy
## Demo: Array methods [34 of 51]
- merging arrays with concat
- built-in methods are best for changing data
## Loops [35 of 51]
- for loop: runs a set number of times
- while loop: runs while condition is true
- for of loop: easiest for arrays/collections
- while loops need a manual condition change
- for loops put declaration and increment in one line
- for-of is preferred for simple iteration
## Demo: Loops [36 of 51]
- iterating through name arrays
- JS provides different tools for repeating code
## Functions [37 of 51]
- basic reusable blocks of code
- parameters are placeholders, arguments are values
- naming uses letters, numbers, $, and _
- return keyword exits and sends data out
- function name property gives its name
- abstractions help with readability and maintenance
## Demo: Functions [38 of 51]
- defining and invoking print functions
- functions can take inputs and return results
## Arrow and anonymous functions [39 of 51]
- arrow functions use => syntax
- shorter character count for small bundles
- implicit return for single-line arrows
- inherits "this" context from parent scope
- must be assigned to variables, no standalone name
- Arrow functions simplify syntax and scope
## Demo: Arrow and anonymous functions [40 of 51]
- creating add and subtract arrows
- single line arrows have implicit returns
## JavaScript Object Notation (JSON) [41 of 51]
- lightweight text format for data
- used in web APIs and file storage
- JSON.stringify() converts object to string
- JSON.parse() converts string to object
- language independent format
- JSON is the standard for data transfer
## Demo: JavaScript Object Notation (JSON) [42 of 51]
- stringifying book objects and parsing them back
- JSON only saves data, not function methods
## Objects in JavaScript [43 of 51]
- represent real world things in code
- properties describe data (attributes)
- methods are functions (actions)
- literals use { }, constructors use `new Object()`
- dot notation or bracket notation to access
- "this" refers to the owner object
- Objects are unordered collections of pairs
## Demo: Objects in JavaScript [44 of 51]
- defining book properties and calling methods
- Dot notation and bracket notation work the same
## Promises for long running operations [45 of 51]
- handle tasks that take time (databases, REST)
- prevents the app from freezing up
- uses resolve for success, reject for failure
- .then() handles the successful result
- .catch() handles the errors
- Promises are cleaner than old callbacks
- callbacks can lead to nested messy code
## Demo: Promises for long running operations [46 of 51]
- creating a promise based timeout
- promises manage asynchronous operations effectively
## Async/await for managing promises [47 of 51]
- makes async code look synchronous
- await pauses execution for the promise
- thread can do other things while waiting
- wrapped in async functions
- use try/catch for errors
- cleaner syntax for managing long tasks
## Demo: async/await for managing promises [48 of 51]
- missing an await returns a pending promise
- Async await is the modern standard for async
## Package management [49 of 51]
- packages are reusable code bundles (React, Express)
- npm is the main tool and registry
- package.json lists dependencies and scripts
- dependencies are for production, devDependencies for coding
- Packages save time on complex tasks
- almost anything can be found on npm
## Demo: Package management [50 of 51]
- initializing npm and installing Express
- using scripts and managing .env secrets
- use .gitignore to keep node_modules out of git
## Next steps [51 of 51]
- Use the knowledge quickly so you don't forget
- Knowledge is a muscle that needs exercise
- Check Quick Starts and SDKs to build apps
