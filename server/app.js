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

app.get("/data", async (req, res) => {
  try {
    const data = await prisma.category.findMany({
      include: {
        departments: {
          include: {
            products: true,
          },
        },
      },
    });

    const userData = await prisma.user.findMany({
      include: {
        selectors: true,
      },
    });
    res.status(200).json({ data, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some thing went wrong" });
  }
});

app.get("/user/data/:userId", async (req, res) => {
  try {
    const userData = await prisma.user.findMany({
      include: {
        selectors: true,
      },
      where: {
        id: Number(req.params.userId),
      },
    });

    if (userData.length) {
      const data = await prisma.category.findMany({
        include: {
          departments: {
            include: {
              products: true,
            },
          },
        },
      });
      res.status(200).json({ userData, data });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
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
        selectors: {
          create: req.body.selectors.map((selectors) => {
            return {
              name: selectors,
            };
          }),
        },
      },
    });

    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    res.json(500);
  }
});

app.patch("/user/update/details/:userId", async (req, res) => {
  try {
    created = await prisma.user.update({
      data: {
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        selectors: {
          create: req.body.selectors.map((selectors) => {
            return {
              name: selectors,
            };
          }),
        },
      },
      where: {
        id: Number(req.params.userId),
      },
    });
    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
    res.json(500);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(
    `Test App running at http://localhost:${process.env.PORT || port}`
  );
});

module.exports = app;
