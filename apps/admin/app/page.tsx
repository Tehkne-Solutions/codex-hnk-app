const lanes = [
  ['Canon', '36/365'],
  ['Assets', '0 aprovados'],
  ['Kether', 'Foundation'],
  ['Supabase', 'A conectar'],
] as const;

export default function StudioHome() {
  return (
    <main className="studio">
      <header>
        <p className="eyebrow">HNK STUDIO</p>
        <h1>Production cockpit</h1>
      </header>
      <div className="grid">
        {lanes.map(([label, value]) => (
          <article className="card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </main>
  );
}
