import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../lib/client";
import type { JSX } from "react";

export const Route = createFileRoute("/comment/")({
    component: CommentListPage,
});

function CommentListPage(): JSX.Element {
    const { data: comments, isLoading, isError, error } = useQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            const response = await client.comments.$get();
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des commentaires");
            }
            return response.json();
        },
    });

    if (isLoading) {
        return <div className="text-center mt-10">Chargement...</div>;
    }

    if (isError) {
        return (
            <div className="text-center mt-10 text-red-500">
                {error instanceof Error ? error.message : "Une erreur est survenue"}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-6">Tous les commentaires</h1>
            {comments && comments.length === 0 ? (
                <p className="text-gray-500">Aucun commentaire pour le moment.</p>
            ) : (
                <ul className="space-y-4">
                    {comments?.map((comment) => (
                        <li key={comment.id} className="p-4 border rounded-lg">
                            <a
                                href={`/comment/${comment.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Commentaire #{comment.id}
                            </a>
                            <p className="mt-2">{comment.comment}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
