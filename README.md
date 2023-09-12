This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting started with the Project

##Fisrt Steps

  1. You will need to download the repository to your local machine in an empty folder, you can do that by using any of the options under the green `<> code` button.
  2. Download the latest version of [`node.js`](https://nodejs.org/en) to your computer, the latest recommended should be good.
  3. Once you have downloaded and installed the latest version of node.js, open up a terminal, `PowerShell, CommandPrompt` for example in windows, navigate to the folder where you downloaded the code and run the corresponding command.

  ```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
  ```

With this you should have all the dependencies for the project installed.

## Creating the project's DataBase
  
  4. Run the command to install [`prisma`](https://www.prisma.io/docs/getting-started/quickstart) to the project, this will help in the creation of the DataBase.

  ```bash
  npm install prisma --save-dev
  # or
  yarn install prisma --save-dev
  # or
  pnpm install prisma --save-dev
  ```  
  
You can also install it globaly if you prefer, instead of using `--save-dev` use `-g` when you run the command.
Create a new empty Relational DataBase in your preferred DB provider, for this guide I'll use [`supabase`](https://supabase.com/)

  5. Create a new account in [`supabase`](https://supabase.com/) by clicking the `Start your project` green button then a new project inside the supabase account, when creating the project note down the password you used as it will be needed later.
  6. Now that you have [`prisma`](https://www.prisma.io/docs/getting-started/quickstart) and [`supabase`](https://supabase.com/) setup, we need to connect them in the project, first create a new **.env** file inside the root folder of the project.
  7. Inside the new file create 2 new environment variables called *DIRECT_URL* and *DATABASE_URL*
  8. Go to your [`supabase`](https://supabase.com/) project and under settings locate the database option, in that page locate the **connection string** field and copy it.
  9. Now go back to your **.env** file and paste the string in both variables as strings.
  10. Change the port of the string which should be **6543** to **5432**.
  11. Add **?pgbouncer=true** at the end of the *DATABASE_URL* variable, so [`prisma`](https://www.prisma.io/docs/getting-started/quickstart) can manage better app calls to the DB.
  12. Substitute the **[YOUR-PASSWORD]** with the password you noted down before to create the project, ***not the password used to create the account***.
  13. Finally, run the [`prisma`](https://www.prisma.io/docs/getting-started/quickstart) command `prisma migrate dev --name init` which will create the database in [`supabase`](https://supabase.com/) using a migration name of **init**.

Now you have a proper database connected to the project.

## Adding authentication

Since the project uses Next-Auth for authentication, you can use your preferred method for authentication and configure the project **.env** variables using that method, for this guide I'll use OAuth with [`google cloud`](https://cloud.google.com/) for authentication.

  14. Go to [`google cloud`](https://cloud.google.com/) website and create a new account to manage authentications.
  15. Once you have a new account, you should be able to go to the [`google cloud`](https://cloud.google.com/) **console** usually the button is at the top right side of the home page.
  16. In the console create a new project.
  17. Once you have a new project, in the Dashboard of the project you should see an option for **APIs and services** click that option.
  18. Then on the left hand side click on **Credentials**, then at the top click on **+ Create Credentials** and finally on **OAuth Client ID**
  19. In the **Application Type** dropdown select *Web Application*
  20. Type in a name you wish for the **OAuth Client ID**
  21. Under **Authorised JavaScript origins** click on **+ Add URI** and type *http://localhost:3000* which is the default URL under which this project runs.
  22. Under **Authorised redirect URIs** click on **+ Add URI** and type again *http://localhost:3000* then click again **+ Add URI** and add *http://localhost:3000/api/auth/callback/google* which are the URLs for google to authorize access.
  23. Once all that is filled click on *Create* and [`google cloud`](https://cloud.google.com/) should start creating the access for your application.
  24. Go to your **.env** file create 4 new environment variables called *GOOGLE_CLIENT_ID*, *GOOGLE_CLIENT_SECRET*, *NEXTAUTH_URL* and *NEXTAUTH_URL_INTERNAL*.
  25. Under your newly created **OAuth Client ID** you should be able to see the values for *Client ID* and *Client secret*, paste those values to *GOOGLE_CLIENT_ID*, *GOOGLE_CLIENT_SECRET* in the **.env** file respectively as strings.
  26. For *NEXTAUTH_URL*, *NEXTAUTH_URL_INTERNAL* use the value *http://localhost:3000* plain.

## Creating a secret for Next_Auth

Now that we have the authentication setup, we need to create our own secret for Next_Auth to use with the app.

  27. Go to your **.env** file create a new environment variable called *NEXTAUTH_SECRET*.
  28. Now we will need to install **Git Bash** from [`Git`](https://git-scm.com/downloads) to be able to generate our own secrete, download the latest version and install it on your computer.
  29. Once you have git installed, open the **Git Bash** application or terminal and then write the command `openssl rand -base64 32` to generate a secrete for Next_Auth.
  30. Finally set the value of the variable *NEXTAUTH_SECRET* to that given in **Git Bash**.

Once you have completed all the previous steps you should have a **.env** file that reads similar to this:

```bash
DIRECT_URL='postgresql://postgres:ThisIsNotMyPassword123.judjnfkjumnfammw.supabase.co:5432/postgres'
DATABASE_URL='postgresql://postgres:ThisIsNotMyPassword123.judjnkjumlyfammw.supabase.co:5432/postgres?pgbouncer=true'

GOOGLE_CLIENT_ID='5604978-bmgt9c5h74cpsqgc72j5b1sf.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='GO-7QbUlCaz37iLQfnh-r2'

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=eS1nmS0XAS1zeo574JbJad7aRUS3QCFLTC7iQlKBh5o=
```

## Running the project:

  31. After all that is configure you should be to use the following command in a terminal from the root folder to execute the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

32. Once it is running open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For any concerns, or problems feel free to leave a comment and I'll try to get back at you as soon as I can.
