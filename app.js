const Express = require("express");
const MountRoutes = require("./routes");

const app = Express();
MountRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port: " + port);
});
