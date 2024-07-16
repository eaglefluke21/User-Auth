# User-Auth

1. Clone the repository

2. Install dependencies in both client and server folder using npm .

3. Run command " npm run dev"  should have  url as http://localhost:5173/ 

4. Run command " npm run local" should have url as http://localhost:3000/

set up .env file in root of server folder:

PORT=3000           
USER=mongodbusername       // use mongodb username  found in connection string
PASSWORD=mongodbpassword   // use mongodb password found in  connection string
KEY="EncryptThisText"       // any string to use as encryption key for cryptojs ( secure transmission)
JWT_SECRET="tokenizethis"    // any string to use as encrypion key for creating jwt token

