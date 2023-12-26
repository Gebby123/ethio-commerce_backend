const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OFYMXAgOETwbFJyQ4eaNUVboLnMF4LWTLK6XQI89PZxsFYWyQchzgg069zbKXThNk3fCQf1RBnxBjHtGIw1IgNZ00oLEdVCua"
);

// - App config
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.listen(4000, () => console.log("Listening on port 4000"));
