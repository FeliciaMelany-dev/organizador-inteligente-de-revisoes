import type { Term } from "../types/term";

interface TermCardProps {
  term: Term;
  onDelete: (id: number) => void;
  onToggle: (id: number, learned: boolean) => void;
}

function TermCard({ term, onDelete, onToggle }: TermCardProps) {
  return (
    <div>
      <h2>{term.word}</h2>
      <p>{term.meaning}</p>

      <p>
        Status: {term.learned ? "Aprendido" : "Não aprendido"}
      </p>

      <button onClick={() => onToggle(term.id, term.learned)}>
        Marcar como {term.learned ? "não aprendido" : "aprendido"}
      </button>

      <button onClick={() => onDelete(term.id)}>
        Deletar
      </button>
    </div>
  );
}

export default TermCard;
