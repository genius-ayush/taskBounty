import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();
import { JWT_SECRET_CREATOR } from "../config";
import { authenticateJwtCreator } from "../middleware";
const prismaClient = new PrismaClient();

router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    res.status(403).json({ message: "User already exist" });
  } else {
    const user = await prismaClient.user.create({
      data: {
        username: username,
        email: email,
        passwordHash: password,
        role: "CREATOR",
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET_CREATOR
    );

    res.json({
      token,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
      passwordHash: password,
      role: "CREATOR",
    },
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET_CREATOR
    );

    res.json({
      token,
    });
  } else {
    res.status(401).json("wrong username or password");
  }
});

router.get("/me", authenticateJwtCreator, async (req, res) => {
  const userId = req.headers.userId;

  const user = await prismaClient.user.findFirst({
    where: {
      id: userId?.toString(),
    },
  });

  if (user) {
    res.json({ username: user.username , role : user.role});
  } else {
    res.status(403).json({ message: "user not loged in" });
  }
});

router.post("/createSurvey", authenticateJwtCreator, async (req, res) => {
  const userId = req.headers.userId;

  try {
    const {
      title,
      description,
      totalQuestions,
      pointsPerCompletion,
      amountDeposited,
      questions,
    } = req.body;

    console.log(questions);

    let response = await prismaClient.survey.create({
      data: {
        //@ts-ignore
        creatorId: userId,
        title,
        description,
        totalQuestions,
        pointsPerCompletion,
        amountDeopsited: amountDeposited,
        questions: {
          //@ts-ignore
          create: questions.map((question) => ({
            questionText: question.questionText,
            choices: {
              //@ts-ignore
              create: question.choices.map((choice) => ({
                choiceText: choice,
              })),
            },
          })),
        },
      },
    });

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to create survey" });
  }
});

router.get("/getSurvey", authenticateJwtCreator, async (req, res) => {
  // const userId = req.headers.userId ;

  try {
    const surveys = await prismaClient.survey.findMany({
      include: {
        creator: true,
        questions: true,
        responses: true,
      },
    });

    res.json(surveys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
});

router.get("/getSurvey/:id", authenticateJwtCreator, async (req, res) => {
  const { id } = req.params;
    console.log(id) ;
  try {
    const survey = await prismaClient.survey.findUnique({
      where: { id },
      include: {
        creator: true,
        
      },
    });

    if(!survey){
        return res.status(404).json({error : "Survey not found"})
    }
    res.json(survey) ; 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch survey" });
  }
});

export default router;
