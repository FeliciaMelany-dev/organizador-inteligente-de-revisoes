import type { Study } from "../types/study.ts";
import style from "../css/App.module.css";

interface StudyCardProps {
  study: Study;
  onDelete: (id: number) => void;
  onEdit: (study: Study) => void;
}

function StudyCard({ study, onDelete, onEdit }: StudyCardProps) {
  return (
    <div className={style.studyCard}>
      <div className={style.studyHeader}>
        <div>
          <h2 className={style.studyTitle}>{study.title}</h2>
          <span className={style.studySubject}>{study.subject}</span>
        </div>

        <span className={style.studyDate}>{study.date}</span>
      </div>

      <div className={style.studyActions}>
        <button
          className={style.btnDanger}
          onClick={() => onDelete(study.id)}
        >
          Deletar
        </button>

        <button
          className={style.btnSecondary}
          onClick={() => onEdit(study)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default StudyCard;
