# Webbshop with Stripe

Detta projekt är en onlinebutik byggd med en Node.js/Express-backend och en TypeScript/React.js-frontend tillsammans med Stripe som betalningsmetod.

På denna webbplats kan vi se en lista över produkter som skapades och hanteras med hjälp av Stripe. Vi kan registrera en användare som kommer att skrivas in i Stripe och users.json filen, lösenordet krypteras under registreringen. Vi kan också logga in med användarnamn och lösenord, auktorisering spåras med hjälp av cookies. För att göra en beställning måste vi lägga till produkter i varukorg och klicka på kassaknappen, sidan kommer att omdirigeras till Stripe Checkout. Efter en lyckad begäran skapas beställningen i Stripe och orders.json filen.
För att få rabatt i checkout kan du ange koden: `GYM23`

## Ställ in och kör projektet

### För att starta servern:

1. cd server
2. npm install
3. npm run dev
4. Skapa .env-fil i server map, variablar finns i .env-example

### För att starta client:

1. cd client
2. npm install
3. npm run dev
4. Klicka på länken i terminalen eller gå in till - `http://localhost:5173/`

## Stack används:

### Client:

- Vite
- Typescript
- CSS
- Stripe
- Axios
- React
- React-hook-form
- React-router-dom
- React-loader-spinner
- Yup

### Server:

- Cors
- Express
- Cookie-session
- Stripe
- Bcrypt
- Dotenv
- Nodemon