# A dashboard platform to visualize vaccine-related data and public sentiment on social media regarding vaccine safety

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) 
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) 
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) 
![image](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)  
![image](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) 

## Table of Contents 

- [About](#about)
- [Main Features](#main-features)
- [UI Preview](#ui-preview)
- [Introduction of Webpages](#introduction-of-webpages)
- [Quick Start](#quick-start)
- [API Keys and Environment Variables](#api-keys-and-environment-variables)
- [Notes](#notes)
- [Potential Future Enhancements](#potential-future-enhancements)
- [Collaborators](#collaborators)
 
## About
VaccineView serves as a bridge between public health data and community needs, making vaccine-related information more accessible and understandable for all New Zealanders.

Users can access consolidated vaccine data, locate vaccination services, gain insights into community-level vaccine confidence, and monitor public sentiment on vaccine safety. They can also create personal accounts and subscribe to updates for specific vaccines.

## Main Features

Our Dashboard page visualizes vaccine and disease data through nine carefully selected vaccine-related indicators, presenting interactive charts that track metrics such as vaccine efficacy, vaccine coverage rates, R0 rate, and disease cases in New Zealand over time. All this information is sourced from official health organizations, including the Ministry of Health, Health New Zealand, ESR, World Health Organisation, and Healthpoint. 

This is complemented by a detailed survey data analysis system that presents vaccine confidence information with demographic breakdowns, including attitude comparisons across different years in different demographic groups. 

Our platform also includes a robust location-based service component that displays vaccination providers across New Zealand through an interactive map, making it easy for users to locate vaccination facilities for a specific vaccine in their area. 

A crucial feature of the platform is the social media sentiment analysis on our Social Media page. We continuously monitor conversations about vaccines on platforms like Reddit and X, visualizing these discussions through word clouds and breaking down the sentiment into positive, neutral, and negative reactions. This gives users a real-time pulse on public vaccine discussions and provides health officials with insights about general public thoughts and concerns. 

To keep users informed, our platform includes a subscription service that allows users to receive regular updates on vaccine data that matters to them. 

## UI Preview

<div style="display: flex; gap: 10px; margin-top: 10px;">
  <img src="https://github.com/user-attachments/assets/15a80e96-df67-49ea-9a97-a105d0f790d9" width="400" />
  <img src="https://github.com/user-attachments/assets/d9334796-803c-428f-88dd-d1b1612d304f" width="400" /> 
</div>
 
<div style="display: flex; gap: 10px; margin-top: 10px;">
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <img src="https://github.com/user-attachments/assets/50a3824b-b2be-431a-8189-59e06708f153" alt="homepage" width="400">
    <img src="https://github.com/user-attachments/assets/562bc52d-07a4-486a-9831-ea76c4577058" alt="homepage" width="400">
  </div>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <img src="https://github.com/user-attachments/assets/e091744b-50df-4f07-9180-47179ddb6f7a" alt="homepage" width="400">
    <img src="https://github.com/user-attachments/assets/759348d9-d6f0-4184-99b5-41794c5fb994" alt="homepage" width="400">
  </div>
</div>

For the demo video, please refer to [this link](https://drive.google.com/file/d/1AZYAXiMg99GJSVliujlR63u4uSDmDkBP/view?usp=drive_link).

## Introduction of Webpages

**Homepage**：The homepage features a hero section introducing the platform, followed by an interactive feature guide showcasing elements like notifications, surveys, and social media analysis. A dedicated FAQ section provides answers to common questions, while an external resources section links to key organizations such as The Ministry of Health and Health New Zealand. At the bottom, the footer includes links to the About Us, Privacy Policy, and Terms of Service pages.

**Dashboard Page**：This page presents data visualizations for eight key vaccine indicators related to the selected vaccine, including vaccine description, efficacy, R0 rate, coverage rate, related disease cases, incidence rates, vaccine introduction milestones in New Zealand, and a disease outbreak timeline. Users can choose a vaccine from a dropdown menu to explore relevant statistics. Additionally, an interactive map highlights health providers that offer vaccination services.

**Social Media Page**：Designed to track public sentiment on vaccine-related topics, this page utilizes word frequency analysis and sentiment trend visualization. It presents sentiment trends categorized as neutral, positive, or negative, generates word clouds to highlight frequently discussed topics, ranks the most commonly used words along with their weight, and visualizes weekly sentiment trends through line graphs.

**Survey Page**：This page provides an interactive interface for exploring vaccine confidence survey data, allowing users to examine New Zealanders’ attitudes toward various vaccine-related statements.

**Map Page**：An interactive map displays vaccine health service locations across New Zealand. Users can filter by vaccine type or provider (e.g., show pharmacies only) and access details for each location. Additional features include the ability to get directions through Google Maps or book vaccination services via Health New Zealand’s app.

**Profile Page**：Users can view and update their profile information, including their avatar, username, email, and password. The page also allows them to manage vaccine subscriptions, including adding, removing, and modifying their selected vaccines.

**Signup and Login Pages**：The signup page enables users to register via Google authentication or email-based signup, while the login page provides the same options for returning users.

**Forgot Password and Reset Password Pages**：The forgot password page allows users to initiate account recovery by entering their email to receive a verification code. Upon successful submission, they are directed to the reset password page, where they can enter the code and set a new password before being redirected to the login page.

**404 Page**：Displayed when users attempt to access a non-existent page, this page provides a message along with navigation options to return to the main website.

## Quick Start

Prior to commencing the project initialization, ensure that you have obtained the API private key file named `admin.json`. Then place this file in the `backend/src/` directory, the same level with `app.js`.

To run this project, start by executing the script to clear the database and generate example records in the database. Navigate to the backend folder and execute `npm install` to install the module dependencies. Then run `npm run generate` to generate records in the database (this command may take a few minutes depending on your system). Finally, run `npm run dev`.

In the frontend terminal, simply execute `npm install` and `npm run dev`. Once you've completed these steps, you can start exploring the project.

## API Keys & Environment Variables 

Below is the required `.env` variables for the front-end:

1. `VITE_GOOGLE_CLIENT_ID = Your Google OAuth 2.0 Client ID obtained from Google Cloud Console`.
   To get this:
   - Go to the Google Cloud Console (https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Google+ API and Google Maps JavaScript API
   - Go to "Credentials" and create an OAuth 2.0 Client ID
   - Configure the authorized JavaScript origins and redirect URIs
   - Copy the generated Client ID

2. `VITE_API_BASE_URL = The base URL of your backend API server` (e.g., http://localhost:8000 for development or https://api.yourwebsite.com for production)

3. `VITE_GOOGLE_MAPS_API_KEY = Your Google Maps API key for integrating mapping features`. To obtain this:
   - Visit the Google Cloud Console
   - Ensure you have a project selected
   - Enable the Google Maps JavaScript API for your project
   - Go to "Credentials" and create an API key
   - Restrict the API key to only allow access from your website's domain
   - Enable billing for your Google Cloud project as Maps API requires a billing account
   - Set appropriate quotas and usage limits to control costs
   - Remember to never commit these sensitive keys directly to your repository. Always use environment variables and add `.env` to your `.gitignore` file.

## Notes

**Google Maps Implementation:**

For the Google Maps part, we used google.maps.Marker. However, as of February 21st, 2024, google.maps.Marker is deprecated, and google.maps.marker.AdvancedMarkerElement is recommended over google.maps.Marker. But the library we used (@react-google-maps/api) doesn't directly support google.maps.marker.AdvancedMarkerElement out of the box. Since google.maps.Marker is still stable and widely used, and Google has promised that they will provide at least a 12 months notice period before discontinuing support. Therefore, we are currently adhering to using the deprecated google.maps.Marker, which may result in console warning messages - please ignore them. We plan to migrate to Advanced Markers in the future once it is supported in @react-google-maps/api.

## Potential Future Enhancements
Below are some potential enhancement areas:

1.	Vaccine Dashboard:
     - Add more vaccine types to the database
     - Enhance the interactivity of the Dashboard page
     - Provide different visualization for different groups of end users:
           - More detailed statistics for health professionals
           - More intuitive graphs for the general public
       
2.	Survey Data:
     - Integrate additional data sources beyond Vaccine Confidence Project™
     - Develop internal data collection methods
       
3.	Social Media Analysis:
     - Extend analysis to Facebook and other platforms
     - Enhance sentiment analysis accuracy
     - Add more detailed engagement metrics
       
4.	Machine Learning Model:
     - Refine the sentiment analysis model
     - Implement automated model retraining
     - Add new classification categories
       
5.	Data Updating work:
     - Populate more vaccine data based on National Immunisation Schedule
     - Run social media scripts automatically and weekly to update analysis results
     - Manually check the vaccine data and survey data each month to ensure timely update
       
6.	Notice when running vaccine data fetching and populating scripts:
     - Define proper directory firstly to store the data before fetching data
     - Manually download the COVID-19 disease cases data from the data source website as the url in the script might be expired.
     - When populating new vaccine data, make sure the path and the CSV files’ name consistency in the script.

## Collaborators

This project was completed by a five-member team called **90 MILES** (in which **MILES** represents Mark, Ivan, Lesley, Echo and Shawn)!

Our team members are shown in the image below:

![Image](https://github.com/user-attachments/assets/fbe96fce-3f2a-4778-97cf-b1a7f8a077af)
