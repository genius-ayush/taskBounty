import { PrismaClient, Role } from "@prisma/client";
import { Router, response } from "express"
import jwt from "jsonwebtoken";
const router = Router() ; 
import {JWT_SECRET_WORKER} from "../config"
import { authenticateJwtWorker } from "../middleware";
const prismaClient = new PrismaClient() ; 

router.post("/signin" , async(req, res)=>{

    const {username , email , password} = req.body ; 

    const existingUser = await prismaClient.user.findFirst({
        where:{
            email : email
        }
    })

    if(existingUser){

        res.status(403).json({message:"User already exist"}) ; 
    }else{
        
        const  user = await prismaClient.user.create({
            data: {
                username: username,
                email: email,
                passwordHash :  password , 
                role : 'WORKER'
              },
        })  

        const token = jwt.sign(
            {
                userId: user.id
            },
            JWT_SECRET_WORKER
        );

        res.json({
            token
        })
    }
})


router.post("/login" , async(req , res)=>{

    const {email , password} = req.body ; 

    const user = await prismaClient.user.findFirst({
        where:{
            email : email  , 
            passwordHash : password ,
            role : "WORKER"
        }
    })

    if(user){
        const token = jwt.sign(
            {
                userId : user.id
            } , 
            JWT_SECRET_WORKER
        )

        res.json({
            token 
        })
    }else{
        res.status(401).json("wrong username or password") ; 
    }
})

router.get("/me" , authenticateJwtWorker , async(req, res)=>{


    const userId = req.headers.userId ; 

    const user = await prismaClient.user.findFirst({
        where:{
            id : userId?.toString()
        }
    })

    if(user){
        res.json({username : user.username , Role : user.role})
    }else{
        res.status(403).json({message : "user not loged in"})
    }
})

router.get("/getSurvey" , authenticateJwtWorker ,async (req , res) => {
    try {
        const surveys = await prismaClient.survey.findMany({
          include: {
            creator: true,
            questions: {
              include: {
                choices: true,
              },
            },
            responses: true, 
          },
        });
    
        res.json(surveys);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch surveys for worker' });
      }
})

router.get("/getSurvey/:id" , authenticateJwtWorker , async(req , res)=>{
    const {id} = req.params ; 
    const userId = req. headers.userId ; 
    try{

        const survey = await prismaClient.survey.findUnique({
            where : {id} , 

            include : {
                creator : true  , 
                questions : {
                    include :{
                        choices : true , 
                    }
                } , 

                responses:{
                    where :{
                        //@ts-ignore
                        workerId : userId 
                    }
                }
            }
        })

        if(!survey){
            return res.status(404).json({error: "survey not found"}) ; 
        }

        res.json(survey); 

    }catch(error){
        console.log(error); 
        res.status(500).json({error : "Failed to fetch survey for worker"});
    }
})

router.post("/takeSurvey/:id" , authenticateJwtWorker , async(req , res)=>{
    const {id}  = req.params ; 
    const workerId = req.headers.userId ; 
    const {responses} = req.body ; // responses should be an array of {questionId , choiceId}

    try{

        const survey = await prismaClient.survey.findUnique({
            where:{ id} , 
            include: {
                questions:{
                    include:{
                        choices: true 
                    }
                }
            }
        })

        if(!survey){
            return res.status(404).json({error : "Survey not found"})
        }

        const workerResponses = await prismaClient.response.findMany({
            where:{
                //@ts-ignore
                workerId  ,  
                surveyId : id , 
            },
        })

        if(workerResponses.length > 0){
            return res.send(403).json({error: "worker has aready participated in this"})
        }

        const questionIds = survey.questions.map((q)=>q.id) ; 
        //@ts-ignore
        const submittedQuestionIds = responses.map((r)=>r.questionId) ;

        if(questionIds.length !== submittedQuestionIds.length){
            return res.status(400).json({error: "All questions must be answered"});
        }

        //validate each submitted responses corresponds to a valid question and choice 

        for(const response of responses){
            const question = survey.questions.find((q)=>q.id === response.questionId) ; 

            if(!question){
                return res.status(400).json({error: "Invalid question Id"})
            }

            const choice = question.choices.find((c)=>c.id === response.choiceId) ; 

            if(!choice){
                return res.status(400).json({error: "Invalid choice id"})
            }
        }

        const createdResponses = await prismaClient.response.createMany({
            //@ts-ignore
            data: responses.map((response) => ({
              workerId,
              surveyId: id,
              questionId: response.questionId,
              choiceId: response.choiceId,
              responseTime: new Date(),
            })),
          });

          res.status(201).json({message : 'Responses submitted successfully' ,responses: createdResponses })

    }catch(error){
        console.log(error) ; 
        res.status(500).json({error : "Failed to submit survey responses"}) ; 
    }
})

export default router