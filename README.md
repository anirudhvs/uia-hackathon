# DigiPartogram

This project was developed for the UNESCO India Africa International Hackathon 2022 under the theme Health and Hygiene. The title of the PS was "Underutilization and lack of mechanism of taking action based on partogram" (PS ID: HECL53)

## Problem Statement
Partogram is the most important tool for health workers at any level to assess the progress of labour and take appropriate actions to avert maternal and child mortality. A partogram has an alert and action line. If the plotted graph crosses alert line, it indicates prolonged labour in which case, the case has to be referred to a first referral unit along with the plotted partogram. If the plotting crosses action-line, ideally intervention (for e.g., c-section) has to be immediately undertaken.

In facilities like PHC, often partogram are not utilised fully or correctly due to several reasons.

A digital partogram which can generate alert and send information to referral centres can greatly reduce maternal and child mortality by providing real-time decision support, improve data entry, and strengthening referral chain.

Digital platform for recording the partogram is the need of the hour.

## Solution

### Features
1. Regular monitoring of the patient's condition based on partogram data.
2. Real time decision support. The system analyses the vitals of the patient as soon as the nurse enters the input and provides a the nurse with a set of actions she has to take in order to prevent any complications.
3. Alerts the nurse if the patient is in critical condition based on the input data.
4. Dashboad to view the health status of all the patients.
5. The system sends reminders to the nurse to take the vitals of the patient at regular intervals.

## Screenshots

|![image](https://i.imgur.com/NAJfLu8.png)|![image](https://imgur.com/ZhjjEQk.png)|
|:---:|:---:|
|Landing page|Login page|
|![image](https://imgur.com/7egUdD6.png)|![image](https://imgur.com/KIEPzHe.png)|
|Signup page|All patients Dashboard|
|![image](https://i.imgur.com/i3opzTO.png)|![image](https://i.imgur.com/GzukVXO.png)|
|New patient admission|Patogram view with critcal alerts|
|![image](https://i.imgur.com/G9teTsY.png)|![image](https://i.imgur.com/j47ZuiS.jpg)|
|Risks and Suggestions|Alerts in SMS|


## Tech Stack
- NodeJS with ExpressJS
- EJS for templating
- MongoDB for database