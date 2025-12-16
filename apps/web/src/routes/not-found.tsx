import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";

export const Route = createFileRoute("/not-found")({
    component: NotFoundPage,
});

function NotFoundPage(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
            <p className="text-xl text-gray-500 mb-6">Page non trouvée</p>
            <a
                href="/"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
                Retour à l'accueil
            </a>
        </div>
    );
}
