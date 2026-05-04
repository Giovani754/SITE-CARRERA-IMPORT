"use client";

import { Trash2 } from "lucide-react";
import { deleteVehicle } from "./actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteVehicleButton({ id, model }: { id: string; model: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja remover permanentemente o veículo "${model}" do acervo? Esta ação não pode ser desfeita.`)) {
      setIsDeleting(true);
      const result = await deleteVehicle(id);
      
      if (result?.error) {
        alert(result.error);
        setIsDeleting(false);
      } else {
        // Success
        alert("Veículo excluído com sucesso.");
        router.push("/adm/veiculos");
        router.refresh();
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-white/20 hover:text-red-500/60 transition-colors disabled:opacity-50"
      title="Excluir"
    >
      <Trash2 size={14} />
    </button>
  );
}
