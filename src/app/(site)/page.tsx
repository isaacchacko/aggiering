import { webringData } from "@/data/webringData";
import { WebringMemberList } from "@/components/WebringMemberList";

export default function Home() {
  return (
    <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8">
      <WebringMemberList members={webringData} />
    </div>
  );
}
