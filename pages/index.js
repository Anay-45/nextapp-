import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";
import MyHead from "../components/ui/MyHead";

function HomePage(props) {
  return (
    <>
      <MyHead title='React Meetups' description="description" content='Browse a hige list of meetups'/>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}
/*
export async function getServerSideProps(context) {

    const req = context.req;
    const res = context.res;

    return{
        props:{
            meetups: DUMMY_MEETUPS
        }
    };
}
*/

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://anay:hWUWUlOMR7SPWJHH@cluster0.okabj47.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: JSON.parse(
        JSON.stringify(
          meetups.map((meetups) => ({
            title: meetups.title,
            address: meetups.address,
            image: meetups.image,
            id: meetups._id.toString(),
          }))
        )
      ),
    },
    revalidate: 1,
  };
}
export default HomePage;
