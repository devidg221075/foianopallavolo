// Arbitri della gara, solo se la FIPAV li ha indicati.
export function Referees({ fixture }) {
  const first = fixture?.firstReferee;
  const second = fixture?.secondReferee;
  if (!first && !second) return null;
  return (
    <div className="match-referees" aria-label="Arbitri della gara">
      <strong>ARBITRI DELLA GARA</strong>
      <dl>
        {first && (
          <div>
            <dt>1° arbitro</dt>
            <dd>{first}</dd>
          </div>
        )}
        {second && (
          <div>
            <dt>2° arbitro</dt>
            <dd>{second}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
