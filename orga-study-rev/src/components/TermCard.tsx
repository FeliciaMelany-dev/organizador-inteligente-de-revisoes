import type { Term } from "../types/term";

interface TermCardProps {
  term: Term;
  onDelete: (id: number) => void;
  onToggle: (id: number, learned: boolean) => void;
}

function TermCard({ term, onDelete, onToggle }: TermCardProps) {
  return (
    <div className="term-card">
      <h2>{term.word}</h2>
      <p>{term.meaning}</p>

      <p>
        Status: {term.learned ? "Aprendido" : "Não aprendido"}
      </p>

      <button className="btn-danger" onClick={() => onToggle(term.id, term.learned)}>
        Marcar como {term.learned ? "não aprendido" : "aprendido"}
      </button>

      <button className="btn-danger" onClick={() => onDelete(term.id)}>
        Deletar
      </button>
    </div>
  );
}

export default TermCard;
