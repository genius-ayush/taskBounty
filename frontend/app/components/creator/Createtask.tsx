'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, Plus, Trash2 } from 'lucide-react'
import { useTheme } from "next-themes"
import axios from "axios"

interface Question {
  questionText: string;
  choices: string[];
}

export default function CreateTask() {

  
  const [taskType, setTaskType] = useState("survey")
  const [surveyType, setSurveyType] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalQuestions: 0,
    pointsPerCompletion: 0,
    amountDeposited: 0,
    estimatedTime: "",
    reward: "",
    targetAudience: "",
    additionalInfo: "",
  })
  const [questions, setQuestions] = useState<Question[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionAdd = () => {
    setQuestions([...questions, { questionText: "", choices: ["", "", ""] }])
  }

  const handleQuestionChange = (index: number, field: 'questionText' | 'choices', value: string | string[]) => {
    const newQuestions = [...questions]
    if (field === 'questionText') {
      newQuestions[index].questionText = value as string
    } else {
      newQuestions[index].choices = value as string[]
    }
    setQuestions(newQuestions)
  }

  const handleChoiceChange = (questionIndex: number, choiceIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].choices[choiceIndex] = value
    setQuestions(newQuestions)
  }

  const handleQuestionRemove = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { taskType, surveyType, ...formData, questions })
    // Here you would typically send the data to your backend

    const surveyData = {
      title : formData.title , 
      description : formData.description , 
      totalQuestions : Number(formData.totalQuestions) , 
      pointsPerCompletion : Number(formData.pointsPerCompletion) , 
      amountDeposited : Number(formData.amountDeposited) ,

      questions: questions.map((question: { questionText: string, choices: string[] }) => ({
        questionText: question.questionText,
        choices: question.choices,
      })),
    }
    console.log(typeof formData.totalQuestions)
    console.log(typeof formData.pointsPerCompletion)
    try{
      const token = localStorage.getItem("token") ; 

      const response = await axios.post("http://localhost:3000/v1/creator/createSurvey" , surveyData , {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      console.log("survey created successfully" , response.data) ; 
    }catch(error){
      console.log("error creating survey" , error) ; 
      }
    }

const { theme } = useTheme();
  let darkMode = false;

  if (theme == "dark") {
    darkMode = true;
  } else {
    darkMode = false;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-6 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create a New Task</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <Label className="mb-2 block">Task Type</Label>
            <RadioGroup defaultValue="survey" onValueChange={setTaskType} className="flex space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="survey" id="survey" />
                <Label htmlFor="survey">Survey</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="game" id="game" />
                <Label htmlFor="game">Game</Label>
              </div>
            </RadioGroup>
          </div>

          {taskType === "survey" && (
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'} space-y-6`}>
              <div>
                <Label htmlFor="surveyType" className="mb-2 block">Survey Type</Label>
                <Select onValueChange={setSurveyType}>
                  <SelectTrigger className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                    <SelectValue placeholder="Select survey type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="open-ended">Open Ended</SelectItem>
                    <SelectItem value="rating-scale">Rating Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title" className="mb-2 block">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="totalQuestions" className="mb-2 block">Total Questions</Label>
                <Input id="totalQuestions" name="totalQuestions" type="number" value={formData.totalQuestions} onChange={handleInputChange} required className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="pointsPerCompletion" className="mb-2 block">Points Per Completion</Label>
                <Input id="pointsPerCompletion" name="pointsPerCompletion" type="number" value={formData.pointsPerCompletion} onChange={handleInputChange} required className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="amountDeposited" className="mb-2 block">Amount Deposited ($)</Label>
                <Input id="amountDeposited" name="amountDeposited" type="number" step="0.01" value={formData.amountDeposited} onChange={handleInputChange} required className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="estimatedTime" className="mb-2 block">Estimated Time (minutes)</Label>
                <Input id="estimatedTime" name="estimatedTime" type="number" value={formData.estimatedTime} onChange={handleInputChange} required className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="reward" className="mb-2 block">Reward ($)</Label>
                <Input id="reward" name="reward" type="number" step="0.01" value={formData.reward} onChange={handleInputChange} required className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="targetAudience" className="mb-2 block">Target Audience</Label>
                <Input id="targetAudience" name="targetAudience" value={formData.targetAudience} onChange={handleInputChange} className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div>
                <Label htmlFor="additionalInfo" className="mb-2 block">Additional Information</Label>
                <Textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} className={darkMode ? 'bg-gray-700' : 'bg-white'} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold">Questions</Label>
                  <Button type="button" onClick={handleQuestionAdd} className={darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}>
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                  </Button>
                </div>
                {questions.map((question, index) => (
                  <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor={`question-${index}`} className="font-semibold">Question {index + 1}</Label>
                      <Button type="button" onClick={() => handleQuestionRemove(index)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      id={`question-${index}`}
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                      className={`mb-2 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
                      placeholder="Enter question text"
                    />
                    {question.choices.map((choice, choiceIndex) => (
                      <Input
                        key={choiceIndex}
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, choiceIndex, e.target.value)}
                        className={`mt-2 ${darkMode ? 'bg-gray-600' : 'bg-white'}`}
                        placeholder={`Choice ${choiceIndex + 1}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className={`w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
            Create Task
          </Button>
        </form>
      </div>
    </div>
  )
}