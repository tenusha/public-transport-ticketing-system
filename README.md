# Public Transport Ticketing System
Ticketing system for a Public Transport Network 

## Introduction

This is a Ticketing system for a Public Transport Network, in which front end (client side) is developed using React JS and back end (server side) is developed using Node JS and Express JS. This web application use MongoDB as the database, which is a cross-platform document-oriented database.

Users can register on the system. A verification email will be sent to the passenger's email. he needs to confirm it before login to the system. After registration, a passenger can log in to the system using email and password otherwise he can use social login. Admin can also login to the system using the same login by inputting the email and password provided by the main admin.

Once the main admin creates an admin the created admin will receive a confirmation email and for passengers also once they are registered, they will receive a verification email to activate their account.

Using their profile, they can view their booking history. Both registered users and unregistered users can view the cost of booking reservations. but only logged in users can confirm the reservation. Once the reservation is confirmed user will receive an email that includes the reservation details and unique QR code for that reservation. The user can scan the QR code at the train station and get a ticket. When they are getting into the train, they need to scan the QR code and at the end of the journey, they need to scan the QR code again to verify the destination station and the departure station. If QR code and actual departure stations are not matching passenger has to pay an extra amount.  

We have also implemented an admin panel to manage train routes, train station details, train details, and users. For the railway administrators, they can generate monthly and yearly financial reports filtered train wise.

## Architectural Diagrams

This application follows Model-View-Controller (MVC) architecture. The view is implemented using ReactJS which is using a composite view pattern. The controller and model is implemented using Node.js, MongoDB NoSQL database is connected to the back end. Front end and the back end communicate through REST API calls.

<p></p><br />

<img src="https://i.ibb.co/ZL3rYsR/Capture27.png" alt="Capture27" border="0">
Figure_1: component diagram
<p></p><br />

## Features of the application

### 1)	Social login

As an improvement to the specification document, we have added a social signup function using google API. As specified in the specification document users need to provide their details to our system using the user interface. Also, In our system we are currently validating the passenger’s email address so that an email will be sent to the passenger’s email. The passenger needs to confirm it first. That is extra work for passengers. So, we have reduced that extra task by adding a social login. Because of that users do not need to manually enter their email, first name, last name, etc. They can easily login through their Google accounts.  
<p></p><br />

<img src="https://i.ibb.co/SPvBmNJ/google-login.png" alt="Capture7" border="0">
Figure_2: social login
<p></p><br />

<img src="https://i.ibb.co/ZhbgGsG/social-login.png" alt="Capture7" border="0">
Figure_3: social login sequence diagram
<p></p><br />

### 2)  Real-time ticket availability

In this application users can provide the reservation details and check the current availability of seats and make the booking. Our application tracks the reservations made before and displays the actual seats available at the time user going to make a reservation.
When make booking user needs to add start and the destination locations, train, class, time, ticket quantity and the date of booking. Once the data entered the application get the previous bookings for same train’s time and date and subtract by the number of seats that train has.

Even if the user doesn’t have an account created for the application, they can view the availability of seats. Once user needs to make the reservation, they need to have an account.
<p></p><br />

<img src="https://i.ibb.co/sgKx6W5/ticket-availability.png" alt="Capture7" border="0">
Figure_4: ticket availability
<p></p><br />

### 3) Email and SMS notification

Once user makes a reservation the application will generate a QR code to track the reservation. Then an email will be sent to the user’s email along with reservation details and generated QR code, which will be used to print the ticket at the railway station.
Also, the system will send a text message to the user’s registered mobile number with the reservation details.
<p></p><br />

<img src="https://i.ibb.co/9NSTsbw/email.png" alt="Capture7" border="0">
Figure_5: sample email
<p></p><br />

### 4)  Discount for Government officers

This is a new feature we introduced to the application. If the user is a government employee, they can have special discounts. Once user gives their NIC when registering, that NIC is validated using government web service to ensure that user is eligible to have discounts. If the user is eligible for discounts, it will be added to the reservation.

### 5)  Pay by card and cash options

In the specification of this application does not have direct payment method. According to the specification users must top up their account and then pay the reservation fee. That includes additional user interaction and the user friendliness of the application will go down.

Therefore, we added direct payment method and pay by cash option. User can select any option when making a reservation. If user select card, then user need to add valid card details. Or users can select pay by cash and pay at the railway station.

### 6)  Computerize administration panel

#### i) User Management

As an improvement to the specification, In the user management section, there is a list of users, administrators can disable a particular user from that list. After disabling the user cannot access the account using their credentials. An error message will be displayed to the user. We’ve added this feature because if any passenger misbehaves some way, there should be a way to disable that user from the system. In the specification, there wasn’t a way to disable a user.
  
As another improvement to the specification administrators can edit passenger account. such as their email. In the user view, users can’t change their email addresses. however, if the special request comes from the passenger, administrators can update the specific passenger’s email address and other details. 

#### ii) Admin Management

In the original design there is no function for a manager to add or delete another manager to/from the system. So, by this if the number of managers increases or decreases within the company there would be no way to add a new manager or remove an existing manager from the system.

So as an improvement to the specification, a new function is added for the admin panel which enables an admin to add or remove another admin from the system. Thus, when an admin is newly added to the system, he/she would receive an email to the respective email provided when an admin is registered stating that he/she has been added as an admin to the system and he/she have to login to the system using his/her NC number. After registering one can change the password using the account settings in the admin panel. 

#### iii) Route Management

In the original design they have mention that railway transportation administration should be able to plan timetables so we have provided them an interface to manage different routes using unique route name and assign the stations that should be included in that route with relevant fairs. Following are functionalities available in the route management for railway transportation administration.
<p></p><br />

<img src="https://i.ibb.co/XyQywN2/create-route.png" alt="Capture7" border="0">
Figure_6: create route
<p></p><br />
<img src="https://i.ibb.co/gZ41nHd/update-route.png" alt="Capture7" border="0">
Figure_7: update route (eg: add new station)
<p></p><br />
<img src="https://i.ibb.co/z66dCRb/delete-route.png" alt="Capture7" border="0">
Figure_8: delete existing route
<p></p><br />

#### iv) Train Management

In the original design they haven’t mentioned that railway transportation administration should manage trains through the system but as an added feature we have also created an interface to manage trains using unique train name and assign the seats in the different classes of that train and assign the route in which the train will operate. Following are functionalities available in the Train Management for railway transportation administration.

<img src="https://i.ibb.co/bvjgcwM/add-train.png" alt="Capture7" border="0">
Figure_9: create train
<p></p><br />
<img src="https://i.ibb.co/DbwX4pS/delete-train.png" alt="Capture7" border="0">
Figure_10: delete route
<p></p><br />

#### iv) Report Management

In the original design they have mentioned that railway transportation administration should be able to generate reports by processing reservation details. So we have added a feature to generate monthly and yearly reports for revenue generated by each train. After that we have implemented two views as Pie Chart and Bar Chart for the view of reports. Following are functionalities available in the Report Management for railway transportation administration.
<p></p><br />

<img src="https://i.ibb.co/9yyby27/report-home.png" alt="Capture7" border="0">
Figure_11: generate yearly or monthly report
<p></p><br />

<img src="https://i.ibb.co/4TwZj2H/bar-chart.png" alt="Capture7" border="0">
Figure_12: bar chart view
<p></p><br />

<img src="https://i.ibb.co/M7BBW5S/pie-chart.png" alt="Capture7" border="0">
Figure_13: pie chart view
<p></p><br />

## Known Issues 

### • Antivirus software block the “nodemailer” email service in back-end. 
 
If you are getting an error like below, it’s not a fault of the back-end services. It occur because some virus guard applications block “nodemailer” email service. 

```c
{ Error: self signed certificate in certificate chain        
    at TLSSocket.<anonymous> (_tls_wrap.js:1105:38)        
    at emitNone (events.js:106:13)        
    at TLSSocket.emit (events.js:208:7)        
    at TLSSocket._finishInit (_tls_wrap.js:639:8)        
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:469:38) code: 'ESOCKET',         
    command: 'CONN' }
```

This is a common problem with Avast antivirus, this problem will not occur in ESET and Kaspersky. 
 
I have also asked the problem in https://stackoverflow.com. They also suggest to disable the virus guard when running the back-end services. 
 
If you are getting some error like this, please disable the virus guard and try again. Anyway, the reservation process will not abort even if the error occurred.

### • “Twilio” free message service will not allow to sent messages to unverified mobile numbers. 
 
If you are getting an error like below, it occurs because I’m using Twilio free trial and the entered mobile number should be validated through Twilio dashboard before send messages to that number. If you have paid Twilio account please add account details in back-end “config.json” file.

```c
{ [Error: The number +94777123456 is unverified. Trial accounts cannot send messages to unverified numbers; verify +94777123456 at twilio.com/user/account/phonenumbers/verified, or purchase a Twilio number to send messages to unverified numbers.]   
  status: 400,   
  message: 'The number +94777123456 is unverified. Trial accounts cannot send messages to unverified numbers; verify +94777123456 at twilio.com/user/account/phonenumbers/verified, or purchase a Twilio number to send messages to unverified numbers.',   
  code: 21608,   
  moreInfo: 'https://www.twilio.com/docs/errors/21608',   
  detail: undefined }
```

## Limitations

1) At the moment we have implemented the solution to the Railways, but we are planning to expand this solution to be available to be used in Buses also.

2) We have an idea of implementing live tracking system for the Railways and Busses so that the Passengers can know exact time the Buses and the trains will arrive at the station which will save the passengers time.

3) At the moment the cash top up solution mention in the specification is not practical to implement.

## Copyright

(C) 2019 Tenusha Guruge
<br>
[tenusha.wordpress.com](https://tenusha.wordpress.com)
