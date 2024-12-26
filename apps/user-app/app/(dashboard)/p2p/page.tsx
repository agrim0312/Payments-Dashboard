import { SendCard } from "../../components/p2pCard";

export default function() {
    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Send Money
            </div>
            <SendCard/>
        </div>
    )
}