----Steps to Deploy----

1) deploy back-end services
	
	- go inside services folder
	
	- run "npm install" using cmd
	
	- after installing node modules, edit the "config.json" file if your configurations are different. 
	  
	  (eg: if you have the database in seperate server, change the database config in the config.json file) more details available in the report.
	
	- then execute the command, "npm start"
	
	- then the back-end services will be started in port 3001

2) deploy admin panel
	
	- go inside "admin" folder
	
	- run "npm install" using cmd
	
	- once the node modules are installed, ensure the configurations in "src/config.json" file is valid.
	
	- then execute the command, "npm start"
	
	- Then you are ready to use the admin panel. (localhost:3002)
	
3) deploy web app
	
	- go inside "web" folder
	
	- run "npm install" using cmd
	
	- once the node modules are installed, ensure the configurations in "src/config.json" file is valid.
	
	- then execute the command, "npm start"

	- Then you are ready to use the web application. (localhost:3000)
