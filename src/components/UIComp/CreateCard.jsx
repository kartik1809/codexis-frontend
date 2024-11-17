import * as React from "react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"


export function CardWithForm(props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Create your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name"value={props.Name} onChange={(e)=>{props.handleNameChange(e)}} placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Description</Label>
            <Input id="name" value={props.Description} onChange={(e)=>{props.handleDescriptionChange(e)}} placeholder="Description for Project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={()=>{props.handleClick()}}>Cancel</Button>
        <Button onClick={(e)=>{props.handleCreate(e)}}>Create</Button>
      </CardFooter>
    </Card>
  )
}
