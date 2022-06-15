import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import MyHead from "../../components/ui/MyHead";

function MeetupDetail(props) {
  return (
    <>
    <MyHead title={props.meetupData.title}
    description='description' content={props.meetupData.description}/>
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </>
    
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://anay:hWUWUlOMR7SPWJHH@cluster0.okabj47.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://anay:hWUWUlOMR7SPWJHH@cluster0.okabj47.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  let selected = await meetupsCollection.findOne({ _id: ObjectId(meetupId), });
  selected=JSON.parse(JSON.stringify(selected));

  client.close();
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        id: selected._id.toString(),
        title: selected.title,
        address: selected.address,
        image: selected.image,
        description:selected.description,
      },
    },
  };
}

export default MeetupDetail;
