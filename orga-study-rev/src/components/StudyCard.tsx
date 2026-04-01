import type { Study } from "../types/study.ts";

interface StudyCardProps {
  study: Study;
  onDelete: (id: number) => void;
  onEdit: (study: Study) => void;
}

function StudyCard({ study, onDelete, onEdit }: StudyCardProps) {
  return (
    <div className="study-card">
  <div className="study-header">
    <div>
      <h2 className="study-title">{study.title}</h2>
      <span className="study-subject">{study.subject}</span>
    </div>

    <span className="study-date">{study.date}</span>
  </div>

  <div className="study-actions">
    <button className="btn-danger" onClick={() => onDelete(study.id)}>
      Deletar
    </button>

    <button className="btn-secondary" onClick={() => onEdit(study)}>
      Editar
    </button>
  </div>
</div>

  );
}


export default StudyCard;
