/** 
 * This component is used to display the Remember me switch on the login page.
 */
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function RememberPW({checked, onCheckedChange}) {
  return (
    <div className="flex items-center space-x-3 ">
      <Switch id="remember-me" checked ={checked} onCheckedChange = {onCheckedChange} />
      <Label htmlFor="remember-me" className="text-md 2xl:text-lg text-gray-600 font-normal">Remember me</Label>
    </div>
  )
}
