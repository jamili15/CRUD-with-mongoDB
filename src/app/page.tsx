import { getPosts } from "@/_actions/postAction";

export default async function Home() {
  const { data, error } = await getPosts();

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {data?.map((info: any) => (
        <div key={info._id}>
          {info.name} {info.price} {info.description}
        </div>
      ))}
    </div>
  );
}
