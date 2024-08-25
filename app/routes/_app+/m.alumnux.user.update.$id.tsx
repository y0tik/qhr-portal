import { useParams } from "@remix-run/react";

export default function Page() {
  const { id } = useParams();
  return (
    <div className="border-dashed rounded-lg border-2 h-full p-4">
      <div className="h-full grid place-items-center">
        <div>
          <div className="text-xl mb-2 -mt-24 text-muted-foreground">
            Alumnux Module
          </div>
          <div className="text-primary text-4xl">
            Update View {`[id=${id}]`}
          </div>
        </div>
      </div>
    </div>
  );
}
