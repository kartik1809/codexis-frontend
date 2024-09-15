import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function EditProfile() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='glassmorphism-button'>
                    Edit Profile
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-950 border-2 ">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Mavericks"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@mavericks"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input
                            id="location"
                            defaultValue="India"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="uni" className="text-right">
                            University
                        </Label>
                        <Input
                            id="uni"
                            defaultValue="University..."
                            className="col-span-3"
                        />
                    </div>
                    <h4 className="text-lg text-center font-semibold">Socials</h4>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="github" className="text-right">
                            Github
                        </Label>
                        <Input
                            id="github"
                            defaultValue="@Username"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="linkedin" className="text-right">
                            LinkedIn
                        </Label>
                        <Input
                            id="linkedin"
                            defaultValue="@Username"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="X" className="text-right">
                            X
                        </Label>
                        <Input
                            id="X"
                            defaultValue="@Username"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
