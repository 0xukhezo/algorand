# Algorand Watcher

Algorand Watcher is a simple yet powerful tool designed to monitor Algorand account addresses and provide notifications when their state changes. This project includes a REST API to manage the watched accounts and obtain their current states.

## Features

1. **Accepting an Algorand Address:**
   - Create a REST API endpoint to accept an Algorand account address and add it to the watcher list.

2. **Periodic State Check:**
   - Implement a mechanism that performs a periodic state check for each account in the watcher list every 60 seconds.
   - Detect changes in the account's state since the last query.

3. **Logging Notifications:**
   - Log notifications whenever a change in the balance of a watched account is detected.
   - Notifications should include relevant details about the account and its state change.

4. **Listing Tracked Accounts and Their States:**
   - Create a REST API endpoint to list all the tracked accounts and their current states.
     
## Tech Stack

This project is built with a powerful and modern tech stack to ensure robustness, efficiency, and a seamless development experience:

- **Next.js:** A React framework that enables server-side rendering and efficient client-side navigation.

- **React:** A JavaScript library for building user interfaces, making it easy to develop interactive components.

- **Tailwind CSS:** A utility-first CSS framework for building modern and responsive designs with minimal effort.

- **Supabase:** An open-source alternative to Firebase, Supabase provides a real-time database and authentication services.

- **Algorand API:** Leveraging the Algorand blockchain API to interact with Algorand accounts and retrieve real-time data.

- **Jest:** A JavaScript testing framework for unit testing and ensuring the reliability of your code.

- **TypeScript:** A superset of JavaScript that adds static typing, enhancing code quality and developer productivity.

Feel free to explore the documentation of each technology for more in-depth information and resources.

## Routes

┌ / 

├ /_app 

├ /404 

├ /address/[address] 

├ /api/getAddressByAddress 

├ /api/getAddresses 

├ /api/getAlgorandInfo 

├ /api/postAddress 

└ /api/updateAddresses

## Project Structure

/ - Home Page

The main landing page of the application.


/404 - Not Found Page

Page displayed when a route is not found (404 error).

/address/[address] - Address Details Page

Displays details for a specific Algorand account based on the provided address.

/api/getAddressByAddress - API Endpoint

API endpoint to retrieve details for a specific Algorand account by its address.

/api/getAddresses - API Endpoint

API endpoint to retrieve a list of Algorand account addresses.

/api/getAlgorandInfo - API Endpoint

API endpoint to retrieve general information about the Algorand blockchain.

/api/postAddress - API Endpoint

API endpoint to add a new Algorand account address to the watcher list.

/api/updateAddresses - API Endpoint

API endpoint to update the state of tracked Algorand account addresses.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/0xukhezo/algorand.git
   cd algorand
   
2. **Install dependencies:**
   ```bash
   yarn
3. **ENV:**
   
   Copy the .env.example file to .env and configure the required settings.

4. **Supabase:**
   
   Create a Table in supabase with the name Addresses with this columns:
     - id (int8)
     - address (text)
     - amount (int8)
     - amountWithoutPensingRewards (int8)
     - appsTotalSchema (json)
     - assets (json[])
     - minBalance (int8)
     - pendingRewards (int8)
     - rewardsBase (int8)
     - rewards (int8)
     - round (int8)
     - status (text)
     - totalAppsOptedIn (int8)
     - totalAssetsOptedIn (int8)
     - totalCreatedApps (int8)
     - totalCreatedAssets (int8)
   
6. **Run the Application:**
   ```bash
   yarn start
