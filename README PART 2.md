# GreenSteps Community Gardens Website

## Project Description
A responsive, multi-page website for **GreenSteps Community Gardens**, a non-profit organization dedicated to empowering South African communities through sustainable food production, environmental stewardship, and education.

---

## Student Information
- **Student Name:** Siphesihle Paul Jali  
- **Student Number:** ST10479775  
- **Course:** WEDE5020  

---

## Website Pages
- **Home** (`index.html`) – Landing page with hero section and call-to-action buttons  
- **About** (`about.html`) – Organization story and impact statistics  
- **Programs** (`programs.html`) – Six key program offerings displayed in card layout  
- **Impact Stories** (`impact.html`) – Success stories from community gardens  
- **Events** (`events.html`) – Upcoming workshops and community events  
- **Resources** (`resources.html`) – Educational materials and tools for gardeners  
- **Contact** (`contact.html`) – Contact form and office information  

---

## Technologies Used
- HTML5  
- CSS3 (External Stylesheet)  
- Responsive Design (Mobile-first approach)  
- CSS Grid & Flexbox for layouts  

---

## Features
-  Fully responsive design for mobile, tablet, and desktop  
-  Sticky navigation header  
-  Interactive hover effects and animations  
-  Accessible form with validation  
-  CSS custom properties (variables) for consistent theming  
-  Modern card-based layouts  
-  Smooth scrolling and transitions  

---

## Responsive Breakpoints
- **Mobile:** 480px and below  
- **Tablet:** 768px and below  
- **Desktop:** 1024px and above  

---

## Screenshots
- <img width="1293" height="692" alt="Desktop" src="https://github.com/user-attachments/assets/dea43055-c2fa-4b40-a721-67a9eab77aa2" />
Desktop View

-  <img width="744" height="682" alt="Tablet" src="https://github.com/user-attachments/assets/726af05e-3234-4e7b-8727-c0d3ee952ea7" />
 Tablet View
  
- <img width="752" height="687" alt="Mobile" src="https://github.com/user-attachments/assets/7896b26d-8cde-4121-ac6d-38309ce1ad51" />

  Mobile View  

---
## Part 1 Reflection & Improvements

### Part 1 Marks Received
- **File Structure:** 3/5  
- **README on GitHub:** 3/5  
- **Changelog:** 0/5  

---

### Issues Identified and Improvements Made

#### Issue 1: Poor File Structure (Lost 2 marks)
- **Part 1 Problem:**  
  HTML files were not organized properly. No dedicated folder for CSS files, and overall project structure lacked organization.  

- **Part 2 Improvement:**  
  Restructured project with proper file organization:  
  - Created `css/` folder for all stylesheets  
  - Created `screenshots/` folder for documentation images  
  - Organized all HTML files in root directory with clear naming  
  - Implemented proper folder hierarchy following web development best practices  

---

#### Issue 2: Incomplete README (Lost 2 marks)
- **Part 1 Problem:**  
  `README.md` file lacked proper structure, detail, and essential information. Missing project description, screenshots, features list, and proper documentation.  

- **Part 2 Improvement:**  
  Completely rewrote `README.md` with comprehensive documentation including:  
  - Detailed project description and purpose  
  - Student information and GitHub username  
  - Complete list of all website pages with descriptions  
  - Technologies used section  
  - Features list with checkmarks  
  - Responsive design breakpoints clearly documented  
  - Screenshots section with captions for desktop, tablet, and mobile views  
  - Detailed changelog with development log entries  
  - Complete CSS implementation checklist  
  - Comprehensive references section with proper citations  
  - Installation and usage instructions  
  - File structure diagram  
  - Future enhancements section  

---

#### Issue 3: No Changelog (Lost 5 marks)
- **Part 1 Problem:**  
  No changelog file or section existed. No documentation of development progress, changes made, or version history.  

- **Part 2 Improvement:**  
  Created comprehensive changelog documentation:  
  - Created separate `CHANGELOG.md` file documenting Part 1 development  
  - Added "Changelog" section in `README.md` with detailed development log  
  - Documented all changes with dates and descriptions  
  - Included development progress entries showing:  
    - CSS stylesheet creation  
    - Responsive design implementation  
    - HTML structure improvements  
    - Testing and bug fixes  
  - Followed proper changelog format with [Added], [Changed], [Fixed] categories  
  - Maintained clear record of all development decisions and implementations  

---

#### Issue 4: No CSS Styling (Additional improvement beyond Part 1)
- **Part 2 Improvement:**  
  Created external CSS stylesheet (`css/style.css`) with:  
  - CSS reset for cross-browser consistency  
  - Typography system with proper hierarchy  
  - Layout structure using CSS Grid and Flexbox  
  - Professional color scheme with CSS custom properties  
  - Pseudo-classes for interactive elements (:hover, :active, :focus-visible)  
  - Responsive design with media queries for tablet (768px) and mobile (480px)  
  - Animations and transitions for enhanced user experience  

---

#### Issue 5: Not Responsive (Additional improvement beyond Part 1)
- **Part 2 Improvement:**  
  Implemented full responsive design:  
  - Mobile-first approach with appropriate breakpoints  
  - Navigation stacks vertically on mobile devices  
  - Typography scales appropriately across all screen sizes  
  - Images are responsive with `max-width: 100%` and `height: auto`  
  - Grid layouts adjust from multi-column to single column on mobile  
  - Form elements resize and stack properly on smaller screens  
  - Tested across desktop (1920px), tablet (768px), and mobile (375px) viewports  


## CSS Implementation Checklist
-  External stylesheet created  
-  CSS Reset applied  
-  Typography styles defined  
-  Grid & Flexbox layouts  
-  CSS variables for theming  
-  Pseudo-classes for interactivity  
-  Media queries (tablet & mobile)  
-  Responsive navigation & typography  
-  Responsive images and layouts  

---

## References
- [MDN – CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)  
- [MDN – CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)  
- [Geeks for Geeks – HTML Introduction](https://www.geeksforgeeks.org/html/html-introduction/)  
- [W3C Navigation Menu Accessibility Guidelines](https://www.w3.org/WAI/tutorials/menus/)  
- … *(full reference list included in source)*  

---

## Installation & Usage
Clone the repository:
```bash
git clone https://github.com/ST10479775-SiphesihleJali/Mast-POE.git
```

Navigate to the project directory:
```bash
cd Mast-POE
```

Open in browser:
```bash
index.html
```

Or run with local server:  
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

---

## File Structure
```
project-root/
│
├── index.html
├── about.html
├── programs.html
├── impact.html
├── events.html
├── resources.html
├── contact.html
│
├── css.assets/
│   └── style.css
│
├── screenshots/
│   ├── desktop.png
│   ├── tablet.png
│   └── mobile.png
│
└── README.md
```

---

## Future Enhancements
- Add JavaScript functionality for forms  
- Implement backend for contact form  
- Add image galleries for stories  
- Create a blog section  
- Add user authentication for volunteer portal  

---

## License
This project is created for **educational purposes** as part of WEDE5020 coursework.

---

## Contact
📧 st10479775@vcconnect.edu.za  

---

_Last Updated: 29/09/2025_  
