import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import { useRouter } from "next/router";
import MyHead from "../../components/ui/MyHead";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(eneteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(eneteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <>
    <MyHead title='Add a New Meetup' description='description' content='Add your own meetups'/>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
