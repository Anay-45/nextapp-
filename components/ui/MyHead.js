import Head from "next/head";
function MyHead(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name={props.description} content={props.content} />
    </Head>
  );
}

export default MyHead;
