import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../lib/client";
import type { JSX } from "react";

export const Route = createFileRoute("/comment/$id")({
    component: CommentDetailPage,
});

function CommentDetailPage(): JSX.Element {
    const { id } = Route.useParams();
    const navigate = useNavigate();

    const { data: comment, isLoading, isError } = useQuery({
        queryKey: ["comment", id],
        queryFn: async () => {
            const response = await client.comment[":id"].$get({
                param: { id },
            });
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du commentaire");
            }
            return response.json();
        },
    });

    // Redirect to not found if comment doesn't exist
    if (!isLoading && (isError || comment === null)) {
        navigate({ to: "/not-found" });
        return <div className="text-center mt-10">Redirection...</div>;
    }

    if (isLoading) {
        return <div className="text-center mt-10">Chargement...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4">
            <a href="/comment" className="text-blue-600 hover:underline mb-4 block">
                ← Retour aux commentaires
            </a>
            <div className="p-6 border rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Commentaire #{comment?.id}</h1>
                <p className="text-lg">{comment?.comment}</p>
            </div>
        </div>
    );
}
