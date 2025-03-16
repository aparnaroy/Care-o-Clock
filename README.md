# Care o'Clock

### HenHacks 2025 - 2nd Place Health & Wellness Hack

## Inspiration

Many of us have elderly loved ones who might struggle remembering their doctors' appointments or to take their medications on time. Missing doses and forgotten appointments can then lead to more health complications. We came up with the idea of this app to help out the elderly who might be facing similar issues with remembering their daily tasks. Many of the existing apps are too complex and lack accessible features like simplified navigation and voice assistance.

## What It Does

Care o'Clock is an all-in-one voice-assisted health management app. It helps users track doctor appointments, set medication reminders, get personalized health information, manage daily tasks, and call emergency contacts—all by simply speaking to it.

## How We Built It

- **Languages & Frameworks:** React/Typescript, ChakraUI
- **Database:** MongoDB as our data storage
- **AI Integration:** Gemini API for our AI chatbot
- **Media & Data Processing APIs:**
  - getUserMedia API for camera access
  - OCR Space API for image-to-text conversion
  - Web Speech API for speech-to-text conversion

## Challenges We Ran Into

One of our challenges was having a seamless connection from our React front-end and MongoDB backend server. We also faced difficulties implementing the camera functionality to accurately scan pill bottles.

## Accomplishments We're Proud Of

One of our biggest achievements was successfully having our AI chatbot be able to add events directly to our database. This feature simplifies the process for users, making it simpler for users to input appointments and reminders for the future. Additionally, we are proud of having our pill-bottle-scanning functionality working, as it eliminates the need to manually insert individual details of a prescription, and can even help those who may not be able to read the finer print.

## What We Learned

We learned to incorporate third-party services like the OCR Space API and Web Speech API for image and speech processing. We also gained more experience with developing a full-stack application.

## What's Next for Care o'Clock

We would like to expand the app’s features to include a visual interface for users who prefer a touch-based experience as well as add additional features to increase accessibility.

## Try It Out:

**The App:** https://care-o-clock.up.railway.app

**Presentation:** https://docs.google.com/presentation/d/16GWYsX3VipVcpOBvxn_mzeEHJ6hW2OfapEWkGWT-IUM/edit?usp=sharing

**Demo Video:** https://youtu.be/pmbzdW4-P1g

**Devpost:** https://devpost.com/software/care-o-clock
