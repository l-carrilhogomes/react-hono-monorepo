import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentSchema, type CreateCommentDto } from "@repo/dtos";
import { client } from "../lib/client";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import type { JSX } from "react";

export const Route = createFileRoute("/post-comment")({
  component: RouteComponent,
});

function RouteComponent(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCommentDto>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateCommentDto) => {
      const response = await client.comments.$post({ json: data });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du commentaire");
      }
      return response.json();
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: CreateCommentDto) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 w-full mt-10">
        <InputText
          label="Ton commentaire"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}

        <Button
          label={mutation.isPending ? "Envoi en cours..." : "Envoyez"}
          disabled={mutation.isPending}
        />
      </div>

      <div className="flex flex-col items-center gap-2 w-full mt-10">
        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">Commentaire envoyé avec succès!</p>
        )}

        {mutation.isError && (
          <p className="text-red-500 text-sm">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Une erreur est survenue"}
          </p>
        )}
      </div>
    </form>
  );
}
