import type { Term } from "../types/term";
import style from "../css/App.module.css"

interface TermCardProps {
  term: Term;
  onDelete: (id: number) => void;
  onToggle: (id: number, learned: boolean) => void;
}

function TermCard({ term, onDelete, onToggle }: TermCardProps) {
  return (
    <div className={style.termCard}>
      <h2>{term.word}</h2>
      <p>{term.meaning}</p>

      <p>
        Status: {term.learned ? "Aprendido" : "Não aprendido"}
      </p>

      <button
        className={style.btnSecondary}
        onClick={() => onToggle(term.id, term.learned)}
      >
        Marcar como {term.learned ? "não aprendido" : "aprendido"}
      </button>

      <button
        className={style.btnDanger}
        onClick={() => onDelete(term.id)}
      >
        Deletar
      </button>
    </div>
  );
}

export default TermCard;
