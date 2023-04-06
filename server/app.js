const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

const port = 8080;
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const data = await prisma.category.findMany({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "some thing went wrong" });
  }
});

app.post("/user/create/details", async (req, res) => {
  try {
    created = await prisma.user.create({
      data: {
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        agreed: Boolean(req.body.agreed),
      },
    });

    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(
    `Test App running at http://localhost:${process.env.PORT || port}`
  );
});
