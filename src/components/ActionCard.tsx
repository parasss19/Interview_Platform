import { QuickActionType } from "@/constants"
import { Card, CardContent } from "./ui/card";

//defining type of props
type ActionCardProps = {
  action: QuickActionType;    //action prop must match the shape of one item from your QUICK_ACTIONS array.
  onClick: () => void         //this function that takes no arguments and returns nothing (void).call this when the card is clicked.
}


const ActionCard = ({action, onClick} : ActionCardProps) => {
  return (
    <Card 
      className = "group mt-6 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02] border-blue-600"
      onClick={onClick}
    >
      <CardContent className={`p-0 ${action.gradient}`}>
      {/* Action content wrapper */}
      <div className="py-6 px-5">

        {/* Action-icon */}
        <div className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
          <action.icon className="size-7 lg:size-6"/>
        </div>

        {/* action details */}
        <div className="font-[poppins]">
          <h3 className="text-3xl lg:text-xl font-bold pt-3">{action.title}</h3>
          <p className="text-sm py-2">{action.description}</p>
        </div>

      </div>
      </CardContent>
    </Card>
  )
}

export default ActionCard