# CSSFinder
Simple VSExtension that moves the user to their CSS when clicking on an HTML element
Hold CTRL and click on any element to automatically take you to the line of code in CSS! Note, this only pertains to already written CSS as it does not write for those that do not exist prior.

<img width="764" height="568" alt="gifRecording" src="https://github.com/user-attachments/assets/f5975c86-e067-4653-bb0b-0dde2aacd123" />

This small project was mainly done as way of learning, and by no way is it a fully functioning extension. 
## Features
  Reads through multiple CSS files 
  Can detect both main HTML elements, ID, and Classes 
  Holding CTRL will highlight if any lines of CSS with that name exists
  
## Known Issues
  - If there exists names with similar spelling it does not detect precisely where it is within the document
  - It can not detect combinators and will only read names that are written both in HTML & CSS

## Release Notes
### 1.0.0

Initial release of CSSFinder 

