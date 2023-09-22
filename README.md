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

## Krav som uppfyllts:

### Krav för godkänt:

1. Uppgiften lämnas in i tid.
2. Produkter ska listas på en sida. 
3. Produkter som visas och köps skall hämtas ifrån Stripe.
4. Det ska gå att lägga till produkter i en kundvagn.
5. Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
6. Man skall kunna registrera sig som en användare i webbshoppen. Detta skall resultera i att en ”Customer” skapas i Stripe och användaren sparar i en JSON-fil. (samtliga lösenord skall sparas hashade).
7. Man skall kunna logga in som kund. Den inloggade kunden (som även är sparad i Stripe) skall användas vid placering av order.
8. Man skall inte kunna placera en order om man inte är inloggad.

### Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda
2. Det skall gå att ange en rabattkod för att få rabatt på sitt köp (Detta görs genom Stripe)
3. Man skall som inloggad kunna se sina lagda ordrar.
4. Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
5. Ordern får inte under några omständigheter läggas utan genomförd betalning! (dvs. Spara aldrig ett orderobjekt såvida ni inte fått bekräftelse tillbaka ifrån stripe att betalningen gått igenom)