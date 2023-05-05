# Send Bulk Message

#### Where you can send bulk messages from ...

---

### How to run:
* Open cmd and make sure you have `npm` and `node` installed
* Then clone the repository with `git clone https://github.com/ars-4/send_bulk_message.git`
* Then `cd` into cloned repo and run `npm install`
* Now run `npm run start`
* Open your browser and type got to `http://localhost:3000` (You can change port in `configuration.json`)

-----------

### How to use:
* First get a number and Api Key from `https://apiwhatzapp.com` or `Twilio`.
* Simply open your browser and go to `http://localhost:3000`
* First upload a `.xlsx` based file and then you will see `List Of Variables` in `console`.
* Use any of the variable name as it is in the message template with your message and start sending messages.

-----------

### For Email:
* First go to https://myaccount.google.com/u/4/apppasswords and generate a password for your gmail account.
* Then simply put your Email and password in `configuration.json` file along with the email subject.
